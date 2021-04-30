const bodyParser = require('body-parser');
const express=require('express');
const path=require('path');
const app=express();

const books=[];

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true})); //instead of body parser
app.get('/',(req,res,next)=>{
    res.render("newbook",{'title': 'Prove2', 'books':books});
});
app.post('/', (req, res, next)=>{
    if(req.body.bookTitle)
        books.push(req.body);
    res.render("newbook",{'title': 'Prove2','books':books});
    console.log(books);
});

app.listen(3000);
