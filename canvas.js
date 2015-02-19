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

};