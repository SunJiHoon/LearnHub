import"./modulepreload-polyfill-B5Qt9EMX.js";import{W as f,S as L,P as u,A as b,D as x,O as z,h as w,i as c,e as S,C as W}from"./OrbitControls-uNc7TxmE.js";import{G as $}from"./GLTFLoader-BsC_77Lf.js";function v(){const h=document.querySelector("#three-canvas"),n=new f({canvas:h,antialias:!0});n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio>1?2:1);const o=new L,e=new u(75,window.innerWidth/window.innerHeight,.1,1e3);e.position.y=1.5,e.position.z=4,o.add(e);const l=new b("white",.5);o.add(l);const i=new x("white",1);i.position.x=1,i.position.z=2,o.add(i),new z(e,n.domElement),new w(1,1,1),new c({color:`rgb(
			${50+Math.floor(Math.random()*205)},
			${50+Math.floor(Math.random()*205)},
			${50+Math.floor(Math.random()*205)}
		)`});const m=new w(10,.1,10);let t,a;a=new c({color:`rgb(
			${50+Math.floor(Math.random()*205)},
			${50+Math.floor(Math.random()*205)},
			${50+Math.floor(Math.random()*205)}
		)`}),t=new S(m,a),t.position.x=0,t.position.y=0,t.position.z=0,o.add(t);const M=new $;let r;M.load("./models/alien_01.glb",s=>{console.log(s.scene.children),r=s.scene.children[0],o.add(r)});const p=new W;function d(){p.getDelta(),n.render(o,e),n.setAnimationLoop(d)}function g(){e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),n.setSize(window.innerWidth,window.innerHeight),n.render(o,e)}window.addEventListener("resize",g),d()}v();
