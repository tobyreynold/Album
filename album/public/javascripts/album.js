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

	/*pulic attr*/
	_this.dom = typeof _this.options.dom ==='string'? $(_this.options.dom) : _this.options.dom;
	_this.time = _this.options.time || 3000;
	_this.isVertical = _this.options.isVertical;
	_this.type = _this.options.type || 'img';
	_this.prev = typeof _this.options.prev ==='string'? $(_this.options.prev) : _this.options.prev;
	_this.next = typeof _this.options.next ==='string'? $(_this.options.next) : _this.options.next;
	_this.index = _this.options.index || 1;
	_this.autoPlay = _this.options.autoPlay;
	_this.data = Object.prototype.toString.call(_this.options.data) === '[object Array]'? _this.options.data : [];

	/*private attr*/
	_this.animated = false;
	_this.len = _this.data.length;
	_this.width = _this.dom.width();

	_this.renderHtml();
	_this.init();
	_this.handler();

}

album.prototype.handler = function() {
	var _this = this;

	_this.dom.on('click',_this.options.prev,function() {
		_this.prvSlide();
	});

	_this.dom.on('click',_this.options.next,function() {
		_this.nextSlide();
	});
	
}

album.prototype.renderHtml = function() {
	var _this = this,
		outer = $("<ul></ul>"),
		prev = $("<span class='prev'></span>"),
		next = $("<span class='next'></span>"),
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
	$(_this.dom).append(outer).append(prev).append(next);
}

album.prototype.init = function() {
	this.play();
}

album.prototype.nextSlide = function() {
	this.swithTo(this.index + 1);
}

album.prototype.prvSlide = function() {
	this.swithTo(this.index - 1);
}

album.prototype.swithTo = function(index) {
	var _this = this;

	if(_this.index == index) return;
	var newIndex = index > _this.len ? 1 : (index < 1 ? _this.len : index);
	_this.index = newIndex;
	_this.setPosition(-index * _this.width,newIndex);
}


album.prototype.setPosition = function(pos,index,hasAnimate) {
	var _this = this,
    $eles = _this.dom.find("li"),
    $currentDom = _this.dom.find("li.current");

    if(!hasAnimate) {
    	$currentDom.removeClass("current").addClass("hidden");
    	$eles.eq(index-1).removeClass("hidden").addClass("current");
    }
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