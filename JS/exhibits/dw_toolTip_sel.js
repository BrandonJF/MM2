/*************************************************************************
  dw_tooltip_sel.js, dw_tooltip.js with integrated select list overlay 
  requires: dw_event.js and dw_viewport.js
  version date: March 14, 2005 
  
  This code is from Dynamic Web Coding at dyn-web.com
  Copyright 2003-5 by Sharon Paine 
  See Terms of Use at www.dyn-web.com/bus/terms.html
  regarding conditions under which you may use this code.
  This notice must be retained in the code as is!
*************************************************************************/

var Tooltip = {
    followMouse: true,
    overlaySelects: true,  // iframe shim for select lists (ie win)
    offX: 8,
    offY: 12,
    tipID: "tipDiv",
    showDelay: 100,
    hideDelay: 200,
    
    ovTimer: 0, // for overlaySelects
    ready:false, timer:null, tip:null, shim:null, supportsOverlay:false,
  
    init: function() {
        if ( document.createElement && document.body && typeof document.body.appendChild != "undefined" ) {
            var el = document.createElement("DIV");
            el.id = this.tipID;
            document.body.appendChild(el);
            this.supportsOverlay = this.checkOverlaySupport();
            this.ready = true;
        }
    },
    
    show: function(e, msg) {
        if (this.timer) { clearTimeout(this.timer);	this.timer = 0; }
        this.tip = document.getElementById( this.tipID );
        if (this.followMouse) // set up mousemove 
            dw_event.add( document, "mousemove", this.trackMouse, true );
        this.writeTip("");  // for mac ie
        this.writeTip(msg);
        viewport.getAll();
        this.handleOverlay(1, this.showDelay);
        this.positionTip(e);
        this.timer = setTimeout("Tooltip.toggleVis('" + this.tipID + "', 'visible')", this.showDelay);
    },
    
    writeTip: function(msg) {
        if ( this.tip && typeof this.tip.innerHTML != "undefined" ) this.tip.innerHTML = msg;
    },
    
    positionTip: function(e) {
        if ( this.tip && this.tip.style ) {    
            // put e.pageX/Y first! (for Safari)
            var x = e.pageX? e.pageX: e.clientX + viewport.scrollX;
            var y = e.pageY? e.pageY: e.clientY + viewport.scrollY;
    
            if ( x + this.tip.offsetWidth + this.offX > viewport.width + viewport.scrollX ) {
                x = x - this.tip.offsetWidth - this.offX;
                if ( x < 0 ) x = 0;
            } else x = x + this.offX;
        
            if ( y + this.tip.offsetHeight + this.offY > viewport.height + viewport.scrollY ) {
                y = y - this.tip.offsetHeight - this.offY;
                if ( y < viewport.scrollY ) y = viewport.height + viewport.scrollY - this.tip.offsetHeight;
            } else y = y + this.offY;
            
            this.tip.style.left = x + "px"; this.tip.style.top = y + "px";
        }
            
        this.positionOverlay();
    },
    
    hide: function() {
        if (this.timer) { clearTimeout(this.timer);	this.timer = 0; }
        this.handleOverlay(0, this.hideDelay);
        this.timer = setTimeout("Tooltip.toggleVis('" + this.tipID + "', 'hidden')", this.hideDelay);
        if (this.followMouse) // release mousemove
            dw_event.remove( document, "mousemove", this.trackMouse, true );
        this.tip = null; 
    },
    
    toggleVis: function(id, vis) { // to check for el, prevent (rare) errors
        var el = document.getElementById(id);
        if (el) el.style.visibility = vis;
    },

    trackMouse: function(e) {
    	e = dw_event.DOMit(e);
     	Tooltip.positionTip(e);
    },
    
    // check need for and support of iframe shim
    checkOverlaySupport: function() {
        if ( navigator.userAgent.indexOf("Windows") != -1 && 
            typeof document.body != "undefined" && 
            typeof document.body.insertAdjacentHTML != "undefined" && 
            !window.opera && navigator.appVersion.indexOf("MSIE 5.0") == -1 
            ) return true;
        else return false;
    }, 
    
    handleOverlay: function(bVis, d) {
        if ( this.overlaySelects && this.supportsOverlay ) {
            if (this.ovTimer) { clearTimeout(this.ovTimer); this.ovTimer = 0; }
            switch (bVis) {
                case 1 :
                    if ( !document.getElementById('tipShim') ) 
                        document.body.insertAdjacentHTML("beforeEnd", '<iframe id="tipShim" src="about:blank" style="position:absolute; left:0; top:0; z-index:500; visibility:hidden" scrolling="no" frameborder="0"></iframe>');
                    this.shim = document.getElementById('tipShim'); 
                    if (this.shim && this.tip) {
                        this.shim.style.width = this.tip.offsetWidth + "px";
                        this.shim.style.height = this.tip.offsetHeight + "px";
                    }
                    this.ovTimer = setTimeout("Tooltip.toggleVis('tipShim', 'visible')", d);
                break;
                case 0 :
                    this.ovTimer = setTimeout("Tooltip.toggleVis('tipShim', 'hidden')", d);
                    if (this.shim) this.shim = null;
                break;
             }
        }
    },    
    
    positionOverlay: function() {
        if ( this.overlaySelects && this.supportsOverlay && this.shim ) {
            this.shim.style.left = this.tip.style.left;
            this.shim.style.top = this.tip.style.top;
        }
    }
}

