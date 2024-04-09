import{V as f,E as $,l as q,W as H,c as K,d as V,A as I,D as G,m as E,n as y,i as g,C as j}from"./three.module-CjKEdBr8.js";const r=new q(0,0,0,"YXZ"),a=new f,Q={type:"change"},U={type:"lock"},Z={type:"unlock"},M=Math.PI/2;class B extends ${constructor(e,o){super(),this.camera=e,this.domElement=o,this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=O.bind(this),this._onPointerlockChange=T.bind(this),this._onPointerlockError=J.bind(this),this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return this.camera}getDirection(e){return e.set(0,0,-1).applyQuaternion(this.camera.quaternion)}moveForward(e){const o=this.camera;a.setFromMatrixColumn(o.matrix,0),a.crossVectors(o.up,a),o.position.addScaledVector(a,e)}moveRight(e){const o=this.camera;a.setFromMatrixColumn(o.matrix,0),o.position.addScaledVector(a,e)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function O(n){if(this.isLocked===!1)return;const e=n.movementX||n.mozMovementX||n.webkitMovementX||0,o=n.movementY||n.mozMovementY||n.webkitMovementY||0,t=this.camera;r.setFromQuaternion(t.quaternion),r.y-=e*.002*this.pointerSpeed,r.x-=o*.002*this.pointerSpeed,r.x=Math.max(M-this.maxPolarAngle,Math.min(M-this.minPolarAngle,r.x)),t.quaternion.setFromEuler(r),this.dispatchEvent(Q)}function T(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(U),this.isLocked=!0):(this.dispatchEvent(Z),this.isLocked=!1)}function J(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}class N{constructor(){this.keys=[],window.addEventListener("keydown",e=>{console.log(e.code+" 누름"),this.keys[e.code]=!0}),window.addEventListener("keyup",e=>{console.log(e.code+" 뗌"),delete this.keys[e.code]})}}class ee{constructor(e){this.keys=[],e.domElement.addEventListener("mousedown",o=>{console.log(o.button+" 누름"),this.keys[o.button]=!0}),e.domElement.addEventListener("mouseup",o=>{console.log(o.button+" 뗌"),delete this.keys[o.button]})}}function oe(){const n=document.querySelector("#three-canvas"),e=new H({canvas:n,antialias:!0});e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio>1?2:1);const o=new K,t=new V(75,window.innerWidth/window.innerHeight,.1,1e3);t.position.y=1.5,t.position.z=4,o.add(t);const L=new I("white",.5);o.add(L);const m=new G("white",1);m.position.x=1,m.position.z=2,o.add(m);const s=new B(t,e.domElement);s.domElement.addEventListener("mousedown",u=>{u.button===0&&s.lock()}),s.addEventListener("lock",()=>{console.log("lock!")}),s.addEventListener("unlock",()=>{console.log("unlock!")});const x=new E(1,1,1);let P=new y({color:`rgb(
			${50+Math.floor(Math.random()*205)},
			${50+Math.floor(Math.random()*205)},
			${50+Math.floor(Math.random()*205)}
		)`});const h=new ee(s);function b(){if(h.keys[0]&&console.log("좌클릭"),h.keys[1]&&console.log("휠"),h.keys[2]){console.log("우클릭");var u=new f,l=s.getDirection(u);console.log("카메라의 시선 방향:",l),console.log("카메라의 현재 위치:",t.position);let D=t.position.x,p=t.position.y,z=t.position.z,F=l.x,v=l.y,R=l.z,W=(0-parseFloat(p))/parseFloat(v)*parseFloat(F)+parseFloat(D),X=0,Y=(0-p)/v*R+z,d=new g(x,P);d.position.x=W,d.position.y=X,d.position.z=Y,o.add(d)}}const i=new N;function _(){(i.keys.KeyW||i.keys.ArrowUp)&&s.moveForward(.02),(i.keys.KeyS||i.keys.ArrowDown)&&s.moveForward(-.02),(i.keys.KeyA||i.keys.ArrowLeft)&&s.moveRight(-.02),(i.keys.KeyD||i.keys.ArrowRight)&&s.moveRight(.02),i.keys.Space&&(t.position.y+=.02),(i.keys.ShiftLeft||i.keys.ShiftRight)&&(t.position.y-=.02)}const C=new E(10,.1,10);let c,w;w=new y({color:`rgb(
			${50+Math.floor(Math.random()*205)},
			${50+Math.floor(Math.random()*205)},
			${50+Math.floor(Math.random()*205)}
		)`}),c=new g(C,w),c.position.x=0,c.position.y=0,c.position.z=0,o.add(c);const S=new j;function k(){S.getDelta(),b(),_(),e.render(o,t),e.setAnimationLoop(k)}function A(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),e.setSize(window.innerWidth,window.innerHeight),e.render(o,t)}window.addEventListener("resize",A),k()}oe();
