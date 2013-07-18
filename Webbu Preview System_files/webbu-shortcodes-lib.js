jQuery(document).ready(function($) {

	$(".webbu-tabs").tabs({ fx: { opacity: 'show' } });
	
	$(".webbu-toggle").each( function () {
		if($(this).attr('data-id') == 'closed') {
			$(this).accordion({ header: '.webbu-toggle-title', collapsible: true, active: false  });
		} else {
			$(this).accordion({ header: '.webbu-toggle-title', collapsible: true});
		}
	});
	
	
});