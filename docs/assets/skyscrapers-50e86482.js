import"./style-7b82c8da.js";const n=new Worker(new URL(""+new URL("skyscrapers.worker-69335bf6.js",import.meta.url).href,self.location),{type:"module"});let e,t;const o=document.querySelector(".image"),s=document.querySelector(".notice"),a=document.querySelector(".rendering-time"),c=()=>{e=new Date().getTime(),t=setInterval(()=>{a.innerHTML=`${((new Date().getTime()-e)/1e3).toFixed(2)}s`},100),n.postMessage("render")};n.addEventListener("message",function(r){clearInterval(t),o.innerHTML=r.data;const i=new Date().getTime();s.innerHTML=`Rendering finished in ${((i-e)/1e3).toFixed(2)}s`},!1);c();