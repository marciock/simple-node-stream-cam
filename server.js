const express=require('express');
const app=express();
const path=require('path');
const server=require('http').createServer(app);
const io=require('socket.io')(server);
const cv=require('opencv4nodejs');

const wCap=new cv.VideoCapture(0);
const FPS=10;
//wCap.set(cv.CAP_PROP_FRAME_WIDTH,300);
//wCap.set(cv.CAP_PROP_FRAME_HEIGHT,300);


app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'public'));
app.engine('html',require('ejs').renderFile);

app.set('view engine','html');
setInterval(()=>{
  const frame=wCap.read();
  const image=cv.imencode('.jpg',frame).toString('base64');
  io.emit('image',image);

},1000/FPS);

app.use('/',(req,res)=>{

 res.render('index.html');
 //res.sendFile(path.join(__dirname,'./public/index.html'));

});







server.listen(3000);