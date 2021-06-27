const express =require('express');
const morgan  = require('morgan');
const mongoose= require('mongoose');
var mongodb=require('mongodb');
var bodyParser=require('body-parser');
const Blog =require('./models/blog');
const blogRoutes=require('./routes/blogRoutes');
const { render } = require('ejs');
const app= express();
const hostname ='0.0.0.0';


app.use(bodyParser.json())
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));

//localhost connection
mongoose.connect('mongodb://localhost:27017/blogdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));

//register view engine

app.set('view engine','ejs');

//listen for request
app.listen(5002);


//routes
app.get('/',(req,res)=>{
  res.redirect('/blogs')
});

app.get('/about',(req,res)=>{
    res.render('about',{title:'ABOUT'});
});

//blog routes
app.use('/blogs',blogRoutes);

//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
});