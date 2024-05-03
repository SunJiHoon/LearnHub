import{W as ue,S as le,P as me,O as pe,a as I,M as ye,b as ve,c as X,F as xe,B as fe,d as he,e as P,f as ge,g as Me}from"./OrbitControls-CL6NFaGB.js";document.addEventListener("DOMContentLoaded",()=>{const Y=document.getElementById("three-canvas"),S=document.getElementById("canvas-container"),W=document.getElementById("f"),j=document.getElementById("xmin"),V=document.getElementById("xmax"),$=document.getElementById("ymin"),H=document.getElementById("ymax"),q=document.getElementById("x0"),J=document.getElementById("y0"),K=document.getElementById("eta"),Q=document.getElementById("btn-plot"),T=document.getElementById("btn-add-point"),U=document.getElementById("btn-clear-point"),C=document.getElementById("vsh"),R=document.getElementById("fsh");let i=()=>0;function Z(e,t){return(i(e+1e-4,t)-i(e,t))/1e-4}function ee(e,t){return(i(e,t+1e-4)-i(e,t))/1e-4}const l=new ue({canvas:Y,antialias:!0}),M=new le,r=new me(75,1,.1,1e3);r.position.x=2,r.position.y=2,r.position.z=4;function L(){const{width:e,height:t}=S.getBoundingClientRect();r.aspect=e/t,r.updateProjectionMatrix(),l.setSize(e,t)}function k(){l.setPixelRatio(devicePixelRatio)}L(),k(),M.add(r);const N=new pe(r,l.domElement);N.enableDamping=!0,new ResizeObserver(()=>L()).observe(S),function e(){const t=matchMedia(`(resolution: ${devicePixelRatio}dppx)`);t.addEventListener("change",function n(){t.removeEventListener("change",n),k(),e()})}();const y=new I,v=new I,x=new I;y.applyMatrix4(new ye(1,0,0,0,0,0,1,0,0,-1,0,0,0,0,0,1)),M.add(y),y.add(v),y.add(x);const te=new ve(.1,32,32),b={value:0},E={value:1},ne=new X({vertexShader:C.textContent,fragmentShader:R.textContent,uniforms:{valueMin:b,valueMax:E,opacity:{value:1}},side:xe}),ae=new X({vertexShader:C.textContent,fragmentShader:R.textContent,uniforms:{valueMin:b,valueMax:E,opacity:{value:.25}},side:fe,transparent:!0}),oe=new he({color:16711680});function ie(){const e=q.valueAsNumber,t=J.valueAsNumber,n=new P(te,oe);n.position.x=e,n.position.y=t,n.position.z=i(e,t),x.add(n)}function z(){x.clear()}function F(){v.clear(),z(),i=new Function("x","y",`return ${W.value}`);const e=.1,t=.1,n=Math.floor(j.valueAsNumber/e)*e,m=Math.ceil(V.valueAsNumber/e)*e,p=Math.floor($.valueAsNumber/t)*t,se=Math.ceil(H.valueAsNumber/t)*t,w=(se-p)/t,B=(m-n)/e,O=[...Array(w+1)].map((o,a)=>[...Array(B+1)].map((u,d)=>i(n+d*e,p+a*t))),_=[...Array(w)].map((o,a)=>[...Array(B)].map((u,d)=>i(n+(d+.5)*e,p+(a+.5)*t))),G=[...O.flat(1),..._.flat(1)],de=G.reduce((o,a)=>Math.min(o,a),1/0),ce=G.reduce((o,a)=>Math.max(o,a),-1/0);b.value=de,E.value=ce;function s(o,a){c.push(n+o*e,p+a*t,O[a][o])}const c=[];for(let o=0;o<w;o++)for(let a=0;a<B;a++){const u=a,d=o,f=a+1,h=o+1,g=[n+(a+.5)*e,p+(o+.5)*t,_[o][a]];s(u,d),s(f,d),c.push(...g),s(f,d),s(f,h),c.push(...g),s(f,h),s(u,h),c.push(...g),s(u,h),s(u,d),c.push(...g)}const A=new ge;A.setAttribute("position",new Me(c,3)),v.add(new P(A,ne)),v.add(new P(A,ae))}Q.addEventListener("click",()=>F()),T.addEventListener("click",()=>ie()),U.addEventListener("click",()=>z()),F();let D=Date.now();function re(){if(Date.now()>=D){D+=1e3;for(const e of x.children){const t=K.valueAsNumber,n=e.position.x,m=e.position.y;e.position.x=n-t*Z(n,m),e.position.y=m-t*ee(n,m),e.position.z=i(e.position.x,e.position.y)}}N.update(),l.render(M,r)}l.setAnimationLoop(re)});