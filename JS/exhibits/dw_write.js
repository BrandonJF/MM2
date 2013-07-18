/*****************************************************************************************
	dw_write.js	
	write to positioned div (absolute or relative)
	Designed specifically to provide capability for ns4 to write to a layer in a table 
	For writing to absolute-positioned layer you can also	use dw_core.js.
	version date: April 2003
	
	This code is from Dynamic Web Coding 
  at http://www.dyn-web.com/
  Copyright 2001-3 by Sharon Paine 
  See Terms of Use at http://www.dyn-web.com/bus/terms.html
  Permission granted to use this code 
  as long as this entire notice is included.	
*******************************************************************************************/

// constructor function (x,y optional)
function writeObj(id,wd,ht,x,y) {
	if (!id) return;	// for when writeObj used as prototype
	if (document.getElementById||document.all) {
		this.el = (document.getElementById)? document.getElementById(id): document.all[id];
		this.css = this.el.style;	this.doc = this.el;
		this.css.width=wd+"px"; this.css.height=ht+"px";
  } else if (document.layers) {
		var lyrRef = getLyrRef(id,document);	// in case id nested
		// create layer inside to write to
		// in case id relative positioned
		this.el = new Layer(wd,lyrRef);	
		lyrRef.resizeTo(wd,ht);
		this.el.visibility = "inherit";	// new Layer initially hidden
		this.doc = this.el.document;	// write to inner layer
		// use outer layer for shifting, show/hide
		this.css = this.el.parentLayer; 
	} else return null; // (if not ...byId or ...all or ...layers)
	var px = (document.layers)? "": "px";
	this.x = x || 0;	if (x) this.css.left = this.x+px;
	this.y = y || 0;	if (y) this.css.top = this.y+px;
	this.obj = id+"Object"; eval(this.obj+"=this");	// used by banner
}

//  Methods
writeObj.prototype.writeLyr = function (cntnt) {
	if (typeof this.doc.innerHTML!="undefined") {
      this.doc.innerHTML = cntnt;
  } else if (document.layers) {
			this.doc.write(cntnt);
			this.doc.close();
  }
}

writeObj.prototype.show = function () { this.css.visibility = "visible"; }
writeObj.prototype.hide = function () { this.css.visibility = "hidden"; }

writeObj.prototype.shiftTo = function (x,y) {
	if (x!=null) this.x=x; if (y!=null) this.y=y;	
	if (this.css.moveTo) { 
		this.css.moveTo(Math.round(this.x),Math.round(this.y)); 
	} else { 
		this.css.left=Math.round(this.x)+"px"; 
		this.css.top=Math.round(this.y)+"px"; 
	}
}

writeObj.prototype.shiftBy = function (x,y) {
	this.shiftTo(this.x+x,this.y+y);
}

// credit to http://www.13thparallel.org for the following 2 functions
// returns amount of vertical scroll
function getScrollY() {
	var sy = 0;
	if (document.documentElement && document.documentElement.scrollTop)
		sy = document.documentElement.scrollTop;
	else if (document.body && document.body.scrollTop) 
		sy = document.body.scrollTop; 
	else if (window.pageYOffset)
		sy = window.pageYOffset;
	else if (window.scrollY)
		sy = window.scrollY;
	return sy;
}

// returns amount of horizontal scroll
function getScrollX() {
	var sx = 0;
	if (document.documentElement && document.documentElement.scrollLeft)
		sx = document.documentElement.scrollLeft;
	else if (document.body && document.body.scrollLeft) 
		sx = document.body.scrollLeft; 
	else if (window.pageXOffset)
		sx = window.pageXOffset;
	else if (window.scrollX)
		sx = window.scrollX;
	return sx;
}


// get reference to nested layer for ns4
// from dhtmllib.js by Mike Hall of www.brainjar.com
function getLyrRef(lyr,doc) {
	if (document.layers) {
		var theLyr;
		for (var i=0; i<doc.layers.length; i++) {
	  	theLyr = doc.layers[i];
			if (theLyr.name == lyr) return theLyr;
			else if (theLyr.document.layers.length > 0) 
	    	if ((theLyr = getLyrRef(lyr,theLyr.document)) != null)
					return theLyr;
	  }
		return null;
  }
}
