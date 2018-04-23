var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require('mongoose')
var cookieParser = require('cookie-parser');
var csrf = require('csurf');

var multer = require('multer');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var csrfProtection = csrf({cookie:true});
app.use(cookieParser());

mongoose.connect('mongodb://localhost/buysellDB',{useMongoClient:true});
var Schema = mongoose.Schema;
var Schema2 = mongoose.Schema;

var product_postSchema = new Schema({category:String,Product_name:String,Pricex:String,img1:String,img2:String,img3:String,img4:String,img5:String,
                                    Details:String,Locationx:String,Phone_number:String});

var product_posts = mongoose.model("product_posts", product_postSchema);

var comment_postSchema2 = new Schema({
    name_comment: String,
    email_comment: String,
  	text_comment: String,
  	comment_in_product: String
});

var comment_posts = mongoose.model("comment_posts", comment_postSchema2)






var imgxs = mongoose.model("product_posts",product_postSchema);

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function(req, file, cb) {
	cb(null, 'file-' + Date.now() + '.' +
		file.originalname.split('.')[file.originalname.split('.').length-1]);
  }
});

//var upload = multer({ storage: storage });
var upload = multer({ storage : storage }).array('fileupload',5);

app.get('/', function (req, res) {
  product_posts.find('product_posts',function(ree,product_posts){
  //console.log(product_posts);
  res.render('index',{data:product_posts});
  });
});

app.get('/view/:_id', function (req, res) {
  _id=req.params._id;
  var dataxx1;
  var dataxx2;

  product_posts.findById(_id,function(err, product_posts){
    var array1 = product_posts;
        dataxx1 = product_posts;

    if(array1){
      // res.render('view',{data:product_posts});
      // console.log(array1);

    }else {
      res.send("ERROR::We cannot find ");
    }
  });

  var query = { comment_in_product: _id };
  comment_posts.find(query,function(err, comment_posts){
    var array2 = comment_posts;
        dataxx2 = comment_posts;

    if(array2){
      //res.render('view',{data2:comment_posts});
      //console.log(array2);
    }else {
      res.send("ERROR::We cannot find ");
    }
  });

  setTimeout(function(){
    if (dataxx1>1) {
      res.send("ERROR::We cannot find ");
    }else{
      res.render('view',{data:dataxx1,data2:dataxx2});
      console.log(dataxx1);
      console.log(dataxx2);
    }
  },20);


});


app.get('/type/:number',function(req, res){
  var number=req.params.number;

	if(number=="1"){
		console.log("______________________________________");
		console.log("Yes 1");
    var opject1 = {category:"มือถือ"};
		product_posts.find(opject1,function(err, product_posts){
				// console.log("______________________________________");
				// console.log(product_posts);
				res.render('index',{data:product_posts});
		});

  }else if (number=="2") {
    console.log("______________________________________");
    console.log("Yes 2");
    var opject1 = {category:"แฟชั่น"};
    product_posts.find(opject1,function(err, product_posts){
        // console.log("______________________________________");
        // console.log(product_posts);
        res.render('index',{data:product_posts});
    });

  }else if (number=="3") {
    console.log("______________________________________");
    console.log("Yes 3");
    var opject1 = {category:"เสื้อผ้า"};
    product_posts.find(opject1,function(err, product_posts){
        // console.log("______________________________________");
        // console.log(product_posts);
        res.render('index',{data:product_posts});
    });

  }else if (number=="4") {
    console.log("______________________________________");
    console.log("Yes 4");
    var opject1 = {category:"รถมือสอง"};
    product_posts.find(opject1,function(err, product_posts){
        // console.log("______________________________________");
        // console.log(product_posts);
        res.render('index',{data:product_posts});
    });

  }else if (number=="5") {
    console.log("______________________________________");
    console.log("Yes 5");
    var opject1 = {category:"คอมพิวเตอร์"};
    product_posts.find(opject1,function(err, product_posts){
        // console.log("______________________________________");
        // console.log(product_posts);
        res.render('index',{data:product_posts});
    });

  }else {
		console.log("null");
	}

});


app.get('/sell', function (req, res) {
  product_posts.find('product_posts',function(ree,product_posts){
  //console.log(product_posts);
  res.render('sell',{data:product_posts});
  });
});

var nameimg;
var productPost;
	function main(req, res){
	  var imgs = new imgxs({
		img1 : nameimg
	  })
		imgs.save();
		console.log(imgs);
	}

// \\\\app.get('/sell', function (req, res) {
//     upload.single('fileupload2',function(req,res){
//     //console.log(product_posts);
//     res.render('sell',{data:product_posts});
//     });
//   });

