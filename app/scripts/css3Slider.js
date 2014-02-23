define(['jquery', 'slider'], function($, Slider){

	function Css3Slider(ele, opts){
		Slider.apply(this, arguments);
	}
	
	css3SliderMethods = {
		move: function(){
			var t = this;
			function _callback(){
				t.updateView();
				if( t.opts.callback ){
					t.opts.callback();
				}
			}
			var move = ( this.index * this.itemWidth);
			
			this.scroller[0].style.webkitTransition = '-webkit-transform '+this.opts.speed+'ms ease';
			this.scroller[0].style.webkitTransform = 'translate3d(-'+move+'px,0,0)';

			this.scroller.one('webkitTransitionEnd', function(){
				this.style.webkitTransition = '';
				_callback();
			});

		}
	}

	var methods = $.extend({}, Slider.prototype, css3SliderMethods);

	for( key in methods){
		Css3Slider.prototype[key] = methods[key];
	}

	$.fn.css3slider = function(opts){
		return this.each(function(){
			var $t = $(this);
			$t.data('slider', new Css3Slider($t, opts));
		});
	}
	
	return Css3Slider;
});