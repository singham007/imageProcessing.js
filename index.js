canvas = new Canvas(800,500);

canvas.displayCanvas(document.body);



var grid=document.createElement('div');
grid.id="imgGrid";
document.body.appendChild(grid);

canvas.loadImageFromPath("img/img-1.jpg");

for(var i=0;i<9;i++){
var img=document.createElement("img");
img.src="img/img-"+i+".jpg";
img.addEventListener("click", function() {
       canvas.loadImage(this);
       var data = canvas.getPixelData();
    //  canvas.greyScale(data);
       canvas.avgColor(data,document.body)
    });
	

grid.appendChild(img);
}