app.post('/insert',function(req,res){
  upload(req,res,function(err) {
        console.log('--- upload ---');
        console.log(req.body);
        console.log("\n")
        console.log(req.files);
        console.log("\n");

        var imgname_array=req.files;
        var imgname = [];

        console.log("\n");
        console.log("total img = ", imgname_array.length);

        for(var i=0;i<imgname_array.length;i++){
          no=i+1;
          //console.log(no, filename=imgname_array[i].filename);
          imgname.push(filename=imgname_array[i].filename);

        }

        console.log(imgname);
        console.log("\n");
        console.log("1 : ",imgname[0]);
        console.log("2 : ",imgname[1]);
        console.log("3 : ",imgname[2]);
        console.log("4 : ",imgname[3]);
        console.log("5 : ",imgname[4]);

        var productPost = new product_posts({
          category : req.body.category,
          Product_name : req.body.Product_name,
          Pricex : req.body.Pricex,
          Details : req.body.Details,
          Locationx : req.body.Locationx,
          Phone_number : req.body.Phone_number,
          img1 : imgname[0],
          img2 : imgname[1],
          img3 : imgname[2],
          img4 : imgname[3],
          img5 : imgname[4],
        })

        productPost.save();
        res.redirect('/')
    });
});

app.post('/comment_insert/:_id',function(req,res){
  _id=req.params._id;
  var commentposts = new comment_posts({
    name_comment : req.body.name_comment,
    email_comment : req.body.email_comment,
    text_comment : req.body.text_comment,
    comment_in_product : req.body.comment_in_product
  })

  commentposts.save();
  console.log("\n");
  console.log(commentposts);

  viewx= "/view/"+_id;
  res.redirect(viewx);
});

// app.post('/upload',upload.single('fileupload'),function(req,res) {
// 	console.log('--- upload ---');
// 	console.log(req.file);
// 	res.render('upload2',req.file);
//
// 	console.log('\n', req.file.filename);
// 	nameimg=req.file.filename;
// 	main();
// 	console.log("\n");
//
// });


// app.post('/upload',upload.single('fileupload'),function(req,res) {
// 	//console.log('--- upload ---');
// 	//console.log(req.file);
// 	res.render('upload2',req.file);
// });




//Admin Login
app.get('/admin', function (req, res) {
  product_posts.find('product_posts',function(ree,product_posts){
  //console.log(product_posts);
  res.render('adminPass',{data:product_posts});
  });
});

app.get('/adminPass', function (req, res) {
  product_posts.find('product_posts',function(ree,product_posts){
  //console.log(product_posts);
  res.render('adminPass',{data:product_posts});
  });
});


  app.post('/admin', function(req, res) {
    adminUser = req.body.adminUser;
    adminPass = req.body.adminPass;

    if (adminUser=="adminX", adminPass=="passX") {
      console.log("Username : ",adminUser);
      console.log("Password : ",adminPass);
      console.log("_______________________.");
      console.log("password is incorrect!!}");
      console.log("_______________________|");
      console.log("Password is correct.!");

      //res.render('./adminPass');
      product_posts.find('product_posts',function(ree,product_posts){
      //console.log(product_posts);
      res.render('./adminPass',{data:product_posts});
      });

    }else {
      console.log("Username : ",adminUser);
      console.log("Password : ",adminPass);
      console.log("_______________________.");
      console.log("password is incorrect!!|");
      console.log("_______________________|");
      res.render('./admin');
    }

    //console.log(adminUser);
    //res.render('adminPass');
  });

  app.get('/delete/:_id',function(req,res) {
    product_posts.findById(req.params._id,function(err,product_posts){
      product_posts.remove();
    });
    res.redirect('/adminPass');
  });

  ////////////////////////////////////////
  //Admin

  app.get('/admin_view/:_id', function (req, res) {
  _id=req.params._id;
  var dataxx1;
  var dataxx2;

  product_posts.findById(_id,function(err, product_posts){
    var array1 = product_posts;
        dataxx1 = product_posts;

    if(array1){
      // res.render('view',{data:product_posts});
      // console.log(array1);

    }else {
      res.send("ERROR::We cannot find ");
    }
  });

  var query = { comment_in_product: _id };
  comment_posts.find(query,function(err, comment_posts){
    var array2 = comment_posts;
        dataxx2 = comment_posts;

    if(array2){
      //res.render('view',{data2:comment_posts});
      //console.log(array2);
    }else {
      res.send("ERROR::We cannot find ");
    }
  });

  setTimeout(function(){
    if (dataxx1>1) {
      res.send("ERROR::We cannot find ");
    }else{
      res.render('admin_view',{data:dataxx1,data2:dataxx2});
      console.log(dataxx1);
      console.log(dataxx2);
    }
  },20);
});

  app.get('/delete_comment/:_id',function(req,res) {
    comment_posts.findById(req.params._id,function(err,comment_posts){
      comment_posts.remove();
    });
    res.redirect('/adminPass');
  });

app.listen(3000, function() {
	console.log('Server Started on localhost:3000...');
});
