var Canvas=function(width,height){
this.canvas=document.createElement("canvas");
this.canvas.height=height;
this.canvas.width=width;

this.ctx=this.canvas.getContext("2d");
};

Canvas.prototype.displayCanvas=function(htmlNode){

htmlNode.appendChild(this.canvas);

}
Canvas.prototype.loadImageFromPath=function(path){
	var img1=document.createElement("img");
	var self=this;

	img1.onload= function(){
		self.ctx.drawImage(this,0,0,self.canvas.width,self.canvas.height);
	};
	img1.src = path;
}

Canvas.prototype.loadImage=function(img){
//img offsetx offsety wid ht
	this.ctx.drawImage(img,0,0,this.canvas.width,this.canvas.height);
}

Canvas.prototype.getPixelData=function(){

return this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
  

}

Canvas.prototype.greyScale=function(imgPixels){

var px_data= imgPixels.data;
  for(var i = 0; i<px_data.length; i=i+4){  
        
            var avg = (0.3*px_data[i] + 0.59*px_data[i + 1] + 0.11*px_data[i + 2]);  
            px_data[i] = px_data[i + 1] = px_data[i + 2] = avg;  
        }  
    this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);


}

Canvas.prototype.avgColor=function(imgPixels,targetElement){
var r=0;
var g=0;
var b=0;
var count=0;

var px_data= imgPixels.data;
  for(var i = 0; i<px_data.length; i=i+4*10){  
        
            count++;
           r=  r+px_data[i];
           g=  g+ px_data[i + 1] ;
           b=  b+ px_data[i + 2]  ;  
        }  
console.log(r,g,b);

r=Math.floor(r/count);
g=Math.floor(g/count);
b=Math.floor(b/count);

targetElement.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
}
