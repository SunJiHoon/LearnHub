function l(a){return a.split(/\s/g).filter(t=>t)}function m(...a){const t=new Set;for(const e of a)for(const o of e)t.add(o);return t}function d(a){const t=new Map;let e=0;for(const o of a)t.set(o,e++);return t}function f(a,t){const e=[...a],o=d(e),r=e.map(()=>0);for(const n of t)r[o.get(n)]++;return{columns:e,frequency:r}}function p(a,t){const e=[...a],o=e.map(()=>0),r=e.findIndex(n=>n===t);return r!=-1&&o[r]++,{columns:e,frequency:o}}function h(a){const{columns:t,frequency:e}=a,o=e.reduce((n,c)=>n+c,0),r=Number.isNaN(o)?1:o;return{columns:t,frequency:e.map(n=>n/r)}}function y(a,t){const e=a.frequency,o=t.frequency;return e.map((r,n)=>r*o[n]).reduce((r,n)=>r+n,0)/Math.hypot(...e)/Math.hypot(...o)}function E(a,t){let e=a.firstElementChild,o=0;const r=new DocumentFragment;for(const n of t){if(e===null){const c=document.createElement("div"),u=document.createElement("div"),s=5*Math.random()+3,i=5*Math.random()+3;c.className="token-outer",c.style.animation=`${s}s ease-in-out ${-Math.random()*s}s infinite alternate none running float-y`,u.className="token-inner",u.style.animation=`${i}s ease-in-out ${-Math.random()*i}s infinite alternate none running float-theta`,c.append(u),r.append(c),e=c}e.firstElementChild.textContent=n,o++,e=e.nextElementSibling}for(let n=a.childElementCount;n>o;n--)a.lastElementChild.remove();a.append(r)}function q(a,t){const e=document.createElement("tr"),o=document.createElement("tr");for(const r of t.columns){const n=document.createElement("th");n.textContent=r,e.append(n)}for(const r of t.frequency){const n=document.createElement("td");n.textContent=r.toFixed(2),o.append(n)}a.replaceChildren(e,o)}function C(a,t){const e=document.createElement("tr"),o=document.createElement("tr");for(const r of t.columns){const n=document.createElement("th");n.textContent=r,e.append(n)}for(const r of t.frequency){const n=document.createElement("td");n.textContent=r?"🔥":"",o.append(n)}a.replaceChildren(e,o)}export{m as a,f as b,q as c,p as d,C as e,y as f,l as t,E as u,h as v};