import"./modulepreload-polyfill-B5Qt9EMX.js";import{W as X,S as Y,P as A,A as O,D as $,O as F,h as R,i as M,e as T,R as V,V as q,C as U}from"./OrbitControls-uNc7TxmE.js";import{G as J,i as K}from"./GLTFLoader-BsC_77Lf.js";class N{constructor(a){this.mouseMoved;let t,n,b;a.addEventListener("mousedown",i=>{t=i.clientX,n=i.clientY,b=Date.now()}),a.addEventListener("mouseup",i=>{const C=Math.abs(i.clientX-t),l=Math.abs(i.clientY-n),x=Date.now()-b;C>5||l>5||x>500?this.mouseMoved=!0:this.mouseMoved=!1})}}function Q(){const c=document.querySelector("#three-canvas"),a=new X({canvas:c,antialias:!0});a.setSize(window.innerWidth,window.innerHeight),a.setPixelRatio(window.devicePixelRatio>1?2:1);const t=new Y,n=new A(75,window.innerWidth/window.innerHeight,.1,1e3);n.position.y=5,n.position.z=7,t.add(n);const b=new O("white",.5);t.add(b);const i=new $("white",1);i.position.x=1,i.position.z=2,t.add(i),new F(n,a.domElement),new R(1,1,1),new M({color:`rgb(
			${50+Math.floor(Math.random()*205)},
			${50+Math.floor(Math.random()*205)},
			${50+Math.floor(Math.random()*205)}
		)`});const C=new R(10,.1,10);let l,x;x=new M({color:"rgb(100,150,100)"}),l=new T(C,x),l.position.x=0,l.position.y=0,l.position.z=0,t.add(l);const d=new J;let u,g,m,p,h,w;const G=new V,v=new q;d.load("./models/namu.glb",e=>{console.log(e.scene.children),u=e.scene.children[0],t.add(u)}),d.load("./models/namuip.glb",e=>{g=e.scene.children[0],t.add(g)}),d.load("./models/apple1.glb",e=>{m=e.scene.children[0],t.add(m)}),d.load("./models/apple2.glb",e=>{p=e.scene.children[0],t.add(p)}),d.load("./models/apple3.glb",e=>{h=e.scene.children[0],t.add(h)}),d.load("./models/apple4.glb",e=>{w=e.scene.children[0],t.add(w)});let S=[0,0,0,0],y=[0,0,0,0],H=[0,0,0,0];const L=new K.GUI,I={red:0,green:0,blue:0};let r=0;L.add(I,"red",0,255).name("Red").onChange(function(e){S[r]=parseInt(e)}),L.add(I,"green",0,255).name("Green").onChange(function(e){y[r]=parseInt(e)}),L.add(I,"blue",0,255).name("Blue").onChange(function(e){H[r]=parseInt(e)});const W=new U;function j(){W.getDelta();const e=9127187,k=new M({color:e}),s=32768,B=new M({color:s});let D=[];for(let o=0;o<4;o++)D[o]=(S[o]<<16)+(y[o]<<8)+H[o];let f=[];for(let o=0;o<4;o++)f[o]=new M({color:D[o]});u&&u.material&&(u.material=k),g&&g.material&&(g.material=B),m&&m.material&&(m.material=f[0]),p&&p.material&&(p.material=f[1]),h&&h.material&&(h.material=f[2]),w&&w.material&&(w.material=f[3]),a.render(t,n),a.setAnimationLoop(j)}function P(){if(console.log(z.mouseMoved),z.mouseMoved)return;G.setFromCamera(v,n);let e=[m,p,h,w];const k=G.intersectObjects(e);for(const s of k){console.log(s.object.name),s.object.name=="큐브004"?r=2:s.object.name=="큐브001"?r=3:s.object.name=="큐브002"?r=1:s.object.name=="큐브003"&&(r=0);break}}function E(){n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight),a.render(t,n)}window.addEventListener("resize",E),c.addEventListener("click",e=>{v.x=e.clientX/c.clientWidth*2-1,v.y=-(e.clientY/c.clientHeight*2-1),P()});const z=new N(c);j()}Q();
