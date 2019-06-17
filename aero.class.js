(function (){
class Frame extends HTMLElement{
	constructor(){
		super();
		this.defaultCfg={
			title:'Microsoft Windows',
			msg:'hello',
			width:300,
			height:200,
			minWidth:180,
			minHeight:38,
			zIndex:0,
			resize:true
		}
	}
	extend(des,src){
		for(var k in src){
			if(typeof des[k]==='undefined'){des[k]=src[k]}
		}
		return des
	}
	/**@return [Node*/
	createNodes (str){
		var d=document.createElement('div'),c,r=[];
		d.innerHTML=str;
		c=d.childNodes;
		for(var i=0,ln=c.length;i<ln;i++){
			r[i]=c[i]
		}
		return r;
	}
	_append (p,nodes){
		for(var i=0,len=nodes.length;i<len;i++){
			p.appendChild(nodes[i])
		}
	}
	show (){
		return this.style.display="block",this.center().setZIndex()
	}
	hide (){
		return this.style.display="none",this
	}
	destory(){
		return this.parentNode.removeChild(this)
	}
}
Frame.zIndex=1e3;
class Aero extends Frame{
	constructor(cfg){
		super();
		var shadow=this.attachShadow({mode:'open'})
		this.cfg=this.extend(cfg||{},this.defaultCfg);
		var borders=['sw','w','nw','n','ne','e','se','s'].map(function (n,x){return '<div class="window-borders wb-'+n+'" data-dir="'+(x-5)+'"></div>'}).join('');
		shadow.innerHTML=`<style>*{box-sizing:border-box}
.window-backdrop{display:none;position:fixed;left:0;top:0;width:100%;height:100%;z-index:998}
.window-frame{position:absolute;width:300px;height:200px;border:solid 1px #333;border-radius:7px;background:rgba(187, 231, 251,.9) linear-gradient(45deg,#fff,transparent 10%,transparent 20%,rgba(255,255,255,.8) 30%,transparent 50%,transparent 60%,rgba(0,0,0,.1) 70%,transparent 80%,rgba(255,255,255,.8) 90%,transparent);box-sizing:border-box;box-shadow:inset 0 0 0 1px rgba(255,255,255,.8),0 0 15px #000;-webkit-user-select:none;z-index:999}
.maximize{left:0;top:0;width:100%;height:100%}
.window-header{font:12px/29px sans-serif;text-indent:7px;position:relative;-webkit-user-select:none}
.window-header-drag{height:29px}
.window-header-drag>.title{pointer-events:none;border-radius:20%;box-shadow:0 0 10px 5px rgba(255, 255, 255, 0.6), inset 0 0 0 10px rgba(255, 255, 255, 0.6)}
.window-header-btns{position:absolute;right:7px;top:-1px;height:20px;z-index:1;font-size:0}
.window-header-btns>button{width:48px;height:20px;padding:0;border:solid 1px rgba(0,0,0,.5);color:#fff;font:14px/19px sans-serif;outline:none;text-shadow:0 0 1px #000;box-shadow:inset 0 0 0 1px rgba(255,255,255,.8);background:linear-gradient(#e5eff9,#cedbe8 50%,#aec0d2 50%,#b1c2d9);-webkit-appearance:none}
.window-header-btns>button.window-header-min-btn{width:29px;margin-right:-1px;border-radius:0 0 0 5px}
.window-header-btns>button.window-header-max-btn{width:27px;margin-right:-1px}
.window-header-btns>button.window-header-close-btn{border-radius:0 0 5px 0;background-image:linear-gradient(#E1B3AF,#CD6E65 50%,#AE2A1B 50%,#C68478);}
.window-header-btns>button:hover{box-shadow:0 0 10px 3px #6cd1fb,inset 0 0 0 1px #0dd;background:linear-gradient(#b7dbf3,#84b5d9 50%,#2173ad 50%,#3d8cc4)}
.window-header-btns>button:active::before{background-position:1px 1px}
.window-header-btns>button.window-header-close-btn:hover{box-shadow:0 0 10px 3px #d06a6a,inset 0 0 0 1px #fba;background-image:linear-gradient(#f3a8a1,#da6c62 50%,#bc3728 50%,#f44322)}
.fixed button.window-header-close-btn{border-radius:0 0 5px 5px}
.window-header-btns>button::before{content:"";display:inline-block;width:16px;height:16px;pointer-events:none;background-position:center;background-repeat:no-repeat}
.window-header-min-btn::before{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggc3Ryb2tlPSIjNTM1NjY2IiBmaWxsPSIjZmZmIiBkPSJNMi41LDkuNWgxMnY0aC0xMnYtNC41Ii8+PC9zdmc+)}
.window-header-max-btn::before{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggc3Ryb2tlPSIjNTM1NjY2IiBmaWxsPSIjZmZmIiBkPSJNMi41LDQuNWgxMnYxMGgtMTJ2LTEwbTMsM3Y0aDZ2LTRoLTYiLz48L3N2Zz4=)}
.maximize .window-header-max-btn::before{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggc3Ryb2tlPSIjNTM1NjY2IiBmaWxsPSIjZmZmIiBkPSJNMi41LDQuNWg5djloLTl2LTloMnYtMmg5djloLTJ2LTJtLTMtMmgtM3YzaDN2LTMuNSIvPjwvc3ZnPg==)}
.window-header-close-btn::before{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggc3Ryb2tlPSIjNTM1NjY2IiBmaWxsPSIjZmZmIiBkPSJNMS41LDQuNWg0bDIsMmwyLTJoNGwtNCw0bDQsNGgtNGwtMi0ybC0yLDJoLTRsNC00bC00LTR6Ii8+PC9zdmc+)}
.window-body{position:absolute;left:6px;top:29px;right:6px;bottom:6px;overflow:hidden;border:solid 1px #666;border-radius:1px;background-color:#fff;box-shadow:0 0 0 1px #fff}
.window-frame>.window-borders{position:absolute}
.wb-nw,.wb-n,.wb-ne{top:0px;height:7px}.wb-w,.wb-e{width:7px}.wb-sw,.wb-s,.wb-se{bottom:0px;height:7px}
.wb-nw,.wb-ne,.wb-se,.wb-sw{width:7px;height:7px}.wb-nw,.wb-w,.wb-sw{left:0px}.wb-n,.wb-s{left:7px}.wb-ne,.wb-e,.wb-se{right:0px}
.wb-n,.wb-s{left:7px;right:7px;cursor:s-resize}.wb-w,.wb-e{top:7px;bottom:7px;cursor:e-resize}.wb-nw,.wb-se{cursor:se-resize}.wb-ne,.wb-sw{cursor:ne-resize}
.fixed .window-header-min-btn,.fixed .window-header-max-btn,.fixed>.window-borders,.maximize>.window-borders{display:none}</style>
<div class="window-backdrop"></div>
<div class="window-frame">
	<header class="window-header">
		<div class="window-header-drag draggable"><span class="title">${this.cfg.title}</span></div>
		<div class="window-header-btns">
			<button class="window-header-min-btn"></button>
			<button class="window-header-max-btn window-max"></button>
			<button class="window-header-close-btn window-close"></button>
		</div>
	</header>
	<div class="window-body"></div>${borders}
</div>`;
		this._back=shadow.querySelector('.window-backdrop');
		this._win=shadow.querySelector('.window-frame');
		this.setContent(this.cfg.msg).setReisze(this.cfg.resize)
			.setSize(this.cfg.width,this.cfg.height).setZIndex()
		this.style.display='none'
	}
	toggleMax (){
		var max='maximize',
		t=this._win,
		bmx=t.classList.contains(max);
		if(bmx){//restore
			t.style.cssText=t.dataset.css;
		}else{//save
			t.dataset.css=t.style.cssText;
			t.style.cssText='';
		}
		t.classList.toggle(max);return this.setZIndex()
	}
	center (){
		var t=this._win,w=t.offsetWidth,h=t.offsetHeight;
		t.style.left=(innerWidth-w)/2+'px',
		t.style.top =(innerHeight-h)/2+'px';return this
	}
	setPos(x,y){
		return this._win.style.left=x+'px',this._win.style.top=y+'px',this;
	}
	setSize(w,h){
		return this._win.style.width=(this.cfg.width=w)+'px',
		this._win.style.height=(this.cfg.height=h)+'px',this
	}
	setReisze (r){
		return this.cfg.resize=r,
		this.shadowRoot.querySelector('.window-backdrop').style.display=r?'none':'block',
		this._win.classList.toggle('fixed',!r),this
	}
	setTitle (txt){
		return this.shadowRoot.querySelector('.title').textContent=txt,this
	}
	setZIndex(){
		if(this.cfg.zIndex<Frame.zIndex){
			this.cfg.zIndex=Frame.zIndex+=2;
		}
		if(!this.cfg.resize){this._back.style.zIndex=this.cfg.zIndex}
		this._win.style.zIndex=this.cfg.zIndex+1;
		return this
	}
	setContent (val,m){
		var nodes;
		if(typeof val==='string'){
			nodes=this.createNodes(val)
		}else if(typeof val.nodeType==='number'){
			nodes=[val]
		}
		if(nodes&&nodes.length){
			this._append(this.shadowRoot.querySelector(m||'.window-body'),nodes);
		}
		return this
	}
	replaceContent(val,m){
		var bd=this.shadowRoot.querySelector(m||'.window-body');
		;[].forEach.call(bd.childNodes,function(c){c.parentNode.removeChild(c)})
		return this.setContent(val,m)
	}
}

customElements.define('x-aero',Aero)
window.Aero=Aero;
window.addEventListener('dblclick',function (e){
	var t=e.target,rt=e.path[0];
	if(t.tagName!=='X-AERO'){return}
	if(t._win.classList.contains('fixed')){return}
	if(rt.classList.contains('draggable')){
		t.toggleMax()
	}
})
window.addEventListener('click',function (e){
	var t=e.target,rt=e.path[0];
	if(t.tagName!=='X-AERO'){return}
	if(rt.tagName==='BUTTON'){
		if(rt.classList.contains('window-close')){
			t.hide()
		}else if(rt.classList.contains('window-max')){
			t.toggleMax()
		}
	}
})
window.addEventListener('mousedown',function(e){
	var t=e.target,rt,win,dt;
	if(t.tagName!=='X-AERO'){return}
	rt=e.path[0];
	
	t.setZIndex();

	win=t._win;
	if(win.classList.contains('maximize')){return}
	
	dt=win.data=win.data||{};
	if(rt.classList.contains('draggable')){
		dt.x=e.pageX-win.offsetLeft,
		dt.y=e.pageY-win.offsetTop;
		dt.drag=true;
		document.__win=win;
	}else if(rt.classList.contains('window-borders')){
		dt.l=win.offsetLeft,
		dt.t=win.offsetTop,
		dt.w=win.offsetWidth,
		dt.h=win.offsetHeight,
		dt.x=e.pageX-dt.l,
		dt.y=e.pageY-dt.t,
		dt._dir=rt.dataset.dir-0;
		dt.nw=t.cfg.minWidth;
		dt.nh=t.cfg.minHeight
		dt.resize=true;
		document.__win=win;
	}
})
window.addEventListener('mousemove',function (e){
	var win=document.__win,ds,x,y,l,t,w,h,px,py,dt;
	if(!win){return}
	dt=win.data;
	if(dt.drag){
		x=e.pageX-dt.x,
		y=e.pageY-dt.y;
		x=Math.max(0,x),
		y=Math.max(0,y);
		
		win.style.left=x+'px',
		win.style.top =y+'px';
	}else if(dt.resize){
		l=dt.l,t=dt.t,x=dt.x,y=dt.y,w=dt.w,h=dt.h;
		px=e.pageX,py=e.pageY;
		var ox=w-x,oy=h-y;
		switch(dt._dir){
			case  0:w=px-l+ox;/*******/;break;
			case  1:w=px-l+ox;h=py-t+oy;break;
			case  2:/*******/;h=py-t+oy;break;
			case -1:/***************/;py=Math.max(y,py);w=px-l+ ox;h=t+h-py+y;/****/;t=py-y;break;
			case -2:/***************/;py=Math.max(y,py);/********/;h=t+h-py+y;/****/;t=py-y;break;
			case -3:px=Math.max(x,px);py=Math.max(y,py);w=l+w-px+x;h=t+h-py+y;l=px-x;t=py-y;break;
			case -4:px=Math.max(x,px);/***************/;w=l+w-px+x;/********/;l=px-x;/****/;break;
			case -5:px=Math.max(x,px);/***************/;w=l+w-px+x;h=py-t+ oy;l=px-x;/****/;break;
		}
		w=Math.max(dt.nw,w),
		h=Math.max(dt.nh,h);
		win.style.width=w+'px',win.style.height=h+'px';
		if(dt._dir<0){
			l=Math.min(l,dt.l+dt.w-dt.nw),
			t=Math.min(t,dt.t+dt.h-dt.nh);
			win.style.left=l+'px',win.style.top=t+'px'
		}
	}
	
})
window.addEventListener('mouseup',function (){
	var w=document.__win;
	if(!w){return}
	w.data.drag=w.data.resize=false;
	document.__win=null;
})

/********Alert**********/
function Alert(title,msg,width){
	var body=`<style>
.dlg-btn{font:12px/1.6 simsun;padding:1px 10px;min-width:80px;border:solid 1px #666;box-shadow:inset 0 0 0 1px #fff;background:linear-gradient(#f2f2f2,#ececec 50%,#ddd 50%,#cfcfcf);border-radius:2px}
.dlg-btn:active{box-shadow:inset 0 0 3px 1px #00a9e2}
.dlg-msg{padding:8px;margin:8px 0}
.dlg-footer{width:100%;left:0;bottom:0;padding:5px 0;text-align:center;background:#f1eded;border-top:solid 1px #ccc}
</style>
<div class="dlg-content">
	<div class="dlg-msg">${msg}</div>
	<div class="dlg-footer"><button class="dlg-btn window-close">确定</button></div>
</div>`;
	var dlg=new Aero({title:title,msg:body,width:width||300,height:100,resize:false});
	dlg._win.style.height='auto'
	dlg._win.querySelector('.window-body').style.cssText='position:relative;left:0;top:0;margin:0 7px 7px'
	return dlg;
}
window.Alert=Alert;
}())