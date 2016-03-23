;(function(window) {
	function album(options) {
		
		var _this = this;

		_this.options = {
			dom:'#album',
			time:3000,
			isVertical:false,
			type:'img',
			prev:'.prev',
			next:'.next',
			index:1,
			autoPlay:true,
			data:[]
		}

		if(options) {
			for(var item in options) {
				_this.options[item] = options[item];
			}
		}

		_this.dom = typeof _this.options.dom ==='string'? $(_this.options.dom) : _this.options.dom;
		_this.time = _this.options.time || 3000;
		_this.isVertical = _this.options.isVertical;
		_this.type = _this.options.type || 'img';
		_this.prev = typeof _this.options.prev ==='string'? $(_this.options.prev) : _this.options.prev;
		_this.next = typeof _this.options.next ==='string'? $(_this.options.next) : _this.options.next;
		_this.index = _this.options.index || 1;
		_this.autoPlay = _this.options.autoPlay;
		_this.data = Object.prototype.toString.call(_this.options.data) === '[object Array]'? _this.options.data : [];

		_this.renderHtml();
		_this.init();
		_this.handler();

	}

	album.prototype.handler = function() {
		
	}

	album.prototype.renderHtml = function() {
		var _this = this,
			outer = $("<ul></ul>"),
			len = this.data.length,
			cont = '';

		if(this.type == 'img') {
			for(var i = 0;i < len;i++) {
				var klass = i == 0? "current" : "hidden";
				cont += '<li class='+ klass +'><img src="' + _this.data[i] + '"></li>';	
			}	
		} else {
			for(var i = 0;i < len;i++) {
				var klass = i == 0? "current" : "hidden";
				cont += '<li class='+ klass +'>' + _this.data[i] + '</li>';	
			}	
		}
		
		$(outer).append(cont);
		$(_this.dom).append(outer);
	}

	album.prototype.init = function() {
		this.play();
	}

	album.prototype.nextSlide = function() {
		console.log(1);
	}

	album.prototype.swithTo = function(index) {

	}

	album.prototype.stop = function() {
		clearInterval(this.timer);
		this.timer = undefined;
	}

	album.prototype.play = function() {
		var _this = this;

		if(_this.timer) {
			return false;
		}
		if(_this.autoPlay) {
			this.timer = setInterval(function(){
				_this.nextSlide();
			},_this.time);	
		}
		
	
	}



	window.album = album;

})(window);