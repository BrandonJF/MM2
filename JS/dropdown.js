
/**
 * dropDownMenu v0.3
 * An easy to implement dropDown Menu for Websites, that may be based on styled list tags
 *
 * Works for IE 5.5+ PC, Mozilla 1+ all Plattforms, Opera 7+
 *
 * Copyright (c) 2004 Knallgrau New Medias Solutions GmbH, Vienna - Austria
 *
 * Written by Matthias Platzer at http://knallgrau.at
 * 
 * Use it as you need it
 * It is distributed under a BSD style license
 */

userAgent = navigator.userAgent.toLowerCase();
isIE     = ((userAgent.indexOf("msie") != -1) && (userAgent.indexOf("opera") == -1));
isOpera  = (userAgent.indexOf("opera") != -1);
isMac     = (userAgent.indexOf("mac") != -1);
isMacIE = (isIE && isMac);
isWinIE = (isIE && !isMac);
isSafari = (userAgent.indexOf("safari") != -1);
isGecko  = (navigator.product == "Gecko" && !isSafari);

/**
 * Container Class (Prototype) for the dropDownMenu
 * 
 * @param idOrElement     String|HTMLElement  root Node of the menu (ul)
 * @param name            String              name of the variable that stores the result
 *                                            of this constructor function
 * @customConfigFunction  Function            optional config function to override the default settings
 *                                            for an example see Menu.prototype.config
 */
function Menu(idOrElement, name, customConfigFunction) {
  this.author = "Matthias Platzer AT knallgrau.at";
  this.copyright = "Copyright (c) 2004 Knallgrau New Medias Solutions GmbH, Vienna - Austria";
  this.license = "distributed under a BSD-Style license";

  this.lastUpdate = "2004-11-08";
  this.version = "0.4";

  this.name = name;
  this.type = "menu";
  this.closeDelayTimer = null;
  this.closingMenuItem = null; 

  this.config();
  if (typeof customConfigFunction == "function") {
    this.customConfig = customConfigFunction;
    this.customConfig();
  }

  this.rootContainer = new MenuContainer(idOrElement, this);
}

Menu.prototype.config = function() {
  this.collapseBorders = true;
  this.quickCollapse = true;
  this.closeDelayTime = 500;
};

function MenuContainer(idOrElement, parent) {
  this.type = "menuContainer";
  this.menuItems = [];
  this.init(idOrElement, parent);
}

MenuContainer.prototype.init = function(idOrElement, parent) {
  this.element = (typeof idOrElement == "string") ? document.getElementById(idOrElement) : idOrElement;
  this.parent = parent;
  this.parentMenu = (this.type == "menuContainer") ? ((parent) ? parent.parent : null) : parent;
  this.root = parent instanceof Menu ? parent : parent.root;
  this.id = this.element.id;

  if (this.type == "menuContainer") {
    if (this.hasClass("dropdown")) this.menuType = "dropdown";
    else if (this.hasClass("flyout")) this.menuType = "flyout";
    else if (this.hasClass("horizontal")) this.menuType = "horizontal";
    else this.menuType = "standard";
    if (this.menuType == "flyout" || this.menuType == "dropdown") {
      this.isOpen = false;
      this.element.style.position = "absolute";
      this.element.style.top = "0px";
      this.element.style.left = "0px"; 
      this.element.style.visibility = "hidden";
    } else {
      this.isOpen = true;
    }
  } else {
    this.isOpen = this.parentMenu.isOpen;
  }

  var childNodes = this.element.childNodes;
  if (childNodes == null) return;
  
  for (var i = 0; i < childNodes.length; i++) {
    var node = childNodes[i];
    if (node.nodeType == 1) {
      if (this.type == "menuContainer") {
        if (node.tagName.toLowerCase() == "li") {
          this.menuItems.push(new MenuItem(node, this));
        }
        
      } else {
        if (node.tagName.toLowerCase() == "ul") {
          this.subMenu = new MenuContainer(node, this);
        }
      }
    }
  }
};

MenuContainer.prototype.getAbsOffsetTop = function() {
  var offset = 0;
  var ele = this.element;
  var sl = (window.pageYOffset ? window.pageYOffset : document.body.scrollTop);
  do { offset += ele.offsetTop; ele = ele.offsetParent; } while (ele!=null && ele.style.position !="relative" && ele.style.position!="absolute" && (ele.style.position!="fixed"))
  return offset;
};

MenuContainer.prototype.getAbsOffsetLeft = function() {
  var offset = 0; 
  var ele = this.element;
  var sl = (window.pageXOffset ? window.pageXOffset : document.body.scrollLeft);
  do { offset += ele.offsetLeft; if (ele.style.position=='fixed') { offset+=sl }; ele = ele.offsetParent; } while (ele!=null)
  return offset;
};

