function l(o){return o.split(/\s/g).filter(n=>n)}function m(...o){const n=new Set;for(const t of o)for(const a of t)n.add(a);return n}function d(o){const n=new Map;let t=0;for(const a of o)n.set(a,t++);return n}function f(o,n){const t=[...o],a=d(t),r=t.map(()=>0);for(const e of n)r[a.get(e)]++;return{columns:t,frequency:r}}function p(o,n){const t=[...o],a=t.map(()=>0),r=t.findIndex(e=>e===n);return r!=-1&&a[r]++,{columns:t,frequency:a}}function h(o,n){const t=o.frequency,a=n.frequency;return t.map((r,e)=>r*a[e]).reduce((r,e)=>r+e,0)/Math.hypot(...t)/Math.hypot(...a)}function y(o,n){let t=o.firstElementChild,a=0;const r=new DocumentFragment;for(const e of n){if(t===null){const c=document.createElement("div"),u=document.createElement("div"),s=5*Math.random()+3,i=5*Math.random()+3;c.className="token-outer",c.style.animation=`${s}s ease-in-out ${-Math.random()*s}s infinite alternate none running float-y`,u.className="token-inner",u.style.animation=`${i}s ease-in-out ${-Math.random()*i}s infinite alternate none running float-theta`,c.append(u),r.append(c),t=c}t.firstElementChild.textContent=e,a++,t=t.nextElementSibling}for(let e=o.childElementCount;e>a;e--)o.lastElementChild.remove();o.append(r)}function E(o,n){const t=document.createElement("tr"),a=document.createElement("tr");for(const r of n.columns){const e=document.createElement("th");e.textContent=r,t.append(e)}for(const r of n.frequency){const e=document.createElement("td");e.textContent=r,a.append(e)}o.replaceChildren(t,a)}function C(o,n){const t=document.createElement("tr"),a=document.createElement("tr");for(const r of n.columns){const e=document.createElement("th");e.textContent=r,t.append(e)}for(const r of n.frequency){const e=document.createElement("td");e.textContent=r?"🔥":"",a.append(e)}o.replaceChildren(t,a)}export{m as a,p as b,f as c,h as d,y as e,E as f,l as t,C as u};
