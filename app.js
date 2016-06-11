jQuery( document ).ready(function( $ ) {

	$('.test').on('click',function(e) {
		$('.progress-bar').css('width',$(this).data('val'));
		//$('.progress-text').text($(this).data('val'));
	});
	$('#slider').on('input',function(e) {
		$('.progress-bar').css('width',e.target.value+'%');
	});

	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
	  	if (mutation.type == 'attributes' && mutation.attributeName == 'style') {
	    	var el = mutation.target;
	        var width = el.style.width; // Can't use jQuery here, as we need the value back in percent
			var $parentEl =$(el).parent('.progress');
			$parentEl.attr('data-width',width); // Why doesn't this work?? $parentEl.data('width',width)
			$parentEl.find('.progress-text').text(width);
	  	}
	  });
	});

	// configuration of the observer
	var config = {
		attributes: true,
		attributeFilter: ['style'],
		childList: false,
		characterData: false
	};

	$('.progress-bar').each(function(e) {
		// pass in the target node, as well as the observer options
		observer.observe(this, config);
	})

  $('.test').eq(4).trigger('click');
});

/////////////////////////////////////////////////////

$(function() {

	$('.progressbar1').each(function(){
		var t = $(this);
		var dataperc = t.attr('data-perc'),
				barperc = Math.round(dataperc*5.56);
		t.find('.bar').animate({width:barperc}, dataperc*25);
		t.find('.label').append('<div class="perc"></div>');

		function perc() {
			var length = t.find('.bar').css('width'),
				perc = Math.round(parseInt(length)/5.56),
				labelpos = (parseInt(length)-2);
			t.find('.label').css('left', labelpos);
			t.find('.perc').text(perc+'%');
		}
		perc();
		setInterval(perc, 0);
	});
});