MenuContainer.prototype.hasClass = function(className) {
  return (" " + this.element.className + " ").indexOf(className) > -1;
};

MenuContainer.prototype.getBorders = function(element) {
  var ltrb = ["Left","Top","Right","Bottom"];
  var result = {};
  for (var i in ltrb) {
    if (this.element.currentStyle)
      var value = parseInt(this.element.currentStyle["border"+ltrb[i]+"Width"]);
    else if (window.getComputedStyle)
      var value = parseInt(window.getComputedStyle(this.element, "").getPropertyValue("border-"+ltrb[i].toLowerCase()+"-width"));
    else
      var value = parseInt(this.element.style["border"+ltrb[i]]);
    result[ltrb[i].toLowerCase()] = isNaN(value) ? 0 : value;
  }
  return result;
};

MenuContainer.prototype.open = function() {
  if (this.root.closeDelayTimer) window.clearTimeout(this.root.closeDelayTimer);
  this.parentMenu.closeAll(this);
  this.element.style.visibility = "visible";
  this.isOpen = true;
  if (this.menuType == "dropdown") {
    this.element.style.top = (this.parent.getAbsOffsetTop() + this.parent.element.offsetHeight) + "px";
    this.element.style.left = (this.parent.element.offsetLeft) + "px";
  } else if (this.menuType == "flyout") {
    var parentMenuBorders = this.parentMenu ? this.parentMenu.getBorders() : new Object();
    var thisBorders = this.getBorders();
    if (
      (this.parentMenu.getAbsOffsetLeft() + this.parentMenu.element.offsetWidth + this.element.offsetWidth + 20) > 
      (window.innerWidth ? window.innerWidth : document.body.offsetWidth)
    ) {
      this.element.style.left = (- this.element.offsetWidth - (this.root.collapseBorders ?  0 : parentMenuBorders["left"])) + "px";
    } else {
      this.element.style.left = (this.parentMenu.element.offsetWidth - parentMenuBorders["left"] - (this.root.collapseBorders ?  Math.min(parentMenuBorders["right"], thisBorders["left"]) : 0)) + "px";      
    }
    this.element.style.top = (this.parent.element.offsetTop - parentMenuBorders["top"] - this.menuItems[0].element.offsetTop) + "px";
  }
};

MenuContainer.prototype.close = function() {
  this.element.style.visibility = "hidden";
  this.isOpen = false;
  this.closeAll();
};

MenuContainer.prototype.closeAll = function(trigger) {
  for (var i in this.menuItems) { 
    this.menuItems[i].closeItem(trigger);
  }
};

MenuItem.prototype = MenuContainer.prototype;
function MenuItem(idOrElement, parent) {
  var menuItem = this;
  this.type = "menuItem";
  this.subMenu;
  this.init(idOrElement, parent);
  if (this.subMenu) {
    this.element.onmouseover = function() {
      menuItem.subMenu.open(); 
    }
  } else {
    if (this.root.quickCollapse) {
      this.element.onmouseover = function() {
        menuItem.parentMenu.closeAll(); 
      }
    }
  }
  var linkTag = this.element.getElementsByTagName("A")[0];
  if (linkTag) {
     linkTag.onfocus = this.element.onmouseover;
     this.link = linkTag;
     this.text = linkTag.text;
  }
  if (this.subMenu) {
    this.element.onmouseout = function() {
      if (menuItem.root.openDelayTimer) window.clearTimeout(menuItem.root.openDelayTimer);
      if (menuItem.root.closeDelayTimer) window.clearTimeout(menuItem.root.closeDelayTimer); 
      eval(menuItem.root.name + ".closingMenuItem = menuItem");
      menuItem.root.closeDelayTimer = window.setTimeout(menuItem.root.name + ".closingMenuItem.subMenu.close()", menuItem.root.closeDelayTime); 
    }
  }
}

MenuItem.prototype.openItem = function() {
  this.isOpen = true;
  if (this.subMenu) { this.subMenu.open(); }
};

MenuItem.prototype.closeItem = function(trigger) {
  this.isOpen = false;
  if (this.subMenu) { 
    if (this.subMenu != trigger) this.subMenu.close(); 
  }
};

// DEBUG

Menu.prototype.toString = function() {
   return "Menu";
}

Menu.prototype.trace = function() {
   return "root";
}

MenuContainer.prototype.toString = function() {
   return "y:"+this.getAbsOffsetTop();
}

MenuContainer.prototype.trace = function() {
   // return this.element.outerHTML.substring(0,40);
   return this;
   return (this.parent ? this.parent.trace() : "x") + " > " + this;
}

function trace(msg) {
  var ele = document.getElementById("trace");
  ele.value = msg + "\n" + ele.value;
}
