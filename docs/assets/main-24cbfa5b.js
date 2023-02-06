import"./style-7b82c8da.js";class e{constructor(t,s,i){this.x=t,this.y=s,this.z=i}static randomUnitVector(){for(;;){const t=Math.random()*2-1,s=Math.random()*2-1,i=Math.random()*2-1;if(!(t*t+s*s+i*i>1))return new e(t,s,i).normalize()}}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}distance(t){return this.sub(t).length()}lengthSquared(){return this.x*this.x+this.y*this.y+this.z*this.z}distanceSquared(t){return this.sub(t).lengthSquared()}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}cross(t){const s=this.y*t.z-this.z*t.y,i=this.z*t.x-this.x*t.z,h=this.x*t.y-this.y*t.x;return new e(s,i,h)}normalize(){const t=this.length();return t===0?(console.warn("Length is 0, returning zero vector"),new e(0,0,0)):new e(this.x/t,this.y/t,this.z/t)}add(t){return new e(this.x+t.x,this.y+t.y,this.z+t.z)}sub(t){return new e(this.x-t.x,this.y-t.y,this.z-t.z)}mul(t){return new e(this.x*t.x,this.y*t.y,this.z*t.z)}div(t){return t.x===0||t.y===0||t.z,new e(this.x/t.x,this.y/t.y,this.z/t.z)}addScalar(t){return new e(this.x+t,this.y+t,this.z+t)}subScalar(t){return new e(this.x-t,this.y-t,this.z-t)}mulScalar(t){return new e(this.x*t,this.y*t,this.z*t)}divScalar(t){return t===0&&console.warn(`Dividing by zero, n: ${t}`),new e(this.x/t,this.y/t,this.z/t)}min(t){return new e(Math.min(this.x,t.x),Math.min(this.y,t.y),Math.min(this.z,t.z))}max(t){return new e(Math.max(this.x,t.x),Math.max(this.y,t.y),Math.max(this.z,t.z))}minAxis(){const t=Math.abs(this.x),s=Math.abs(this.y),i=Math.abs(this.z);return t<=s&&t<=i?new e(1,0,0):s<=t&&s<=i?new e(0,1,0):new e(0,0,1)}minComponent(){return Math.min(this.x,this.y,this.z)}segmentDistance(t,s){const i=t.distanceSquared(s);if(i===0)return this.distance(t);const h=this.sub(t).dot(s.sub(t))/i;return h<0?this.distance(t):h>1?this.distance(s):t.add(s.sub(t).mulScalar(h)).distance(this)}toString(){return`Vector(${this.x}, ${this.y}, ${this.z})`}}var m=(c=>(c[c.AxisNone=0]="AxisNone",c[c.AxisX=1]="AxisX",c[c.AxisY=2]="AxisY",c[c.AxisZ=3]="AxisZ",c))(m||{});class d{constructor(t,s){this.min=t,this.max=s}static boxForShapes(t){if(t.length===0)return new d(new e(0,0,0),new e(0,0,0));let s=t[0].boundingBox();for(let i=1;i<t.length;i++)s=s.extend(t[i].boundingBox());return s}static boxForVectors(t){if(t.length===0)return new d(new e(0,0,0),new e(0,0,0));let s=t[0],i=t[0];for(let h=1;h<t.length;h++)s=s.min(t[h]),i=i.max(t[h]);return new d(s,i)}anchor(t){return this.min.add(this.size().mul(t))}center(){return this.anchor(new e(.5,.5,.5))}size(){return this.max.sub(this.min)}contains(t){return this.min.x<=t.x&&this.max.x>=t.x&&this.min.y<=t.y&&this.max.y>=t.y&&this.min.z<=t.z&&this.max.z>=t.z}extend(t){return new d(this.min.min(t.min),this.max.max(t.max))}intersect(t){let s=(this.min.x-t.origin.x)/t.direction.x,i=(this.min.y-t.origin.y)/t.direction.y,h=(this.min.z-t.origin.z)/t.direction.z,x=(this.max.x-t.origin.x)/t.direction.x,n=(this.max.y-t.origin.y)/t.direction.y,r=(this.max.z-t.origin.z)/t.direction.z,o;s>x&&(o=s,s=x,x=o),i>n&&(o=i,i=n,n=o),h>r&&(o=h,h=r,r=o);const a=Math.max(s,i,h),u=Math.min(x,n,r);return{tmin:a,tmax:u}}partition(t,s){let i=!1,h=!1;switch(t){case m.AxisX:i=this.min.x<=s,h=this.max.x>=s;break;case m.AxisY:i=this.min.y<=s,h=this.max.y>=s;break;case m.AxisZ:i=this.min.z<=s,h=this.max.z>=s;break}return{left:i,right:h}}}const N=1e9;class F{constructor(t,s){this.shape=t,this.t=s}ok(){return this.t<N}min(t){return this.t<=t.t?this:t}max(t){return this.t>t.t?this:t}}const E=new F(null,N);function I(c){const t=c.length;if(t==0)return 0;if(t%2===1)return c[t/2-1];{const s=c[t/2-1],i=c[t/2];return(s+i)/2}}const B=(c,t)=>c-t;class A{constructor(t){this.axis=m.AxisNone,this.point=0,this.shapes=t,this.left=null,this.right=null}intersect(t,s,i){let h=0,x=!1;switch(this.axis){case m.AxisNone:return this.intersectShapes(t);case m.AxisX:h=(this.point-t.origin.x)/t.direction.x,x=t.origin.x<this.point||t.origin.x==this.point&&t.direction.x<=0;break;case m.AxisY:h=(this.point-t.origin.y)/t.direction.y,x=t.origin.y<this.point||t.origin.y==this.point&&t.direction.y<=0;break;case m.AxisZ:h=(this.point-t.origin.z)/t.direction.z,x=t.origin.z<this.point||t.origin.z==this.point&&t.direction.z<=0;break}let n=null,r=null;if(x?(n=this.left,r=this.right):(n=this.right,r=this.left),h>i||h<=0)return n.intersect(t,s,i);if(h<s)return r.intersect(t,s,i);{const o=n.intersect(t,s,h);if(o.t<=h)return o;const a=r.intersect(t,h,Math.min(i,o.t));return o.t<=a.t?o:a}}intersectShapes(t){let s=E;return this.shapes.forEach(i=>{const h=i.intersect(t);h.t<s.t&&(s=h)}),s}partitionScore(t,s){let i=0,h=0;return this.shapes.forEach(x=>{const n=x.boundingBox(),{left:r,right:o}=n.partition(t,s);r&&i++,o&&h++}),i>=h?i:h}partition(t,s,i){const h=[],x=[];return this.shapes.forEach(n=>{const r=n.boundingBox(),{left:o,right:a}=r.partition(s,i);o&&h.push(n),a&&x.push(n)}),{left:h,right:x}}split(t){if(this.shapes.length<8)return;let s=[],i=[],h=[];this.shapes.forEach(M=>{const y=M.boundingBox();s.push(y.min.x),s.push(y.max.x),i.push(y.min.y),i.push(y.max.y),h.push(y.min.z),h.push(y.max.z)}),s=s.sort(B),i=i.sort(B),h=h.sort(B);let x=I(s),n=I(i),r=I(h),o=Math.round(this.shapes.length*.85),a=m.AxisNone,u=0;const p=this.partitionScore(m.AxisX,x);p<o&&(o=p,a=m.AxisX,u=x);const z=this.partitionScore(m.AxisY,n);z<o&&(o=z,a=m.AxisY,u=n);const f=this.partitionScore(m.AxisZ,r);if(f<o&&(o=f,a=m.AxisZ,u=r),a==m.AxisNone)return;const{left:k,right:$}=this.partition(o,a,u);this.axis=a,this.point=u,this.left=new A(k),this.right=new A($),this.left.split(t+1),this.right.split(t+1),this.shapes=null}}class C{constructor(t){this.box=d.boxForShapes(t);const s=new A(t);s.split(0),this.root=s}intersect(t){const{tmin:s,tmax:i}=this.box.intersect(t);return i<s||i<=0?E:this.root.intersect(t,s,i)}}class Y{constructor(t,s){this.origin=t,this.direction=s}position(t){return this.origin.add(this.direction.mulScalar(t))}}const q={pathLengthThreshold:0,strokeWidth:1};class l{constructor(t=[],s=!1){this.keepIt=!1,this.points=t,this.keepIt=s}append(...t){this.points=[...this.points,...t]}boundingBox(){const t=this.points[0];let s=new d(t,t);for(let i=1;i<this.points.length;i++){const h=this.points[i];s=s.extend(new d(h,h))}return s}transform(t){const s=this.points.map(i=>t.mulPosition(i));return new l(s,this.keepIt)}chop(t){const s=new l([],this.keepIt);for(let i=0;i<this.points.length-1;i++){const h=this.points[i],x=this.points[i+1],n=x.sub(h),r=n.length();i==0&&s.append(h);let o=t;for(;o<r;)s.append(h.add(n.mulScalar(o/r))),o+=t;s.append(x)}return s}filter(t){const s=new S;let i=new l([],this.keepIt);return this.points.forEach(h=>{const{vector:x,ok:n}=t.filter(h);n?i.append(x):(i.points.length>1&&s.append(i),i=new l([],this.keepIt))}),i.points.length>1&&s.append(i),s}simplify(t){if(this.points.length<3)return new l([...this.points],this.keepIt);const s=this.points[0],i=this.points[this.points.length-1];let h=-1,x=0;for(let n=1;n<this.points.length-1;n++){const r=this.points[n].segmentDistance(s,i);r>x&&(h=n,x=r)}if(x>t){const n=new l(this.points.slice(0,h+1),this.keepIt).simplify(t),r=new l(this.points.slice(h),this.keepIt).simplify(t);return new l([...n.points.slice(0,n.points.length-1),...r.points],this.keepIt)}return new l([s,i],this.keepIt)}toString(){return this.points.map(t=>t.toString()).join(`
`)}toSVG(){return`<polyline points="${this.points.map(s=>`${s.x.toFixed(3)} ${s.y.toFixed(3)}`).join(" ")}" />`}}class S{constructor(t=[]){this.paths=t}append(...t){this.paths=[...this.paths,...t]}boundingBox(){let t=this.paths[0].boundingBox();for(let s=1;s<this.paths.length;s++){const i=this.paths[s];t=t.extend(i.boundingBox())}return t}transform(t){const s=this.paths.map(i=>i.transform(t));return new S(s)}chop(t){const s=this.paths.map(i=>i.chop(t));return new S(s)}filter(t){const s=[];return this.paths.forEach(i=>{s.push(...i.filter(t).paths)}),new S(s)}simplify(t){const s=this.paths.map(i=>i.simplify(t));return new S(s)}toString(){return this.paths.map(t=>`[
${t.toString()}
]`).join(`
`)}toSVG(t,s){let i=`<svg viewBox="0 0 ${t} ${s}" version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
`;return i+=`<g transform="translate(0, ${s}) scale(1, -1)" stroke="black" fill="none" stroke-width="${q.strokeWidth}" stroke-linecap="round">
`,i+=this.paths.map(h=>h.toSVG()).join(`
`),i+=`
</g>
`,i+="</svg>",i}}const g={identity:function(){return new w(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)},translate:function(c){return new w(1,0,0,c.x,0,1,0,c.y,0,0,1,c.z,0,0,0,1)},scale:function(c){return new w(c.x,0,0,0,0,c.y,0,0,0,0,c.z,0,0,0,0,1)},rotate:function(c,t){const s=c.normalize(),i=Math.sin(t),h=Math.cos(t),x=1-h;return new w(x*s.x*s.x+h,x*s.x*s.y+s.z*i,x*s.z*s.x-s.y*i,0,x*s.x*s.y-s.z*i,x*s.y*s.y+h,x*s.y*s.z+s.x*i,0,x*s.z*s.x+s.y*i,x*s.y*s.z-s.x*i,x*s.z*s.z+h,0,0,0,0,1)},frustum:function(c,t,s,i,h,x){const n=2*h,r=t-c,o=i-s,a=x-h;return new w(n/r,0,(t+c)/r,0,0,n/o,(i+s)/o,0,0,0,(-x-h)/a,-n*x/a,0,0,-1,0)},orthographic:function(c,t,s,i,h,x){return new w(2/(t-c),0,0,-(t+c)/(t-c),0,2/(i-s),0,-(i+s)/(i-s),0,0,-2/(x-h),-(x+h)/(x-h),0,0,0,1)},perspective:function(c,t,s,i){const h=s*Math.tan(c*Math.PI/360),x=h*t;return g.frustum(-x,x,-h,h,s,i)},lookAt:function(c,t,s){const i=s.normalize(),h=t.sub(c).normalize(),x=h.cross(i).normalize(),n=x.cross(h).normalize();return new w(x.x,n.x,-h.x,c.x,x.y,n.y,-h.y,c.y,x.z,n.z,-h.z,c.z,0,0,0,1).inverse()}};class w{constructor(t,s,i,h,x,n,r,o,a,u,p,z,f,k,$,M){this.x00=t,this.x01=s,this.x02=i,this.x03=h,this.x10=x,this.x11=n,this.x12=r,this.x13=o,this.x20=a,this.x21=u,this.x22=p,this.x23=z,this.x30=f,this.x31=k,this.x32=$,this.x33=M}translate(t){return g.translate(t).mul(this)}scale(t){return g.scale(t).mul(this)}rotate(t,s){return g.rotate(t,s).mul(this)}frustum(t,s,i,h,x,n){return g.frustum(t,s,i,h,x,n).mul(this)}orthographic(t,s,i,h,x,n){return g.orthographic(t,s,i,h,x,n).mul(this)}perspective(t,s,i,h){return g.perspective(t,s,i,h).mul(this)}mul(t){const s=this.x00*t.x00+this.x01*t.x10+this.x02*t.x20+this.x03*t.x30,i=this.x10*t.x00+this.x11*t.x10+this.x12*t.x20+this.x13*t.x30,h=this.x20*t.x00+this.x21*t.x10+this.x22*t.x20+this.x23*t.x30,x=this.x30*t.x00+this.x31*t.x10+this.x32*t.x20+this.x33*t.x30,n=this.x00*t.x01+this.x01*t.x11+this.x02*t.x21+this.x03*t.x31,r=this.x10*t.x01+this.x11*t.x11+this.x12*t.x21+this.x13*t.x31,o=this.x20*t.x01+this.x21*t.x11+this.x22*t.x21+this.x23*t.x31,a=this.x30*t.x01+this.x31*t.x11+this.x32*t.x21+this.x33*t.x31,u=this.x00*t.x02+this.x01*t.x12+this.x02*t.x22+this.x03*t.x32,p=this.x10*t.x02+this.x11*t.x12+this.x12*t.x22+this.x13*t.x32,z=this.x20*t.x02+this.x21*t.x12+this.x22*t.x22+this.x23*t.x32,f=this.x30*t.x02+this.x31*t.x12+this.x32*t.x22+this.x33*t.x32,k=this.x00*t.x03+this.x01*t.x13+this.x02*t.x23+this.x03*t.x33,$=this.x10*t.x03+this.x11*t.x13+this.x12*t.x23+this.x13*t.x33,M=this.x20*t.x03+this.x21*t.x13+this.x22*t.x23+this.x23*t.x33,y=this.x30*t.x03+this.x31*t.x13+this.x32*t.x23+this.x33*t.x33;return new w(s,n,u,k,i,r,p,$,h,o,z,M,x,a,f,y)}mulPosition(t){const s=this.x00*t.x+this.x01*t.y+this.x02*t.z+this.x03,i=this.x10*t.x+this.x11*t.y+this.x12*t.z+this.x13,h=this.x20*t.x+this.x21*t.y+this.x22*t.z+this.x23;return new e(s,i,h)}mulPositionW(t){const s=this.x00*t.x+this.x01*t.y+this.x02*t.z+this.x03,i=this.x10*t.x+this.x11*t.y+this.x12*t.z+this.x13,h=this.x20*t.x+this.x21*t.y+this.x22*t.z+this.x23,x=this.x30*t.x+this.x31*t.y+this.x32*t.z+this.x33;return new e(s/x,i/x,h/x)}mulDirection(t){const s=this.x00*t.x+this.x01*t.y+this.x02*t.z,i=this.x10*t.x+this.x11*t.y+this.x12*t.z,h=this.x20*t.x+this.x21*t.y+this.x22*t.z;return new e(s,i,h).normalize()}mulRay(t){return new Y(this.mulPosition(t.origin),this.mulDirection(t.direction))}mulBox(t){const s=new e(this.x00,this.x10,this.x20),i=new e(this.x01,this.x11,this.x21),h=new e(this.x02,this.x12,this.x22),x=new e(this.x03,this.x13,this.x23);let n=s.mulScalar(t.min.x),r=s.mulScalar(t.max.x),o=i.mulScalar(t.min.y),a=i.mulScalar(t.max.y),u=h.mulScalar(t.min.z),p=h.mulScalar(t.max.z);n=n.min(r),r=n.max(r),o=o.min(a),a=o.max(a),u=u.min(p),p=u.max(p);const z=n.add(o).add(u).add(x),f=r.add(a).add(p).add(x);return new d(z,f)}transpose(){return new w(this.x00,this.x10,this.x20,this.x30,this.x01,this.x11,this.x21,this.x31,this.x02,this.x12,this.x22,this.x32,this.x03,this.x13,this.x23,this.x33)}determinant(){return this.x00*this.x11*this.x22*this.x33-this.x00*this.x11*this.x23*this.x32+this.x00*this.x12*this.x23*this.x31-this.x00*this.x12*this.x21*this.x33+this.x00*this.x13*this.x21*this.x32-this.x00*this.x13*this.x22*this.x31-this.x01*this.x12*this.x23*this.x30+this.x01*this.x12*this.x20*this.x33-this.x01*this.x13*this.x20*this.x32+this.x01*this.x13*this.x22*this.x30-this.x01*this.x10*this.x22*this.x33+this.x01*this.x10*this.x23*this.x32+this.x02*this.x13*this.x20*this.x31-this.x02*this.x13*this.x21*this.x30+this.x02*this.x10*this.x21*this.x33-this.x02*this.x10*this.x23*this.x31+this.x02*this.x11*this.x23*this.x30-this.x02*this.x11*this.x20*this.x33-this.x03*this.x10*this.x21*this.x32+this.x03*this.x10*this.x22*this.x31-this.x03*this.x11*this.x22*this.x30+this.x03*this.x11*this.x20*this.x32-this.x03*this.x12*this.x20*this.x31+this.x03*this.x12*this.x21*this.x30}inverse(){const t=this.determinant();t===0&&console.warn("dividing by zero, determinant is zero");const s=(this.x12*this.x23*this.x31-this.x13*this.x22*this.x31+this.x13*this.x21*this.x32-this.x11*this.x23*this.x32-this.x12*this.x21*this.x33+this.x11*this.x22*this.x33)/t,i=(this.x03*this.x22*this.x31-this.x02*this.x23*this.x31-this.x03*this.x21*this.x32+this.x01*this.x23*this.x32+this.x02*this.x21*this.x33-this.x01*this.x22*this.x33)/t,h=(this.x02*this.x13*this.x31-this.x03*this.x12*this.x31+this.x03*this.x11*this.x32-this.x01*this.x13*this.x32-this.x02*this.x11*this.x33+this.x01*this.x12*this.x33)/t,x=(this.x03*this.x12*this.x21-this.x02*this.x13*this.x21-this.x03*this.x11*this.x22+this.x01*this.x13*this.x22+this.x02*this.x11*this.x23-this.x01*this.x12*this.x23)/t,n=(this.x13*this.x22*this.x30-this.x12*this.x23*this.x30-this.x13*this.x20*this.x32+this.x10*this.x23*this.x32+this.x12*this.x20*this.x33-this.x10*this.x22*this.x33)/t,r=(this.x02*this.x23*this.x30-this.x03*this.x22*this.x30+this.x03*this.x20*this.x32-this.x00*this.x23*this.x32-this.x02*this.x20*this.x33+this.x00*this.x22*this.x33)/t,o=(this.x03*this.x12*this.x30-this.x02*this.x13*this.x30-this.x03*this.x10*this.x32+this.x00*this.x13*this.x32+this.x02*this.x10*this.x33-this.x00*this.x12*this.x33)/t,a=(this.x02*this.x13*this.x20-this.x03*this.x12*this.x20+this.x03*this.x10*this.x22-this.x00*this.x13*this.x22-this.x02*this.x10*this.x23+this.x00*this.x12*this.x23)/t,u=(this.x11*this.x23*this.x30-this.x13*this.x21*this.x30+this.x13*this.x20*this.x31-this.x10*this.x23*this.x31-this.x11*this.x20*this.x33+this.x10*this.x21*this.x33)/t,p=(this.x03*this.x21*this.x30-this.x01*this.x23*this.x30-this.x03*this.x20*this.x31+this.x00*this.x23*this.x31+this.x01*this.x20*this.x33-this.x00*this.x21*this.x33)/t,z=(this.x01*this.x13*this.x30-this.x03*this.x11*this.x30+this.x03*this.x10*this.x31-this.x00*this.x13*this.x31-this.x01*this.x10*this.x33+this.x00*this.x11*this.x33)/t,f=(this.x03*this.x11*this.x20-this.x01*this.x13*this.x20-this.x03*this.x10*this.x21+this.x00*this.x13*this.x21+this.x01*this.x10*this.x23-this.x00*this.x11*this.x23)/t,k=(this.x12*this.x21*this.x30-this.x11*this.x22*this.x30-this.x12*this.x20*this.x31+this.x10*this.x22*this.x31+this.x11*this.x20*this.x32-this.x10*this.x21*this.x32)/t,$=(this.x01*this.x22*this.x30-this.x02*this.x21*this.x30+this.x02*this.x20*this.x31-this.x00*this.x22*this.x31-this.x01*this.x20*this.x32+this.x00*this.x21*this.x32)/t,M=(this.x02*this.x11*this.x30-this.x01*this.x12*this.x30-this.x02*this.x10*this.x31+this.x00*this.x12*this.x31+this.x01*this.x10*this.x32-this.x00*this.x11*this.x32)/t,y=(this.x01*this.x12*this.x20-this.x02*this.x11*this.x20+this.x02*this.x10*this.x21-this.x00*this.x12*this.x21-this.x01*this.x10*this.x22+this.x00*this.x11*this.x22)/t;return new w(s,i,h,x,n,r,o,a,u,p,z,f,k,$,M,y)}toString(){return`
${this.x00}	${this.x01}	${this.x02}	${this.x03}
${this.x10}	${this.x11}	${this.x12}	${this.x13}
${this.x20}	${this.x21}	${this.x22}	${this.x23}
${this.x30}	${this.x31}	${this.x32}	${this.x33}
`}}const D=new d(new e(-1,-1,-1),new e(1,1,1));class W{constructor(t,s,i){this.matrix=t,this.eye=s,this.scene=i}filter(t){const s=this.matrix.mulPositionW(t);return this.scene.visible(this.eye,t)?D.contains(s)?{vector:s,ok:!0}:{vector:s,ok:!1}:{vector:s,ok:!1}}}class X{constructor(){this.shapes=[],this.tree=null}compile(){this.shapes.forEach(t=>{t.compile()}),this.tree||(this.tree=new C(this.shapes))}add(t){this.shapes=[...this.shapes,t]}intersect(t){return this.tree.intersect(t)}visible(t,s){const i=t.sub(s),h=new Y(s,i.normalize());return this.intersect(h).t>=i.length()}paths(){const t=[];return this.shapes.forEach(s=>{t.push(...s.paths().paths)}),new S(t)}render(t,s,i,h,x,n,r,o,a){const u=h/x;let p=g.lookAt(t,s,i);return p=p.perspective(n,u,r,o),this.renderWithMatrix(p,t,h,x,a)}renderWithMatrix(t,s,i,h,x){this.compile();let n=this.paths();return x>0&&(n=n.chop(x)),n=n.filter(new W(t,s,this)),x>0&&(n=n.simplify(1e-6)),t=g.translate(new e(1,1,0)).scale(new e(i/2,h/2,0)),n=n.transform(t),n}}class Z{constructor(t,s,i=0){this.min=t,this.max=s,this.box=new d(t,s),this.cubeType=i}compile(){}boundingBox(){return this.box}contains(t,s){return!(t.x<this.min.x-s||t.x>this.max.x+s||t.y<this.min.y-s||t.y>this.max.y+s||t.z<this.min.z-s||t.z>this.max.z+s)}intersect(t){let s=this.min.sub(t.origin).div(t.direction),i=this.max.sub(t.origin).div(t.direction);const h=s.min(i),x=s.max(i),n=Math.max(h.x,h.y,h.z),r=Math.min(x.x,x.y,x.z);return n<.001&&r>.001?new F(this,r):n>=.001&&n<r?new F(this,n):E}paths(){if(this.cubeType===1)return this.pathsStripedOuterSides();const t=this.min.x,s=this.min.y,i=this.min.z,h=this.max.x,x=this.max.y,n=this.max.z;return new S([new l([new e(t,s,i),new e(t,s,n)]),new l([new e(t,s,i),new e(t,x,i)]),new l([new e(t,s,i),new e(h,s,i)]),new l([new e(t,s,n),new e(t,x,n)]),new l([new e(t,s,n),new e(h,s,n)]),new l([new e(t,x,i),new e(t,x,n)]),new l([new e(t,x,i),new e(h,x,i)]),new l([new e(t,x,n),new e(h,x,n)]),new l([new e(h,s,i),new e(h,s,n)]),new l([new e(h,s,i),new e(h,x,i)]),new l([new e(h,s,n),new e(h,x,n)]),new l([new e(h,x,i),new e(h,x,n)])])}pathsStripedOuterSides(){const t=this.min.x,s=this.min.y,i=this.min.z,h=this.max.x,x=this.max.y,n=this.max.z,r=new S;for(let o=0;o<=10;o++){const a=o/10,u=t+(h-t)*a,p=s+(x-s)*a;r.append(new l([new e(u,s,i),new e(u,s,n)])),r.append(new l([new e(u,x,i),new e(u,x,n)])),r.append(new l([new e(t,p,i),new e(t,p,n)])),r.append(new l([new e(h,p,i),new e(h,p,n)]))}return r}}q.checkForDuplicatesLines=!0;function T(){const c=new X,t=new Z(new e(-1,-1,-1),new e(1,1,1));c.add(t);const s=new e(4,3,2),i=new e(0,0,0),h=new e(0,0,1),x=1024,n=1024,r=50,o=.1,a=10,u=.01;return c.render(s,i,h,x,n,r,o,a,u).toSVG(1e3,1e3)}const j=T();document.querySelector(".image").innerHTML=j;