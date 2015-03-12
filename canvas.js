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

r=Math.floor(r/count);
g=Math.floor(g/count);
b=Math.floor(b/count);

targetElement.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
}


Canvas.prototype.gausianBlur=function(imgPixels,value){


var kernel=
[
 1 ,2, 1,
 2, 4, 2,
 1, 2, 1
		];

imgPixels=conv(imgPixels,value,kernel);
    this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);


  }


Canvas.prototype.boxBlur=function(imgPixels,value){


var kernel=
[
 1 ,1, 1,
 1, 1, 1,
 1, 1, 1
		];

imgPixels=conv(imgPixels,value,kernel);
    this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);


  }



Canvas.prototype.sharpen=function(imgPixels,value){


var kernel=
[
 0 ,-1 , 0,
-1 , 5 ,-1,
 0 ,-1 , 0
		  ];

imgPixels=conv(imgPixels,value,kernel);
    this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);


  }



Canvas.prototype.edgeDetection1=function(imgPixels,value){


var kernel=
[
 0 , 1 , 0,
 1 ,-4 , 1,
 0 , 1 , 0
		  ];

imgPixels=conv(imgPixels,value,kernel);
    this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);


  }

Canvas.prototype.edgeDetection2=function(imgPixels,value){


var kernel=
[
 1 , 0 ,-1,
 0 , 0 , 0,
-1 , 0 , 1
		  ];

imgPixels=conv(imgPixels,value,kernel);
    this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);


  }



Canvas.prototype.edgeDetection3=function(imgPixels,value){


var kernel=
[
 -1 ,-1 , -1,
 -1 , 8 , -1,
 -1 ,-1 , -1
		    ];
 
imgPixels=conv(imgPixels,value,kernel);
    this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);


 }





function conv(imgPixels, value,kernel ){

//value =no. of times func to b applied

var divider = 0;

for (var i = 0, n = kernel.length; i < n; i++)
{
    divider += kernel[i];
}

if(divider === 0){
	divider= 1;
}

var px= imgPixels.data;
var tmpPx = new Uint8ClampedArray(px.length);
tmpPx.set(px);




while(value--){



  for(var i = 0,len=tmpPx.length; i<len; i++){  
        
            if (i % 4 === 3) {
               continue;
            }

        px[i] = (
        		 kernel[4]*(tmpPx[i])
               + kernel[3]*(tmpPx[i - 4] || tmpPx[i])
               + kernel[5]*(tmpPx[i + 4] || tmpPx[i])
               + kernel[1]*(tmpPx[i - 4 * imgPixels.width] || tmpPx[i])
               + kernel[7]*(tmpPx[i + 4 * imgPixels.width] || tmpPx[i])
               + kernel[8]*(tmpPx[i + 4 * imgPixels.width + 4] || tmpPx[i])
               + kernel[6]*(tmpPx[i + 4 * imgPixels.width - 4] || tmpPx[i])
               + kernel[2]*(tmpPx[i - 4 * imgPixels.width + 4] || tmpPx[i])
               + kernel[0]*(tmpPx[i - 4 * imgPixels.width - 4] || tmpPx[i])
               ) / divider;
        }  

   return imgPixels;


  }


/*
* Image matrix = [  
*					tmpPx[i - 4 * imgPixels.width - 4] , tmpPx[i - 4 * imgPixels.width]  , tmpPx[i - 4 * imgPixels.width + 4]
*
*
*					tmpPx[i - 4]                       ,  tmpPx[i]                       ,  tmpPx[i + 4]
*
*					
*					tmpPx[i + 4 * imgPixels.width - 4] ,  tmpPx[i + 4 * imgPixels.width] ,  tmpPx[i + 4 * imgPixels.width + 4]
*
*															                                                                  ];
*/
}





