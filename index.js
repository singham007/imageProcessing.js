data='';
window.onload=function(){
canvas = new Canvas(800,500);

canvas.displayCanvas(document.body);



var grid=document.createElement('div');
grid.id="imgGrid";
document.body.appendChild(grid);

canvas.loadImageFromPath("img/img-1.jpg");

for(var i=1;i<10;i++){
var img=document.createElement("img");
img.src="img/img-"+i+".jpg";
img.addEventListener("click", function() {
       canvas.loadImage(this);
       data = canvas.getPixelData();
    });
	

grid.appendChild(img);
}
}



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn').addEventListener('click', options);
});

function options(){

	if(document.getElementById("gausian").selected)
		 canvas.gausianBlur(data,1);
	if(document.getElementById("grey").selected)
		canvas.greyScale(data);
	if(document.getElementById("dominant").selected)
		canvas.avgColor(data,document.body);
	if(document.getElementById("boxBlur").selected)
		canvas.boxBlur(data,1);
	if(document.getElementById("sharpen").selected)
		canvas.sharpen(data,1);
	if(document.getElementById("ed1").selected)
		 canvas.edgeDetection1(data,1);
	if(document.getElementById("ed2").selected)
		 canvas.edgeDetection2(data,1);
	if(document.getElementById("ed3").selected)
		 canvas.edgeDetection3(data,1);
}

