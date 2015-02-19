canvas = new Canvas(800,500);

canvas.displayCanvas(document.body);



var grid=document.createElement('div');
grid.id="imgGrid";
document.body.appendChild(grid);

canvas.loadImageFromPath("img/img-1.jpg");

for(var i=1;i<9;i++){
var img=document.createElement("img");
img.src="img/img-"+i+".jpg";
img.addEventListener("click", function() {
       canvas.loadImage(this);
       console.log(canvas.getPixelData());
    });
	

grid.appendChild(img);
}