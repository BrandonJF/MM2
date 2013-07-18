var $ = jQuery.noConflict();

$(function(){
	
	
	var menuaktif  = 1;
	
	// Hide on page open.
	$('#menu').hide();
	$('.closeMenu').hide();
	
	// Menu Animate
	
		$('.showMenu').click(function(){
				$('.content').animate({ left: 240 }, 400, 'easeOutQuad', function(){$('#menu').show("slide", { direction: "left" }, 0, 'easeOutQuad');});
				$('#menu').show("slide", { direction: "left" }, 0, 'easeOutQuad');
				$('.showMenu').hide();
				$('.closeMenu').show();
				return false;
		});
		
		$('.closeMenu').click(function(){
        		$('#menu').hide("slide", 0, 'easeOutQuad');
				$('.content').animate({ left: 0 }, 400, 'easeOutQuad', function(){});	
				$('.closeMenu').hide();
				$('.showMenu').show();
				return false;
		});
		
	
		// Swipe functions
 	//$('.content').on({
//      'swipeleft' : function(ev) {
//            $('#menu').hide("slide", 0, 'easeOutQuad');
//       		$('.content').animate({ left: 0 }, 400, 'easeOutQuad');	
//            $('.closeMenu').hide();
//            $('.showMenu').show();
//      },
//      'swiperight' : function(ev) {
//      		$('#menu').show("slide", { direction: "left" }, 0, 'easeOutQuad');
//       		$('.content').animate({ left: 240 }, 400, 'easeOutQuad', function(){});
//            $('.showMenu').hide();
//            $('.closeMenu').show();
//      }
//    })
    	
	
	// Close menu on click to link
	//$(".sub-menu-link").click(function(){
//		$('#menu').hide("slide", 0, 'easeOutQuad');
//		$('.content').animate({ left: 0 }, 400);	
//        $('.closeMenu').hide();
//        $('.showMenu').show();
//		$("body").scrollTop(0);
//		
//	});

	// Close menu on orientation change
	$(document).bind('orientationchange', function(){
	  	$('#menu').hide("slide", 0);
        $('.content').animate({ left: 0 }, 400);	
        $('.closeMenu').hide();
        $('.showMenu').show();
	  
	 });  

    
	if(jQuery(".gallery a").length > 0 ){
	var myPhotoSwipe = Code.PhotoSwipe.attach( window.document.querySelectorAll('.gallery a'), { enableMouseWheel: false , enableKeyboard: false } );
	}; 
});