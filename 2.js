var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function(req, file, cb) {
	cb(null, 'file-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length-1])
  }
})

var upload = multer({ storage: storage });

app.get('/', function (req, res) {
	res.render('upload');
});

app.post('/upload',upload.single('fileupload'),function(req,res) {
	console.log('--- upload ---');
	console.log(req.file);
	res.render('upload2',req.file);
});

app.listen(3000, function() {
	console.log('Server Started on localhost:3000...');
});