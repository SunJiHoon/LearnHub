const L=[[[85,85,85],[0,255,0],[0,0,0],[0,0,0]],[[85,85,85],[255,0,0],[0,0,0],[255,0,0]],[[85,85,85],[255,0,0],[255,0,0],[255,0,0]],[[85,85,85],[255,0,0],[255,0,0],[255,0,0]]];document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("angle"),x=document.getElementById("angle-feedback"),f=document.getElementById("grid"),s=[...Array(16)].map((n,e)=>{const t=document.createElement("div"),a=e%4,d=Math.floor(e/4),o=L[d][a];return e==15&&t.classList.add("highlighted"),t.style.color=o[0]+o[1]+o[2]>=255*3/2?"black":"white",t.style.backgroundColor=`rgba(${o[0]} ${o[1]} ${o[2]})`,t.textContent=`(${a}, ${d})`,t}),y=document.getElementById("formula-lhs-11"),I=document.getElementById("formula-lhs-12"),M=document.getElementById("formula-lhs-21"),C=document.getElementById("formula-lhs-22"),E=document.getElementById("formula-rhs-1"),B=document.getElementById("formula-rhs-2");f.replaceChildren(...s);function m(n){const e=n/180*Math.PI,t=Math.cos(e),a=Math.sin(e);x.textContent=n;const d=4,o=4;for(let l=0;l<s.length;l++){const h=s[l],i=l%4,g=Math.floor(l/4),p=Math.round(t*i-a*g),F=Math.round(a*i+t*g);h.style.gridColumnStart=p+d+1,h.style.gridRowStart=F+o+1}}function u(n){const e=Math.cos(n),t=Math.sin(n);y.textContent=e.toFixed(2),I.textContent=(-t).toFixed(2),M.textContent=t.toFixed(2),C.textContent=e.toFixed(2),E.textContent=(3*e-3*t).toFixed(2),B.textContent=(3*t+3*e).toFixed(2)}r.addEventListener("input",()=>{const n=r.valueAsNumber;m(n),u(n/180*Math.PI)});const c=r.valueAsNumber;m(c),u(c/180*Math.PI)});
