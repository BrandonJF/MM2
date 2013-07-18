//home page slider

	$(document).ready(function(){
		var slider_area;
		var slider_buttons;

		// Which slider
		if ($('#slider_area').length>0){
			
			// Home Page Slider
			slider_area="#slider_area";	
			slider_buttons="#numbers";
		
		
			$(slider_area).cycle({ 
				fx:     'fade', 
				timeout:  4000, 
				pager:  slider_buttons, 
				cleartype:  1,
				pagerAnchorBuilder: function(idx) { 
					return '<a href="#" title=""><img src="../../images/pixel.gif" width="14" heigth="14"></a>'; 
				}
			});
		}
 
		// portfolio slider
		if ($('.portfolio_slides').length>0){ 
			
			slider_area=".portfolio_slides";
			
			$(slider_area).cycle({ 
				fx:     'fade',  
				timeout: 4000,
				prev:    '.left',
				next:    '.right'
			});				

		}


		
		
	});



//pretty photo
	$(document).ready(function(){
		$("a[rel^='prettyPhoto']").prettyPhoto();
	});


//image effects 
	$(document).ready(function(){
			var image_e= $(".image.portfolio, .image.product_image");
			image_e.mouseover(function(){$(this).stop().animate({ opacity:0.6
					}, 400);
			}).mouseout(function(){
				image_e.stop().animate({ 
					opacity:1
					}, 400 );
			});
	});

//validate contact form
$(document).ready(function(){

		// show a simple loading indicator
		var loader = jQuery('<img src="../../images/loading.gif" alt="loading..." />')
			.appendTo(".loading")
			.hide();
		jQuery().ajaxStart(function() {
			loader.show();
		}).ajaxStop(function() {
			loader.hide();
		}).ajaxError(function(a, b, e) {
			throw e;
		});
		
		jQuery.validator.messages.required = "";
		var v = jQuery("#validate_form").validate({
			submitHandler: function(form) {
				jQuery(form).ajaxSubmit({
					target: "#result"
				});
			}
		});
		
		jQuery("#reset").click(function() {
			v.resetForm();
		});
 });



//cufon fonts
	$(document).ready(function(){
		Cufon.replace('h1,h2,h3,h4,h5,h6,.portfolio_categories ul,.title a', {hover: true});
	});
	
	
//RT single level drop down menu
function rt_navigation(){

	var rt_dd_menu = jQuery(".navigation ul.navigation > li");	
	var first_li_items = jQuery(".navigation ul.navigation li > ul");
	
	first_li_items.each(function(){
		 jQuery(this).find('>li:first').addClass('first_li'); // class for first li
		 jQuery(this).find('>li:last a').addClass('last_li'); // remove last border

	});
	
	//current item
	jQuery(".navigation ul.navigation >li .current_page_item").parent("li:eq(0)").addClass('active');
	 
	//first-last list items
	rt_dd_menu.each(function(){

		
		$(this).children("ul:eq(0)").addClass('first_ul');
		 jQuery(".navigation ul.navigation li > ul").addClass('first_ul');
		 jQuery(this).find('li:first').addClass('first_li'); // class for first li
		 jQuery(this).find('li:last a').addClass('last_li'); // remove last border
	});
		
		
	//hover		 
	jQuery(".navigation ul.navigation > li").hover(function() {
		jQuery(this).addClass('li_active');
		jQuery(this).children("a:eq(0)").addClass('a_active');
		jQuery(this).find('ul:first').stop().css({overflow:"hidden", height:"auto", display:"none",'paddingTop':'5px','paddingBottom':'15px'}).slideDown(200, function(){jQuery(this).css({overflow:"visible", height:"auto"});});
	}, function() {
		jQuery(this).find('ul:first').stop().slideUp(200, function(){jQuery(this).css({overflow:"hidden", display:"none"});});
		var active_class=jQuery(this).attr("class");			
		if (active_class!="active"){	
			jQuery(this).removeClass('li_active');
			jQuery(this).children("a:eq(0)").removeClass('a_active');
		}
	});
}

$(document).ready(function() {
	rt_navigation();
});

 

//search field function
$(document).ready(function() {
	var search_text=jQuery(".search_bar .search_text").val();

	jQuery(".search_bar .search_text").focus(function() {
		jQuery(".search_bar .search_text").val('');
	})

	jQuery(".search_bar .search_text").blur(function() {
		jQuery(".search_bar .search_text").val(search_text);
	})	
});
	
	
	
//product tabs
$(document).ready(function() {
if ($('#tabs').length>0){	
	$('#tabs > ul').tabs({ fx: { height: 'toggle', opacity: 'toggle' } });
}
});



//preloading 
$(function () {
	//$('.preload').hide();//hide all the images on the page
	$('.play,.magnifier').css({opacity:0});
	$('.preload').css({opacity:0});
	$('.preload').addClass("animated");
	$('.play,.magnifier').addClass("animated_icon");
});


var i = 0;//initialize
var cint=0;//Internet Explorer Fix
$(window).bind("load", function() {//The load event will only fire if the entire page or document is fully loaded
	var cint = setInterval("doThis(i)",70);//500 is the fade in speed in milliseconds

});

function doThis() {
	/*var images = $('.preload').length;//count the number of images on the page
	if (i >= images) {// Loop the images
		clearInterval(cint);//When it reaches the last image the loop ends
	}
	//$('.preload:hidden').eq(i).fadeIn(500);//fades in the hidden images one by one
	$('.animated_icon').eq(0).animate({opacity:1},{"duration": 500});
	$('.animated').eq(0).animate({opacity:1},{"duration": 500});
	$('.animated').eq(0).removeClass("animated");
	$('.animated_icon').eq(0).removeClass("animated_icon");
	i++;//add 1 to the count*/
}