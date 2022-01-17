var canvas = document.querySelector("#myCanvas");
var ctx = canvas.getContext("2d");
var colorContainer = document.querySelector(".color_container");
var colorArray = ["#FE2D00","#00E0FF","#099902","#FFEC00"];
var currentColor = colorArray[0];
var clrBtn = document.querySelector('.clear');
var dwnBtn = document.querySelector('.download');
// console.log(ctx);

colorArray.forEach((color) => {
   const colorPalette = document.createElement("div");
   colorPalette.className = "color";
   colorPalette.style.backgroundColor = color;
   colorPalette.onclick = () => {
       currentColor = color;
   };
   colorContainer.insertAdjacentElement("beforeend",colorPalette);
 });

const draw = function (event) {
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 3;
    ctx.lineCap = "round"; //Rounded paint brush
    ctx.lineTo(event.pageX - rect.left, event.pageY - rect.top); //This will make a line X,Y
    ctx.strokeStyle = currentColor;
    ctx.stroke ();
    ctx.moveTo(event.pageX - rect.left, event.pageY - rect.top); //Move pen to the X & Y positon
};
var isMouseDown = false;

canvas.onmousemove = function(event){
    if(isMouseDown) draw(event);
};

canvas.onmousedown = function(event){
    isMouseDown = true;
    console.log(event);
    draw(event);
};

canvas.onmouseup = function(event){
    ctx.beginPath();
    isMouseDown = false;
};

clrBtn.addEventListener('click',function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

dwnBtn.addEventListener('click',function(){
    var link = document.createElement("a");
    link.download = `${new Date().toDateString()}.png`;
    link.href = canvas.toDataURL();
    link.click();
});