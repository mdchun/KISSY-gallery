/**
 * 
 * @authors 小马g2011
 * @version 1.0
 * 上下滚动
 */
KISSY.add('AutoScroll',function(S,Node,Event){
	var $ = S.one;
	
	var defaults = {
			ele:'#J-scroll',
			targets:'li',
			autoPlay:true,
			times:2000,
			duration:.8,
			easing:'swing'
		};
		function run(opt){
			this.opt = S.mix(defaults,opt);
			this._Ele = $(this.opt.ele);
			this.oList = this._Ele.all( this.opt.targets );
			this.init();
		}

		run.prototype = {
			constructor: run,

			init:function(){
				this.iNow = 0;
				this.iNow2 = 0;
				this.timer = null;

				var _this = this;
				if(this.opt.autoPlay){
					this.timer = setInterval(function(){
						_this.go();
					},_this.opt.times);

					this._bind();
				}
			},
			go:function(){
				var elems = this.oList,
					_Ele  = this._Ele,
					_this = this,
					H = $(elems[0]).height();

				if(this.iNow == 0){
					elems[0].style.position = 'static';
					_Ele.css({
						top:0
					});
					this.iNow2 = 0;
				}
				
				if(this.iNow == elems.length-1){
					this.iNow = 0;
					elems[0].style.position = 'relative';
					elems[0].style.top = elems.length * H + 'px';
				}
				else{
					this.iNow++;
				}
				
				this.iNow2++;
				
				_Ele.stop().animate({
					top:-_this.iNow2*H
				},_this.opt.duration,_this.opt.easing);
			},
			clear:function(){
				var _this = this;
				clearInterval(_this.timer);
			},
			_bind:function(){
				var _this = this;
				Event.on(this.opt.ele,{
					'mouseenter':{
						fn:function(ev){
							_this.clear();
						}
					},
					'mouseleave':{
						fn:function(ev){
							_this.timer = setInterval(function(){
								_this.go();
							},_this.opt.times);
						}
					}
				});
			}

		}

		return run;

},{
	requires:[
		'node',
		'event'
	]
});
