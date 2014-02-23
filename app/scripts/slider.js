define(['jquery'], function($){

function Slider(ele, opts){
	this.ele = ele;
	var defaults = {
		speed: 400,
		itemSelector: '.item',
		maskSelector: 'div.mask',
		nextSelector: 'a.next',
		prevSelector: 'a.prev',
		scrollerSelector: '.scroller',
		pagingSelector: 'ul.paging'
	}
	this.opts = $.extend({}, defaults, opts);
	this.items = this.ele.find( this.opts.itemSelector );
	this.mask = this.ele.find( this.opts.maskSelector );
	this.btnNext = this.ele.find( this.opts.nextSelector );
	this.btnPrev = this.ele.find( this.opts.prevSelector );
	this.scroller = this.ele.find( this.opts.scrollerSelector );
	this.paging = this.ele.find( this.opts.pagingSelector );
	this.pagingItems = $([]);

	this.total = 0; // total is calculated during the layout
	this.itemWidth = 0; //calulated during layout
	this.index = 0;
	this.init();
}
sliderMethods = {
	init: function(){
		var t = this;
		this.layout();

		function _next(e){
			t.next();
			e.preventDefault();
		}
		function _prev(e){
			t.prev();
			e.preventDefault();
		}

		this.btnNext.on( 'click', _next );
		this.btnPrev.on( 'click', _prev );
	},
	layout: function(){
		var t = this;
		this.total = this.items.length;
		this.itemWidth = this.getItemWidth();

		this.items.width( this.itemWidth );
		this.scroller.width( this.itemWidth * this.total );

		function _buildPaging(){
			var html = [], i;
			for( i = 0; i < t.total; i++ ){
				html.push('<li><a href="#" data-index="'+i+'" /><span>'+i+'</span></a></li>');
			}
			return html.join('');
		}

		this.paging.html( _buildPaging() );
		this.pagingItems = this.paging.find('a');
		this.index = this.items.index( this.items.filter('.active') );

		this.move();
	},
	getItemWidth: function(){
		return this.mask.width();
	},
	resize: function(){

	},
	getIndex: function(n){
		this.index = (n > -1) && n < this.total ? n : 0;
		return this.index;
	},
	move: function(){
		var t = this;
		function _callback(){
			t.updateView();
			if( t.opts.callback ){
				t.opts.callback();
			}
		}
		this.scroller.animate({
			left: - ( this.index * this.itemWidth)
		}, this.opts.speed, _callback);
	},
	goTo: function(n){
		this.index = this.getIndex();
		if( this.index === n ){ return n; }
		this.move();
	},
	next: function(){
		this.getIndex( ++this.index );
		this.move();
	},
	prev: function(){
		this.getIndex( --this.index );
		this.move();
	},
	updateView: function(){
		this.pagingItems
			.filter('.active')
				.removeClass('active')
				.end()
			.eq( this.index )
				.addClass('active');
	}
}

// add methods to the prototype chain
for(key in sliderMethods){
	Slider.prototype[key] = sliderMethods[key];
}

// play nice with jquery
$.fn.slider = function(opts){
	return this.each(function(){
		var $t = $(this);
		$t.data( 'slider', new Slider( $t, opts ) );
	});
}

return Slider;
});