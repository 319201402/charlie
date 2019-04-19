(function (){
if(typeof window.Aero!=='undefined'){return}
var Aero=(function (){
	function Aero(o){
		var e=this.el=create(this.tmp),w,h;o=o||{}
		e.addEventListener('click',this.onClick),
		e.style.width=(w=(o.width||300))+'px',
		e.style.height=(h=(o.height||200))+'px',
		e.style.left=o.left||((window.innerWidth-w)/2)+'px',
		e.style.top=o.top||((window.innerHeight-h)/2)+'px',
		this.show()
	}
	Aero.prototype.tmp='<div class="window-frame"><div class="window-header"><div class="window-header-drag">Microsoft Windows</div><button class="window-header-close-btn">&times;</button></div><div class="window-body"></div></div>';
	Aero.prototype.show=function(){document.body.appendChild(this.el)}
	Aero.prototype.hide=function () {document.body.removeChild(this.el)}
	Aero.prototype.onClick=function (e) {
		var t=e.target;
		if(t.tagName==='BUTTON'&&t.classList.contains('window-header-close-btn')){
			document.body.removeChild(p(t,'window-frame'))
		}
	}
	return Aero
}());
window.Aero=Aero
function create(h,_d){return _d=document.createElement('div'),_d.innerHTML=h,_d.firstChild}
function p(d,c){
while(d.nodeType===1&&!d.classList.contains(c)){d=d.parentNode}
return d===document?null:d;
}
window.addEventListener('mousedown',function (e){var el,win,t=e.target,ch='window-header-drag';
if(!p(t,ch)){return}
el=p(t,'window-frame');el.classList.add('moving')
win=document.__window=document.__window||{};
win.el=el;
win.x=e.pageX-el.offsetLeft,
win.y=e.pageY-el.offsetTop;
});
window.addEventListener('mousemove',function (e) {
	var w=document.__window,x,y;
	if(!w||!w.el){return}
	x=e.pageX-w.x,y=e.pageY-w.y;
	x=Math.max(0,x),y=Math.max(0,y);
	w.el.style.left=x+'px';
	w.el.style.top =y+'px';
});
window.addEventListener('mouseup',function () {var w=document.__window;w&&w.el&&(w.el.classList.remove('moving'),w.el=null)})
document.head.appendChild(document.createElement('style')).innerHTML='.window-frame{position:absolute;left:0;top:0;width:300px;height:200px;border:solid 1px #333;border-radius:7px;background:rgba(130,190,220,.5)linear-gradient(45deg,#fff,transparent 10%,transparent 20%,rgba(255,255,255,.5) 30%,transparent 50%,transparent 60%,rgba(0,0,0,.2) 70%,transparent 80%,rgba(255,255,255,.5) 90%,transparent);box-shadow:inset 0 0 0 1px #fff,0 0 15px #000}.window-header{font:12px/29px sans-serif;text-indent:7px;position:relative;-webkit-user-select:none}.window-header>button{position:absolute;right:7px;top:-1px;width:47px;height:19px;padding:0;border:solid 1px rgba(0,0,0,.5);color:#fff;background-image:linear-gradient(#E1B3AF,#CD837C 50%,#B04A3E 50%,#C68478);border-radius:0 0 5px 5px;font:14px/19px sans-serif;text-shadow:0 0 1px #000;box-shadow:inset 0 0 1px 1px #fff;-webkit-appearance:none}.window-body{position:absolute;left:6px;top:29px;right:6px;bottom:6px;padding:8px;border:solid 1px #666;border-radius:1px;background-color:#fff;box-shadow:0 0 0 1px #fff}'
}())
