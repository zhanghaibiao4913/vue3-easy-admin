import{a2 as O,d as Oe,r as H,l as Ae,a as te,H as Ne,a3 as Te,a4 as Be,I as $e,a5 as Fe,a6 as Pe,o as Ue,i as De,x as y,w as E,j as je,y as Le,u as ke,a7 as qe,D as Ie}from"./vendor.96fdf2c1.js";import{u as X,_ as He}from"./index.297e58e3.js";var G={exports:{}},pe=function(e,t){return function(){for(var n=new Array(arguments.length),a=0;a<n.length;a++)n[a]=arguments[a];return e.apply(t,n)}},Me=pe,S=Object.prototype.toString;function Y(r){return S.call(r)==="[object Array]"}function K(r){return typeof r=="undefined"}function Ve(r){return r!==null&&!K(r)&&r.constructor!==null&&!K(r.constructor)&&typeof r.constructor.isBuffer=="function"&&r.constructor.isBuffer(r)}function Je(r){return S.call(r)==="[object ArrayBuffer]"}function ze(r){return typeof FormData!="undefined"&&r instanceof FormData}function Ke(r){var e;return typeof ArrayBuffer!="undefined"&&ArrayBuffer.isView?e=ArrayBuffer.isView(r):e=r&&r.buffer&&r.buffer instanceof ArrayBuffer,e}function We(r){return typeof r=="string"}function Xe(r){return typeof r=="number"}function he(r){return r!==null&&typeof r=="object"}function P(r){if(S.call(r)!=="[object Object]")return!1;var e=Object.getPrototypeOf(r);return e===null||e===Object.prototype}function Ge(r){return S.call(r)==="[object Date]"}function Ye(r){return S.call(r)==="[object File]"}function Qe(r){return S.call(r)==="[object Blob]"}function me(r){return S.call(r)==="[object Function]"}function Ze(r){return he(r)&&me(r.pipe)}function er(r){return typeof URLSearchParams!="undefined"&&r instanceof URLSearchParams}function rr(r){return r.trim?r.trim():r.replace(/^\s+|\s+$/g,"")}function tr(){return typeof navigator!="undefined"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window!="undefined"&&typeof document!="undefined"}function Q(r,e){if(!(r===null||typeof r=="undefined"))if(typeof r!="object"&&(r=[r]),Y(r))for(var t=0,s=r.length;t<s;t++)e.call(null,r[t],t,r);else for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.call(null,r[n],n,r)}function W(){var r={};function e(n,a){P(r[a])&&P(n)?r[a]=W(r[a],n):P(n)?r[a]=W({},n):Y(n)?r[a]=n.slice():r[a]=n}for(var t=0,s=arguments.length;t<s;t++)Q(arguments[t],e);return r}function nr(r,e,t){return Q(e,function(n,a){t&&typeof n=="function"?r[a]=Me(n,t):r[a]=n}),r}function sr(r){return r.charCodeAt(0)===65279&&(r=r.slice(1)),r}var v={isArray:Y,isArrayBuffer:Je,isBuffer:Ve,isFormData:ze,isArrayBufferView:Ke,isString:We,isNumber:Xe,isObject:he,isPlainObject:P,isUndefined:K,isDate:Ge,isFile:Ye,isBlob:Qe,isFunction:me,isStream:Ze,isURLSearchParams:er,isStandardBrowserEnv:tr,forEach:Q,merge:W,extend:nr,trim:rr,stripBOM:sr},x=v;function ne(r){return encodeURIComponent(r).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var ve=function(e,t,s){if(!t)return e;var n;if(s)n=s(t);else if(x.isURLSearchParams(t))n=t.toString();else{var a=[];x.forEach(t,function(l,p){l===null||typeof l=="undefined"||(x.isArray(l)?p=p+"[]":l=[l],x.forEach(l,function(c){x.isDate(c)?c=c.toISOString():x.isObject(c)&&(c=JSON.stringify(c)),a.push(ne(p)+"="+ne(c))}))}),n=a.join("&")}if(n){var i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+n}return e},ar=v;function D(){this.handlers=[]}D.prototype.use=function(e,t,s){return this.handlers.push({fulfilled:e,rejected:t,synchronous:s?s.synchronous:!1,runWhen:s?s.runWhen:null}),this.handlers.length-1};D.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)};D.prototype.forEach=function(e){ar.forEach(this.handlers,function(s){s!==null&&e(s)})};var or=D,ir=v,ur=function(e,t){ir.forEach(e,function(n,a){a!==t&&a.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[a])})},ye=function(e,t,s,n,a){return e.config=t,s&&(e.code=s),e.request=n,e.response=a,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},e},lr=ye,Ee=function(e,t,s,n,a){var i=new Error(e);return lr(i,t,s,n,a)},cr=Ee,fr=function(e,t,s){var n=s.config.validateStatus;!s.status||!n||n(s.status)?e(s):t(cr("Request failed with status code "+s.status,s.config,null,s.request,s))},$=v,dr=$.isStandardBrowserEnv()?function(){return{write:function(t,s,n,a,i,u){var l=[];l.push(t+"="+encodeURIComponent(s)),$.isNumber(n)&&l.push("expires="+new Date(n).toGMTString()),$.isString(a)&&l.push("path="+a),$.isString(i)&&l.push("domain="+i),u===!0&&l.push("secure"),document.cookie=l.join("; ")},read:function(t){var s=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return s?decodeURIComponent(s[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),pr=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)},hr=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e},mr=pr,vr=hr,yr=function(e,t){return e&&!mr(t)?vr(e,t):t},M=v,Er=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],br=function(e){var t={},s,n,a;return e&&M.forEach(e.split(`
`),function(u){if(a=u.indexOf(":"),s=M.trim(u.substr(0,a)).toLowerCase(),n=M.trim(u.substr(a+1)),s){if(t[s]&&Er.indexOf(s)>=0)return;s==="set-cookie"?t[s]=(t[s]?t[s]:[]).concat([n]):t[s]=t[s]?t[s]+", "+n:n}}),t},se=v,wr=se.isStandardBrowserEnv()?function(){var e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a"),s;function n(a){var i=a;return e&&(t.setAttribute("href",i),i=t.href),t.setAttribute("href",i),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:t.pathname.charAt(0)==="/"?t.pathname:"/"+t.pathname}}return s=n(window.location.href),function(i){var u=se.isString(i)?n(i):i;return u.protocol===s.protocol&&u.host===s.host}}():function(){return function(){return!0}}();function Z(r){this.message=r}Z.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")};Z.prototype.__CANCEL__=!0;var j=Z,F=v,_r=fr,Cr=dr,Sr=ve,gr=yr,xr=br,Rr=wr,V=Ee,Or=k,Ar=j,ae=function(e){return new Promise(function(s,n){var a=e.data,i=e.headers,u=e.responseType,l;function p(){e.cancelToken&&e.cancelToken.unsubscribe(l),e.signal&&e.signal.removeEventListener("abort",l)}F.isFormData(a)&&delete i["Content-Type"];var o=new XMLHttpRequest;if(e.auth){var c=e.auth.username||"",d=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";i.Authorization="Basic "+btoa(c+":"+d)}var _=gr(e.baseURL,e.url);o.open(e.method.toUpperCase(),Sr(_,e.params,e.paramsSerializer),!0),o.timeout=e.timeout;function g(){if(!!o){var h="getAllResponseHeaders"in o?xr(o.getAllResponseHeaders()):null,C=!u||u==="text"||u==="json"?o.responseText:o.response,w={data:C,status:o.status,statusText:o.statusText,headers:h,config:e,request:o};_r(function(I){s(I),p()},function(I){n(I),p()},w),o=null}}if("onloadend"in o?o.onloadend=g:o.onreadystatechange=function(){!o||o.readyState!==4||o.status===0&&!(o.responseURL&&o.responseURL.indexOf("file:")===0)||setTimeout(g)},o.onabort=function(){!o||(n(V("Request aborted",e,"ECONNABORTED",o)),o=null)},o.onerror=function(){n(V("Network Error",e,null,o)),o=null},o.ontimeout=function(){var C=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",w=e.transitional||Or.transitional;e.timeoutErrorMessage&&(C=e.timeoutErrorMessage),n(V(C,e,w.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",o)),o=null},F.isStandardBrowserEnv()){var B=(e.withCredentials||Rr(_))&&e.xsrfCookieName?Cr.read(e.xsrfCookieName):void 0;B&&(i[e.xsrfHeaderName]=B)}"setRequestHeader"in o&&F.forEach(i,function(C,w){typeof a=="undefined"&&w.toLowerCase()==="content-type"?delete i[w]:o.setRequestHeader(w,C)}),F.isUndefined(e.withCredentials)||(o.withCredentials=!!e.withCredentials),u&&u!=="json"&&(o.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&o.addEventListener("progress",e.onDownloadProgress),typeof e.onUploadProgress=="function"&&o.upload&&o.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(l=function(h){!o||(n(!h||h&&h.type?new Ar("canceled"):h),o.abort(),o=null)},e.cancelToken&&e.cancelToken.subscribe(l),e.signal&&(e.signal.aborted?l():e.signal.addEventListener("abort",l))),a||(a=null),o.send(a)})},f=v,oe=ur,Nr=ye,Tr={"Content-Type":"application/x-www-form-urlencoded"};function ie(r,e){!f.isUndefined(r)&&f.isUndefined(r["Content-Type"])&&(r["Content-Type"]=e)}function Br(){var r;return(typeof XMLHttpRequest!="undefined"||typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]")&&(r=ae),r}function $r(r,e,t){if(f.isString(r))try{return(e||JSON.parse)(r),f.trim(r)}catch(s){if(s.name!=="SyntaxError")throw s}return(t||JSON.stringify)(r)}var L={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:Br(),transformRequest:[function(e,t){return oe(t,"Accept"),oe(t,"Content-Type"),f.isFormData(e)||f.isArrayBuffer(e)||f.isBuffer(e)||f.isStream(e)||f.isFile(e)||f.isBlob(e)?e:f.isArrayBufferView(e)?e.buffer:f.isURLSearchParams(e)?(ie(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):f.isObject(e)||t&&t["Content-Type"]==="application/json"?(ie(t,"application/json"),$r(e)):e}],transformResponse:[function(e){var t=this.transitional||L.transitional,s=t&&t.silentJSONParsing,n=t&&t.forcedJSONParsing,a=!s&&this.responseType==="json";if(a||n&&f.isString(e)&&e.length)try{return JSON.parse(e)}catch(i){if(a)throw i.name==="SyntaxError"?Nr(i,this,"E_JSON_PARSE"):i}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};f.forEach(["delete","get","head"],function(e){L.headers[e]={}});f.forEach(["post","put","patch"],function(e){L.headers[e]=f.merge(Tr)});var k=L,Fr=v,Pr=k,Ur=function(e,t,s){var n=this||Pr;return Fr.forEach(s,function(i){e=i.call(n,e,t)}),e},be=function(e){return!!(e&&e.__CANCEL__)},ue=v,J=Ur,Dr=be,jr=k,Lr=j;function z(r){if(r.cancelToken&&r.cancelToken.throwIfRequested(),r.signal&&r.signal.aborted)throw new Lr("canceled")}var kr=function(e){z(e),e.headers=e.headers||{},e.data=J.call(e,e.data,e.headers,e.transformRequest),e.headers=ue.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),ue.forEach(["delete","get","head","post","put","patch","common"],function(n){delete e.headers[n]});var t=e.adapter||jr.adapter;return t(e).then(function(n){return z(e),n.data=J.call(e,n.data,n.headers,e.transformResponse),n},function(n){return Dr(n)||(z(e),n&&n.response&&(n.response.data=J.call(e,n.response.data,n.response.headers,e.transformResponse))),Promise.reject(n)})},m=v,we=function(e,t){t=t||{};var s={};function n(o,c){return m.isPlainObject(o)&&m.isPlainObject(c)?m.merge(o,c):m.isPlainObject(c)?m.merge({},c):m.isArray(c)?c.slice():c}function a(o){if(m.isUndefined(t[o])){if(!m.isUndefined(e[o]))return n(void 0,e[o])}else return n(e[o],t[o])}function i(o){if(!m.isUndefined(t[o]))return n(void 0,t[o])}function u(o){if(m.isUndefined(t[o])){if(!m.isUndefined(e[o]))return n(void 0,e[o])}else return n(void 0,t[o])}function l(o){if(o in t)return n(e[o],t[o]);if(o in e)return n(void 0,e[o])}var p={url:i,method:i,data:i,baseURL:u,transformRequest:u,transformResponse:u,paramsSerializer:u,timeout:u,timeoutMessage:u,withCredentials:u,adapter:u,responseType:u,xsrfCookieName:u,xsrfHeaderName:u,onUploadProgress:u,onDownloadProgress:u,decompress:u,maxContentLength:u,maxBodyLength:u,transport:u,httpAgent:u,httpsAgent:u,cancelToken:u,socketPath:u,responseEncoding:u,validateStatus:l};return m.forEach(Object.keys(e).concat(Object.keys(t)),function(c){var d=p[c]||a,_=d(c);m.isUndefined(_)&&d!==l||(s[c]=_)}),s},_e={version:"0.24.0"},qr=_e.version,ee={};["object","boolean","number","function","string","symbol"].forEach(function(r,e){ee[r]=function(s){return typeof s===r||"a"+(e<1?"n ":" ")+r}});var le={};ee.transitional=function(e,t,s){function n(a,i){return"[Axios v"+qr+"] Transitional option '"+a+"'"+i+(s?". "+s:"")}return function(a,i,u){if(e===!1)throw new Error(n(i," has been removed"+(t?" in "+t:"")));return t&&!le[i]&&(le[i]=!0,console.warn(n(i," has been deprecated since v"+t+" and will be removed in the near future"))),e?e(a,i,u):!0}};function Ir(r,e,t){if(typeof r!="object")throw new TypeError("options must be an object");for(var s=Object.keys(r),n=s.length;n-- >0;){var a=s[n],i=e[a];if(i){var u=r[a],l=u===void 0||i(u,a,r);if(l!==!0)throw new TypeError("option "+a+" must be "+l);continue}if(t!==!0)throw Error("Unknown option "+a)}}var Hr={assertOptions:Ir,validators:ee},Ce=v,Mr=ve,ce=or,fe=kr,q=we,Se=Hr,R=Se.validators;function T(r){this.defaults=r,this.interceptors={request:new ce,response:new ce}}T.prototype.request=function(e){typeof e=="string"?(e=arguments[1]||{},e.url=arguments[0]):e=e||{},e=q(this.defaults,e),e.method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;t!==void 0&&Se.assertOptions(t,{silentJSONParsing:R.transitional(R.boolean),forcedJSONParsing:R.transitional(R.boolean),clarifyTimeoutError:R.transitional(R.boolean)},!1);var s=[],n=!0;this.interceptors.request.forEach(function(d){typeof d.runWhen=="function"&&d.runWhen(e)===!1||(n=n&&d.synchronous,s.unshift(d.fulfilled,d.rejected))});var a=[];this.interceptors.response.forEach(function(d){a.push(d.fulfilled,d.rejected)});var i;if(!n){var u=[fe,void 0];for(Array.prototype.unshift.apply(u,s),u=u.concat(a),i=Promise.resolve(e);u.length;)i=i.then(u.shift(),u.shift());return i}for(var l=e;s.length;){var p=s.shift(),o=s.shift();try{l=p(l)}catch(c){o(c);break}}try{i=fe(l)}catch(c){return Promise.reject(c)}for(;a.length;)i=i.then(a.shift(),a.shift());return i};T.prototype.getUri=function(e){return e=q(this.defaults,e),Mr(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")};Ce.forEach(["delete","get","head","options"],function(e){T.prototype[e]=function(t,s){return this.request(q(s||{},{method:e,url:t,data:(s||{}).data}))}});Ce.forEach(["post","put","patch"],function(e){T.prototype[e]=function(t,s,n){return this.request(q(n||{},{method:e,url:t,data:s}))}});var Vr=T,Jr=j;function A(r){if(typeof r!="function")throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(n){e=n});var t=this;this.promise.then(function(s){if(!!t._listeners){var n,a=t._listeners.length;for(n=0;n<a;n++)t._listeners[n](s);t._listeners=null}}),this.promise.then=function(s){var n,a=new Promise(function(i){t.subscribe(i),n=i}).then(s);return a.cancel=function(){t.unsubscribe(n)},a},r(function(n){t.reason||(t.reason=new Jr(n),e(t.reason))})}A.prototype.throwIfRequested=function(){if(this.reason)throw this.reason};A.prototype.subscribe=function(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]};A.prototype.unsubscribe=function(e){if(!!this._listeners){var t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}};A.source=function(){var e,t=new A(function(n){e=n});return{token:t,cancel:e}};var zr=A,Kr=function(e){return function(s){return e.apply(null,s)}},Wr=function(e){return typeof e=="object"&&e.isAxiosError===!0},de=v,Xr=pe,U=Vr,Gr=we,Yr=k;function ge(r){var e=new U(r),t=Xr(U.prototype.request,e);return de.extend(t,U.prototype,e),de.extend(t,e),t.create=function(n){return ge(Gr(r,n))},t}var b=ge(Yr);b.Axios=U;b.Cancel=j;b.CancelToken=zr;b.isCancel=be;b.VERSION=_e.version;b.all=function(e){return Promise.all(e)};b.spread=Kr;b.isAxiosError=Wr;G.exports=b;G.exports.default=b;var Qr=G.exports;const xe="authorization",Zr="https://www.fastmock.site/mock/17d3c111efd563c72cf24734a2610e7b/admin",et="6000",re=Qr.create({baseURL:Zr,timeout:Number(et),headers:{"Content-Type":"application/json;charset=UTF-8"}});re.interceptors.request.use(r=>{const e=X();return e.token&&r.headers&&(r.headers[xe]=e.token),r},r=>Promise.reject(r));re.interceptors.response.use(r=>{const e=r.headers[xe];e&&X().setToken(e);const{status:t,data:s}=r;if(t===200){const{code:n,message:a}=s;return n===0?s:(O.error(a||"\u63A5\u53E3\u8BF7\u6C42\u5F02\u5E38"),Promise.reject(s))}return O.error(`${t}\u670D\u52A1\u5668\u54CD\u5E94\u5F02\u5E38`),Promise.reject(s)},r=>{const{response:e,code:t,message:s,config:n}=r;if(!e)O.error("\u8FDE\u63A5\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC");else{const{_retry:a}=n,{status:i,data:u}=e;t==="ECONNABORTED"&&s.indexOf("timeout")!==-1&&!a?O.error("\u8FDE\u63A5\u8D85\u65F6\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5"):O.error(`${i}${u.message||"error"}`)}return Promise.reject(r)});const Re=r=>re.request(r),rt=(r,e)=>Re({url:"/user/login",method:"post",data:{account:r,passwaord:e}}),tt=()=>Re({url:"/user/permission",method:"get"});const nt={class:"page-container"},st=Ie(" \u767B\u5F55 "),at=Oe({setup(r){const e="\u540E\u53F0\u7BA1\u7406\u7CFB\u7EDF",t=H(),s=H({account:"admin",password:"123456"}),n=H(!1),a=X(),i=Ae(),u={account:[{required:!0,message:"\u8BF7\u8F93\u5165\u8D26\u53F7",trigger:"blur"}],password:[{required:!0,message:"\u8BF7\u8F93\u5165\u5BC6\u7801",trigger:"blur"}]},l=()=>{t.value.validate(async p=>{if(p)try{n.value=!0;const{data:o}=await rt(s.value.account,s.value.password),c=await tt();a.setUserInfo(o),a.setToken(o.accessToken),a.setPermissionCode(c.data),i.push("/"),O({message:"\u767B\u5F55\u6210\u529F",type:"success"})}finally{n.value=!1}})};return(p,o)=>{const c=te("avatar"),d=Ne,_=Te,g=Be,B=te("lock"),h=$e,C=Fe,w=Pe;return Ue(),De("div",nt,[y(w,{class:"form-container"},{header:E(()=>[je("div",null,Le(ke(e)),1)]),default:E(()=>[y(C,{ref_key:"formRef",ref:t,rules:u,model:s.value},{default:E(()=>[y(g,{prop:"account"},{default:E(()=>[y(_,{modelValue:s.value.account,"onUpdate:modelValue":o[0]||(o[0]=N=>s.value.account=N),placeholder:"\u767B\u5F55\u8D26\u53F7"},{prepend:E(()=>[y(d,{size:16},{default:E(()=>[y(c)]),_:1})]),_:1},8,["modelValue"])]),_:1}),y(g,{prop:"password"},{default:E(()=>[y(_,{modelValue:s.value.password,"onUpdate:modelValue":o[1]||(o[1]=N=>s.value.password=N),placeholder:"\u767B\u5F55\u5BC6\u7801",type:"password",onKeyup:qe(l,["enter"])},{prepend:E(()=>[y(d,{size:16},{default:E(()=>[y(B)]),_:1})]),_:1},8,["modelValue","onKeyup"])]),_:1}),y(g,null,{default:E(()=>[y(h,{type:"primary",style:{width:"100%"},loading:n.value,onClick:l},{default:E(()=>[st]),_:1},8,["loading"])]),_:1})]),_:1},8,["model"])]),_:1})])}}});var ut=He(at,[["__scopeId","data-v-2b2a68e6"]]);export{ut as default};
