import{g as y,d as E,b as h,h as p}from"../assets/image-mFm3hv0y.js";document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("canvas"),t=e.getContext("2d"),f=document.getElementById("clear"),x=document.getElementById("convert"),s=document.getElementById("matrix"),u=document.getElementById("toggle");let r=!1,l=!1,c=[...Array(15)].map(()=>Array(15).fill(255));function g(){t.clearRect(0,0,e.width,e.height),t.fillStyle="white",t.fillRect(0,0,e.width,e.height)}function v(n,d,o,i){r&&(t.strokeStyle="black",t.lineWidth=20,t.lineCap="round",t.lineJoin="round",t.beginPath(),t.moveTo(n,d),t.lineTo(o,i),t.stroke())}function m(){l?h(s,c):p(s,c)}e.addEventListener("mousedown",n=>{r=!0;const{left:d,top:o}=e.getBoundingClientRect(),i=n.clientX-d,a=n.clientY-o;v(i,a,i,a)}),e.addEventListener("mousemove",n=>{const{left:d,top:o}=e.getBoundingClientRect(),i=n.clientX-d,a=n.clientY-o;v(i-n.movementX,a-n.movementY,i,a)}),e.addEventListener("mouseup",()=>{r=!1}),f.addEventListener("click",g),x.addEventListener("click",()=>{c=y(E(e,15,15)),m()}),u.addEventListener("click",()=>{l=!l,u.textContent=l?"색 보기":"값 보기",m()}),g(),m()});
