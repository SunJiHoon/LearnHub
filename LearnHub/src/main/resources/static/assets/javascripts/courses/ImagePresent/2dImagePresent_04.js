import{t as C,d as I,u as b,a as s,b as h,c as w,e as R}from"../assets/image-CwCmjFrt.js";document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("canvas"),n=t.getContext("2d"),c=document.getElementById("colorPicker"),g=document.getElementById("colorPickerLabel"),y=document.getElementById("clear"),E=document.getElementById("convert"),B=document.getElementById("matrix"),M=document.getElementById("redMatrix"),k=document.getElementById("greenMatrix"),L=document.getElementById("blueMatrix"),f=document.getElementById("toggle");let m=!1,x="#000000",d=!1,r=[...Array(15)].map(()=>Array(15).fill(16777215));function p(){n.clearRect(0,0,t.width,t.height),n.fillStyle="white",n.fillRect(0,0,t.width,t.height)}function v(e,o,i,a){m&&(n.strokeStyle=x,n.lineWidth=20,n.lineCap="round",n.lineJoin="round",n.beginPath(),n.moveTo(e,o),n.lineTo(i,a),n.stroke())}function u(){b(B,r),(d?s:h)(M,r.map(e=>e.map(o=>o>>16&255))),(d?s:w)(k,r.map(e=>e.map(o=>o>>8&255))),(d?s:R)(L,r.map(e=>e.map(o=>o&255)))}t.addEventListener("mousedown",e=>{m=!0;const{left:o,top:i}=t.getBoundingClientRect(),a=e.clientX-o,l=e.clientY-i;v(a,l,a,l)}),t.addEventListener("mousemove",e=>{const{left:o,top:i}=t.getBoundingClientRect(),a=e.clientX-o,l=e.clientY-i;v(a-e.movementX,l-e.movementY,a,l)}),t.addEventListener("mouseup",()=>{m=!1}),c.addEventListener("input",()=>{x=g.style.backgroundColor=c.value}),y.addEventListener("click",p),E.addEventListener("click",()=>{r=C(I(t,15,15)),u()}),f.addEventListener("click",()=>{d=!d,f.textContent=d?"색 보기":"값 보기",u()}),p(),g.style.backgroundColor=c.value,u()});
