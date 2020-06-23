var emojiPickerElement=function(e){"use strict";function t(e){if("string"!=typeof e||!e)throw new Error("expected a non-empty string, got: "+e)}function n(e){if("number"!=typeof e)throw new Error("expected a number, got: "+e)}const o="eTag",i="url";function r(e){return function(e,t){const n=new Set,o=[];for(const i of e){const e=t(i);n.has(e)||(n.add(e),o.push(i))}return o}(e,e=>e.unicode)}async function a(e){const t=function(e){for(var t=e.length,n=new ArrayBuffer(t),o=new Uint8Array(n),i=-1;++i<t;)o[i]=e.charCodeAt(i);return n}(JSON.stringify(e)),n=function(e){for(var t="",n=new Uint8Array(e),o=n.byteLength,i=-1;++i<o;)t+=String.fromCharCode(n[i]);return t}(await crypto.subtle.digest("SHA-1",t));return btoa(n)}const s=[{version:1,migration:function(e,t,n){function o(t,n,o){const i=n?e.createObjectStore(t,{keyPath:n}):e.createObjectStore(t);if(o)for(const[e,[t,n]]of Object.entries(o))i.createIndex(e,t,{multiEntry:n});return i}o("keyvalue"),o("emoji","unicode",{tokens:["tokens",!0],"group-order":[["group","order"]]}),o("favorites",void 0,{count:[""]}),n()}}],c={},l={};function u(e,t,n){n.onerror=()=>t(n.error),n.onblocked=()=>t(new Error("IDB blocked")),n.onsuccess=()=>e(n.result)}function d(e){return l[e]||(l[e]=async function(e){return await new Promise((t,n)=>{const o=indexedDB.open(e,1);c[e]=o,o.onupgradeneeded=e=>{const t=o.result,n=e.currentTarget.transaction,i=s.filter(({version:t})=>e.oldVersion<t);!function e(){if(!i.length)return;const{migration:o}=i.shift();o(t,n,e)}()},u(t,n,o)})}(e)),l[e]}function f(e,t,n,o){return new Promise((i,r)=>{const a=e.transaction(t,n),s="string"==typeof t?a.objectStore(t):t.map(e=>a.objectStore(e));let c;o(s,e=>{c=e}),a.oncomplete=()=>i(c),a.onerror=()=>r(a.error)})}function m(e){const t=c[e],n=t&&t.result;n&&n.close(),delete c[e],delete l[e]}const h=new Set([":D","xD",":'D","o:)",":x",":p",";p","xp",":l",":z",":j","8D","xo","8)",":B",":o",":s",":'o","Dx","x(","D:",":c",">0)",":3","</3","<3","\\m/",":E","8#"]);function p(e){return e.split(/[\s_]+/).map(e=>!e.match(/\w/)||h.has(e)?e.toLowerCase():e.replace(/[)(:,]/g,"").replace(/’/g,"'").toLowerCase()).filter(Boolean)}function g(e,t,n,o){e[t](n).onsuccess=e=>o&&o(e.target.result)}function b(e,t,n){g(e,"get",t,n)}function y(e,t,n){g(e,"getAll",t,n)}function v(e,t){const n=function(e,t){let n=e[0];for(let o=1;o<e.length;o++){const i=e[o];t(n)>t(i)&&(n=i)}return n}(e,e=>e.length),o=[];for(const i of n)e.some(e=>-1===e.findIndex(e=>t(e)===t(i)))||o.push(i);return o}async function w(e,t,n,r){try{const a=function(e){return e.map(({annotation:e,emoticon:t,group:n,order:o,shortcodes:i,skins:r,tags:a,emoji:s,version:c})=>{const l=[...new Set([...i.map(p).flat(),...a.map(p).flat(),...p(e),t].filter(Boolean).map(e=>e.toLowerCase()).filter(e=>e.length>=2))].sort(),u={annotation:e,group:n,order:o,shortcodes:i,tags:a,tokens:l,unicode:s,version:c};return t&&(u.emoticon=t),r&&(u.skins=r.map(({tone:e,emoji:t,version:n})=>({tone:e,unicode:t,version:n}))),u})}(t);await f(e,["emoji","keyvalue"],"readwrite",([e,t])=>{let s,c,l,u=0;function d(){3==++u&&function(){if(s===r&&c===n)return;for(const t of l)e.delete(t);for(const t of a)e.put(t);t.put(r,o),t.put(n,i)}()}b(t,o,e=>{s=e,d()}),b(t,i,e=>{c=e,d()}),g(e,"getAllKeys",void 0,e=>{l=e,d()})})}finally{}}async function k(e,t){const n=p(t);return f(e,"emoji","readonly",(e,t)=>{const o=[],i=()=>{const e=v(o,e=>e.unicode);t(e.sort((e,t)=>e.order<t.order?-1:1))};for(let t=0;t<n.length;t++){const r=n[t],a=t===n.length-1?IDBKeyRange.bound(r,r+"￿",!1,!0):IDBKeyRange.only(r);y(e.index("tokens"),a,e=>{o.push(e),o.length===n.length&&i()})}})}function j(e,t,n){return f(e,t,"readonly",(e,t)=>b(e,n,t))}function $(e){e||function(){console.warn(...arguments)}("emoji-picker-element is more efficient if the dataSource server exposes an ETag header.")}const x=["annotation","emoji","emoticon","group","order","shortcodes","tags","version"];function E(e,t){if(2!==Math.floor(e.status/100))throw new Error("Failed to fetch: "+t+":  "+e.status)}async function S(e){const t=await fetch(e);E(t,e);const n=t.headers.get("etag");$(n);const o=await t.json();return function(e){if(!e||!Array.isArray(e)||!e[0]||"object"!=typeof e[0]||x.some(t=>!(t in e[0])))throw new Error("Expected emojibase full (not compact) data, but data is in wrong format")}(o),[n,o]}const _=["name","shortcodes","url"];function T(e){!function(e){const t=e&&Array.isArray(e),n=t&&e.length&&(!e[0]||_.some(t=>!(t in e[0])));if(!t||n)throw new Error("Expected custom emojis to be in correct format")}(e);const t=(e,t)=>e.name.toLowerCase()<t.name.toLowerCase()?-1:1,n=e.sort(t),o=function(e,t){const n=new Map;for(const o of e){const e=t(o);for(const t of e){let e=n;for(let n=0;n<t.length;n++){const o=t.charAt(n);let i=e.get(o);i||(i=new Map,e.set(o,i)),e=i}let i=e.get("");i||(i=[],e.set("",i)),i.push(o)}}return(e,t)=>{let o=n;for(let t=0;t<e.length;t++){const n=e.charAt(t),i=o.get(n);if(!i)return[];o=i}if(t){return o.get("")||[]}const i=[],r=o?[o]:[];for(;r.length;){const e=[...r.shift().entries()].sort((e,t)=>e[0]<t[0]?-1:1);for(const[t,n]of e)""===t?i.push(...n):r.push(n)}return i}}(e,e=>[...new Set(e.shortcodes.map(e=>p(e)).flat())]),i=e=>o(e,!0),r=e=>o(e,!1),a=new Map,s=new Map;for(const t of e){s.set(t.name.toLowerCase(),t);for(const e of t.shortcodes)a.set(e.toLowerCase(),t)}return{all:n,search:e=>{const n=p(e);return v(n.map((e,t)=>(t<n.length-1?i:r)(e)),e=>e.name).sort(t)},byShortcode:e=>a.get(e.toLowerCase()),byName:e=>s.get(e.toLowerCase())}}function L(e){if(!e)return e;const t={};for(const[n,o]of Object.entries(e))"tokens"!==n&&(t[n]=o);return t}async function z(e,t){let n,r=await async function(e){const t=await fetch(e,{method:"HEAD"});E(t,e);const n=t.headers.get("etag");return $(n),n}(t);if(!r){const e=await S(t);r=e[0],n=e[1],r||(r=await a(n))}if(await async function(e,t,n){const[r,a]=await Promise.all([o,i].map(t=>j(e,"keyvalue",t)));return r===n&&a===t}(e,t,r));else{if(!n){n=(await S(t))[1]}await w(e,n,t,r)}}class C{constructor({dataSource:e="https://cdn.jsdelivr.net/npm/emojibase-data@5/en/data.json",locale:t="en",customEmoji:n=[]}={}){this.dataSource=e,this.locale=t,this._dbName="emoji-picker-element-"+this.locale,this._db=void 0,this._lazyUpdate=void 0,this._custom=T(n),this._ready=this._init()}async _init(){const e=this._db=await d(this._dbName),t=this.dataSource;await async function(e){return!await j(e,"keyvalue",i)}(e)?await async function(e,t){let[n,o]=await S(t);n||(n=await a(o)),await w(e,o,t,n)}(e,t):this._lazyUpdate=z(e,t)}async ready(){return this._ready||(this._ready=this._init()),this._ready}async getEmojiByGroup(e){return n(e),await this.ready(),r(await async function(e,t){return f(e,"emoji","readonly",(e,n)=>{const o=IDBKeyRange.bound([t,0],[t+1,0],!1,!0);y(e.index("group-order"),o,n)})}(this._db,e)).map(L)}async getEmojiBySearchQuery(e){t(e),await this.ready();return[...this._custom.search(e),...r(await k(this._db,e)).map(L)]}async getEmojiByShortcode(e){t(e),await this.ready();const n=this._custom.byShortcode(e);return n||L(await async function(e,t){return(await k(e,t)).filter(e=>e.shortcodes.map(e=>e.toLowerCase()).includes(t.toLowerCase()))[0]||null}(this._db,e))}async getEmojiByUnicodeOrName(e){t(e),await this.ready();const n=this._custom.byName(e);return n||L(await async function(e,t){return f(e,"emoji","readonly",(e,n)=>b(e,t,e=>n(e||null)))}(this._db,e))}async getPreferredSkinTone(){return await this.ready(),await j(this._db,"keyvalue","skinTone")||0}async setPreferredSkinTone(e){return n(e),await this.ready(),t=this._db,o="skinTone",i=e,f(t,"keyvalue","readwrite",e=>e.put(i,o));var t,o,i}async incrementFavoriteEmojiCount(e){return t(e),await this.ready(),n=this._db,o=e,f(n,"favorites","readwrite",e=>{b(e,o,t=>e.put((t||0)+1,o))});var n,o}async getTopFavoriteEmoji(e){return n(e),await this.ready(),function(e,t,n){return 0===n?[]:f(e,["favorites","emoji"],"readonly",([e,o],i)=>{const r=[];e.index("count").openCursor(void 0,"prev").onsuccess=e=>{const a=e.target.result;if(!a)return i(r);function s(e){if(r.push(e),r.length===n)return i(r);a.continue()}const c=a.primaryKey,l=t.byName(c);if(l)return s(l);b(o,c,e=>{if(e)return s(e);a.continue()})}})}(this._db,this._custom,e)}set customEmoji(e){this._custom=T(e)}get customEmoji(){return this._custom.all}async _shutdown(){await this.ready();try{await this._lazyUpdate}catch(e){}if(this._db)return this._db=this._ready=this._lazyUpdate=void 0,!0}async close(){await this._shutdown()&&await m(this._dbName)}async delete(){var e;await this._shutdown()&&await(e=this._dbName,new Promise((t,n)=>{m(e),u(t,n,indexedDB.deleteDatabase(e))}))}}function A(){}function D(e){return e()}function M(){return Object.create(null)}function B(e){e.forEach(D)}function P(e){return"function"==typeof e}function R(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function N(e){return e&&P(e.destroy)?e.destroy:A}function O(e,t){e.appendChild(t)}function F(e,t,n){e.insertBefore(t,n||null)}function I(e){e.parentNode.removeChild(e)}function U(e){return document.createElement(e)}function q(e){return document.createTextNode(e)}function H(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function K(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Y(e,t){t=""+t,e.data!==t&&(e.data=t)}function W(e,t){(null!=t||e.value)&&(e.value=t)}function G(e,t,n,o){e.style.setProperty(t,n,o?"important":"")}let J;function Q(e){J=e}function V(){if(!J)throw new Error("Function called outside component initialization");return J}const X=[],Z=[],ee=[],te=[],ne=Promise.resolve();let oe=!1;function ie(){oe||(oe=!0,ne.then(le))}function re(){return ie(),ne}function ae(e){ee.push(e)}let se=!1;const ce=new Set;function le(){if(!se){se=!0;do{for(let e=0;e<X.length;e+=1){const t=X[e];Q(t),ue(t.$$)}for(X.length=0;Z.length;)Z.pop()();for(let e=0;e<ee.length;e+=1){const t=ee[e];ce.has(t)||(ce.add(t),t())}ee.length=0}while(X.length);for(;te.length;)te.pop()();oe=!1,se=!1,ce.clear()}}function ue(e){if(null!==e.fragment){e.update(),B(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(ae)}}const de=new Set;function fe(e,t){e&&e.i&&(de.delete(e),e.i(t))}const me="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function he(e,t){e.d(1),t.delete(e.key)}function pe(e,t,n,o,i,r,a,s,c,l,u,d){let f=e.length,m=r.length,h=f;const p={};for(;h--;)p[e[h].key]=h;const g=[],b=new Map,y=new Map;for(h=m;h--;){const e=d(i,r,h),s=n(e);let c=a.get(s);c?o&&c.p(e,t):(c=l(s,e),c.c()),b.set(s,g[h]=c),s in p&&y.set(s,Math.abs(h-p[s]))}const v=new Set,w=new Set;function k(e){fe(e,1),e.m(s,u,a.has(e.key)),a.set(e.key,e),u=e.first,m--}for(;f&&m;){const t=g[m-1],n=e[f-1],o=t.key,i=n.key;t===n?(u=t.first,f--,m--):b.has(i)?!a.has(o)||v.has(o)?k(t):w.has(i)?f--:y.get(o)>y.get(i)?(w.add(o),k(t)):(v.add(i),f--):(c(n,a),f--)}for(;f--;){const t=e[f];b.has(t.key)||c(t,a)}for(;m;)k(g[m-1]);return g}function ge(e,t,n,o,i,r,a=[-1]){const s=J;Q(e);const c=t.props||{},l=e.$$={fragment:null,ctx:null,props:r,update:A,not_equal:i,bound:M(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(s?s.$$.context:[]),callbacks:M(),dirty:a};let u=!1;if(l.ctx=n?n(e,c,(t,n,...o)=>{const r=o.length?o[0]:n;return l.ctx&&i(l.ctx[t],l.ctx[t]=r)&&(l.bound[t]&&l.bound[t](r),u&&function(e,t){-1===e.$$.dirty[0]&&(X.push(e),ie(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}(e,t)),n}):[],l.update(),u=!0,B(l.before_update),l.fragment=!!o&&o(l.ctx),t.target){if(t.hydrate){const e=function(e){return Array.from(e.childNodes)}(t.target);l.fragment&&l.fragment.l(e),e.forEach(I)}else l.fragment&&l.fragment.c();t.intro&&fe(e.$$.fragment),function(e,t,n){const{fragment:o,on_mount:i,on_destroy:r,after_update:a}=e.$$;o&&o.m(t,n),ae(()=>{const t=i.map(D).filter(P);r?r.push(...t):B(t),e.$$.on_mount=[]}),a.forEach(ae)}(e,t.target,t.anchor),le()}Q(s)}let be;"function"==typeof HTMLElement&&(be=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){for(const e in this.$$.slotted)this.appendChild(this.$$.slotted[e])}attributeChangedCallback(e,t,n){this[e]=n}$destroy(){!function(e,t){const n=e.$$;null!==n.fragment&&(B(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=A}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(){}});var ye={categoriesLabel:"Categories",emojiUnsupportedMessage:"Your browser does not support color emoji.",favoritesLabel:"Favorites",loadingMessage:"Loading…",networkErrorMessage:"Could not load emoji. Try refreshing.",regionLabel:"Emoji picker",searchDescription:"When search results are available, press up or down to select and enter to choose.",searchLabel:"Search",searchResultsLabel:"Search results",skinToneDescription:"When expanded, press up or down to select and enter to choose.",skinToneLabel:"Choose a skin tone (currently {skinTone})",skinTonesLabel:"Skin tones",skinTones:["Default","Light","Medium-Light","Medium","Medium-Dark","Dark"],categories:{custom:"Custom","smileys-emotion":"Smileys and emoticons","people-body":"People and body","animals-nature":"Animals and nature","food-drink":"Food and drink","travel-places":"Travel and places",activities:"Activities",objects:"Objects",symbols:"Symbols",flags:"Flags"}};const ve=[[-1,"✨","custom"],[0,"😀","smileys-emotion"],[1,"👋","people-body"],[3,"🐱","animals-nature"],[4,"🍎","food-drink"],[5,"🏠️","travel-places"],[6,"⚽","activities"],[7,"📝","objects"],[8,"⛔️","symbols"],[9,"🏁","flags"]].map(([e,t,n])=>({id:e,emoji:t,name:n})),we=ve.slice(1),ke=ve[0],je="function"==typeof requestIdleCallback?requestIdleCallback:setTimeout;function $e(e){return e.unicode.includes("‍")}const xe={"😃":.6,"😐️":.7,"😀":1,"👁️‍🗨️":2,"🤣":3,"👱‍♀️":4,"🤩":5,"🥰":11,"🥻":12,"🧑‍🦰":12.1,"🥲":13},Ee="🖐️",Se=["😊","😒","♥️","👍️","😍","😂","😭","☺️","😔","😩","😏","💕","🙌","😘"],_e='"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Twemoji Mozilla","Noto Color Emoji","EmojiOne Color","Android Emoji",sans-serif',Te=(e,t)=>{try{const n=document.createElement("canvas");n.width=n.height=1;const o=n.getContext("2d");return o.textBaseline="top",o.font="100px "+_e,o.fillStyle=t,o.scale(.01,.01),o.fillText(e,0,0),o.getImageData(0,0,1,1).data}catch(e){}};function Le(e){const t=Te(e,"#000"),n=Te(e,"#fff");return t&&n&&((e,t)=>{const n=[...e].join(",");return n===[...t].join(",")&&"0,0,0,0"!==n})(t,n)}const ze=new Promise(e=>je(()=>e(function(){let e;for(const[t,n]of Object.entries(xe)){if(!Le(t))break;e=n}return e}()))),Ce=new Map;function Ae(e){e.preventDefault(),e.stopPropagation()}function De(e,t,n){return(t+=e?-1:1)<0?t=n.length-1:t>=n.length&&(t=0),t}function Me(e,t){const n=new Set,o=[];for(const i of e){const e=t(i);n.has(e)||(n.add(e),o.push(i))}return o}const Be="function"==typeof ResizeObserver;function Pe(e,t){let n;return Be?(n=new ResizeObserver(e=>t(e[0].contentRect.width)),n.observe(e)):requestAnimationFrame(()=>t(e.getBoundingClientRect().width)),{destroy(){n&&n.disconnect()}}}function Re(e){{const t=document.createRange();return t.selectNode(e.firstChild),t.getBoundingClientRect().width}}let Ne;const{Map:Oe}=me;function Fe(e,t,n){const o=e.slice();return o[59]=t[n],o[61]=n,o}function Ie(e,t,n){const o=e.slice();return o[59]=t[n],o[61]=n,o}function Ue(e,t,n){const o=e.slice();return o[62]=t[n],o[61]=n,o}function qe(e,t,n){const o=e.slice();return o[65]=t[n],o}function He(e,t,n){const o=e.slice();return o[68]=t[n],o[61]=n,o}function Ke(e,t){let n,o,i,r,a,s,c,l=t[68]+"";return{key:e,first:null,c(){n=U("button"),o=q(l),K(n,"id",i="skintone-"+t[61]),K(n,"class",r="emoji skintone-option hide-focus "+(t[61]===t[14]?"active":"")),K(n,"aria-selected",a=t[61]===t[14]),K(n,"role","option"),K(n,"title",s=t[0].skinTones[t[61]]),K(n,"tabindex","-1"),K(n,"aria-label",c=t[0].skinTones[t[61]]),this.first=n},m(e,t){F(e,n,t),O(n,o)},p(e,t){262144&t[0]&&l!==(l=e[68]+"")&&Y(o,l),262144&t[0]&&i!==(i="skintone-"+e[61])&&K(n,"id",i),278528&t[0]&&r!==(r="emoji skintone-option hide-focus "+(e[61]===e[14]?"active":""))&&K(n,"class",r),278528&t[0]&&a!==(a=e[61]===e[14])&&K(n,"aria-selected",a),262145&t[0]&&s!==(s=e[0].skinTones[e[61]])&&K(n,"title",s),262145&t[0]&&c!==(c=e[0].skinTones[e[61]])&&K(n,"aria-label",c)},d(e){e&&I(n)}}}function Ye(e,t){let n,o,i,r,a,s,c,l,u=t[65].emoji+"";function d(...e){return t[56](t[65],...e)}return{key:e,first:null,c(){n=U("button"),o=U("div"),i=q(u),K(o,"class","emoji"),K(n,"role","tab"),K(n,"class","nav-button"),K(n,"aria-controls",r="tab-"+t[65].id),K(n,"aria-label",a=t[0].categories[t[65].name]),K(n,"aria-selected",s=t[22].id===t[65].id),K(n,"title",c=t[0].categories[t[65].name]),this.first=n},m(e,t,r){F(e,n,t),O(n,o),O(o,i),r&&l(),l=H(n,"click",d)},p(e,o){t=e,2097152&o[0]&&u!==(u=t[65].emoji+"")&&Y(i,u),2097152&o[0]&&r!==(r="tab-"+t[65].id)&&K(n,"aria-controls",r),2097153&o[0]&&a!==(a=t[0].categories[t[65].name])&&K(n,"aria-label",a),6291456&o[0]&&s!==(s=t[22].id===t[65].id)&&K(n,"aria-selected",s),2097153&o[0]&&c!==(c=t[0].categories[t[65].name])&&K(n,"title",c)},d(e){e&&I(n),l()}}}function We(e){let t;return{c(){t=U("div"),K(t,"class","custom-emoji"),G(t,"background-image","url("+e[59].url+")")},m(e,n){F(e,t,n)},p(e,n){4&n[0]&&G(t,"background-image","url("+e[59].url+")")},d(e){e&&I(t)}}}function Ge(e){let t,n=tt(e[59],e[13])+"";return{c(){t=q(n)},m(e,n){F(e,t,n)},p(e,o){8196&o[0]&&n!==(n=tt(e[59],e[13])+"")&&Y(t,n)},d(e){e&&I(t)}}}function Je(e,t){let n,o,i,r,a,s,c,l;function u(e,t){return e[59].unicode?Ge:We}let d=u(t),f=d(t);return{key:e,first:null,c(){n=U("button"),f.c(),K(n,"role",o=t[6]?"option":"menuitem"),K(n,"aria-selected",i=t[6]?t[61]==t[7]:""),K(n,"aria-label",r=t[59].label),K(n,"title",a=t[59].title),K(n,"class",s="emoji "+(t[6]&&t[61]===t[7]?"active":"")),K(n,"id",c=t[6]?"emoji-"+t[61]:void 0),K(n,"data-emoji",l=t[59].id),this.first=n},m(e,t){F(e,n,t),f.m(n,null)},p(e,t){d===(d=u(e))&&f?f.p(e,t):(f.d(1),f=d(e),f&&(f.c(),f.m(n,null))),64&t[0]&&o!==(o=e[6]?"option":"menuitem")&&K(n,"role",o),196&t[0]&&i!==(i=e[6]?e[61]==e[7]:"")&&K(n,"aria-selected",i),4&t[0]&&r!==(r=e[59].label)&&K(n,"aria-label",r),4&t[0]&&a!==(a=e[59].title)&&K(n,"title",a),196&t[0]&&s!==(s="emoji "+(e[6]&&e[61]===e[7]?"active":""))&&K(n,"class",s),68&t[0]&&c!==(c=e[6]?"emoji-"+e[61]:void 0)&&K(n,"id",c),4&t[0]&&l!==(l=e[59].id)&&K(n,"data-emoji",l)},d(e){e&&I(n),f.d()}}}function Qe(e,t){let n,o,i,r,a,s,c,l,u,d,f=(t[6]?t[0].searchResultsLabel:t[62].category?t[62].category:t[2].length>1?t[0].categories.custom:t[0].categories[t[22].name])+"",m=[],h=new Oe,p=t[62].emojis;const g=e=>e[59].id;for(let e=0;e<p.length;e+=1){let n=Ie(t,p,e),o=g(n);h.set(o,m[e]=Je(o,n))}return{key:e,first:null,c(){n=U("div"),o=q(f),a=U("div");for(let e=0;e<m.length;e+=1)m[e].c();K(n,"id",i="menu-label-"+t[61]),K(n,"class",r="category "+(t[2].length>1?"":"gone")),K(n,"aria-hidden","true"),K(a,"class","emoji-menu"),K(a,"role",s=t[6]?"listbox":"menu"),K(a,"aria-labelledby",c="menu-label-"+t[61]),K(a,"id",l=t[6]?"search-results":""),this.first=n},m(e,i,r){F(e,n,i),O(n,o),F(e,a,i);for(let e=0;e<m.length;e+=1)m[e].m(a,null);r&&d(),d=N(u=t[24].call(null,a))},p(e,t){if(4194373&t[0]&&f!==(f=(e[6]?e[0].searchResultsLabel:e[62].category?e[62].category:e[2].length>1?e[0].categories.custom:e[0].categories[e[22].name])+"")&&Y(o,f),4&t[0]&&i!==(i="menu-label-"+e[61])&&K(n,"id",i),4&t[0]&&r!==(r="category "+(e[2].length>1?"":"gone"))&&K(n,"class",r),8388&t[0]){const n=e[62].emojis;m=pe(m,t,g,1,e,n,h,a,he,Je,null,Ie)}64&t[0]&&s!==(s=e[6]?"listbox":"menu")&&K(a,"role",s),4&t[0]&&c!==(c="menu-label-"+e[61])&&K(a,"aria-labelledby",c),64&t[0]&&l!==(l=e[6]?"search-results":"")&&K(a,"id",l)},d(e){e&&I(n),e&&I(a);for(let e=0;e<m.length;e+=1)m[e].d();d()}}}function Ve(e){let t,n;return{c(){t=U("img"),K(t,"class","custom-emoji"),t.src!==(n=e[59].url)&&K(t,"src",n),K(t,"loading","lazy"),K(t,"alt","")},m(e,n){F(e,t,n)},p(e,o){524288&o[0]&&t.src!==(n=e[59].url)&&K(t,"src",n)},d(e){e&&I(t)}}}function Xe(e){let t,n=tt(e[59],e[13])+"";return{c(){t=q(n)},m(e,n){F(e,t,n)},p(e,o){532480&o[0]&&n!==(n=tt(e[59],e[13])+"")&&Y(t,n)},d(e){e&&I(t)}}}function Ze(e,t){let n,o,i,r;function a(e,t){return e[59].unicode?Xe:Ve}let s=a(t),c=s(t);return{key:e,first:null,c(){n=U("button"),c.c(),K(n,"role","menuitem"),K(n,"aria-label",o=t[59].label),K(n,"title",i=t[59].title),K(n,"class","emoji"),K(n,"data-emoji",r=t[59].id),this.first=n},m(e,t){F(e,n,t),c.m(n,null)},p(e,t){s===(s=a(e))&&c?c.p(e,t):(c.d(1),c=s(e),c&&(c.c(),c.m(n,null))),524288&t[0]&&o!==(o=e[59].label)&&K(n,"aria-label",o),524288&t[0]&&i!==(i=e[59].title)&&K(n,"title",i),524288&t[0]&&r!==(r=e[59].id)&&K(n,"data-emoji",r)},d(e){e&&I(n),c.d()}}}function et(e){let t,n,o,i,r,a,s,c,l,u,d,f,m,h,p,g,b,y,v,w,k,j,$,x,E,S,_,T,L,z,C,D,M,P,R,J,Q,V,X,Z,ee,te,ne,oe,ie,re=e[0].searchLabel+"",ae=e[0].searchDescription+"",se=e[0].skinToneDescription+"",ce=[],le=new Oe,ue=[],de=new Oe,fe=[],me=new Oe,ge=[],be=new Oe,ye=e[18];const ve=e=>e[68];for(let t=0;t<ye.length;t+=1){let n=He(e,ye,t),o=ve(n);le.set(o,ce[t]=Ke(o,n))}let we=e[21];const ke=e=>e[65].id;for(let t=0;t<we.length;t+=1){let n=qe(e,we,t),o=ke(n);de.set(o,ue[t]=Ye(o,n))}let je=e[2];const $e=e=>e[62].category;for(let t=0;t<je.length;t+=1){let n=Ue(e,je,t),o=$e(n);me.set(o,fe[t]=Qe(o,n))}let xe=e[19];const Ee=e=>e[59].id;for(let t=0;t<xe.length;t+=1){let n=Fe(e,xe,t),o=Ee(n);be.set(o,ge[t]=Ze(o,n))}return{c(){t=U("section"),n=U("div"),o=U("div"),i=U("div"),r=U("input"),l=U("label"),u=q(re),d=U("span"),f=q(ae),m=U("div"),h=U("button"),p=q(e[15]),y=U("span"),v=q(se),w=U("div");for(let e=0;e<ce.length;e+=1)ce[e].c();S=U("div");for(let e=0;e<ue.length;e+=1)ue[e].c();T=U("div"),L=U("div"),C=U("div"),D=q(e[8]),P=U("div");for(let e=0;e<fe.length;e+=1)fe[e].c();X=U("div");for(let e=0;e<ge.length;e+=1)ge[e].c();te=U("div"),ne=U("button"),ne.textContent="😀",this.c=A,K(n,"class","pad-top"),K(r,"id","search"),K(r,"class","search"),K(r,"type","search"),K(r,"role","combobox"),K(r,"enterkeyhint","search"),K(r,"placeholder",a=e[0].searchLabel),K(r,"autocapitalize","none"),K(r,"autocomplete","off"),K(r,"spellcheck","true"),K(r,"aria-expanded",s=!(!e[6]||!e[1].length)),K(r,"aria-controls","search-results"),K(r,"aria-describedby","search-description"),K(r,"aria-autocomplete","list"),K(r,"aria-activedescendant",c=-1===e[7]?"":"emoji-"+e[7]),K(l,"class","sr-only"),K(l,"for","search"),K(d,"id","search-description"),K(d,"class","sr-only"),K(i,"class","search-wrapper"),K(h,"id","skintone-button"),K(h,"class",g="emoji "+(e[10]?"hide-focus":"")),K(h,"aria-label",e[17]),K(h,"title",e[17]),K(h,"aria-describedby","skintone-description"),K(h,"aria-haspopup","listbox"),K(h,"aria-expanded",e[10]),K(h,"aria-controls","skintone-list"),K(m,"class",b="skintone-button-wrapper "+(e[11]?"expanded":"")),K(y,"id","skintone-description"),K(y,"class","sr-only"),K(w,"id","skintone-list"),K(w,"class",k="skintone-list "+(e[10]?"":"hidden no-animate")),K(w,"style",j=e[10]?"transform: translateY(0);":"transform: translateY(calc(-1 * var(--num-skintones) * var(--total-emoji-size)))"),K(w,"role","listbox"),K(w,"aria-label",$=e[0].skinTonesLabel),K(w,"aria-activedescendant",x="skintone-"+e[14]),K(w,"aria-hidden",E=!e[10]),K(o,"class","search-row"),K(S,"class","nav"),K(S,"role","tablist"),G(S,"grid-template-columns","repeat("+e[21].length+", 1fr)"),K(S,"aria-label",_=e[0].categoriesLabel),K(L,"class","indicator"),K(L,"style",e[9]),K(T,"class","indicator-wrapper"),K(T,"aria-hidden","true"),K(C,"class",M="message "+(e[8]?"":"gone")),K(C,"role","alert"),K(C,"aria-live","polite"),K(P,"class",R="tabpanel "+(!e[23]||e[8]?"gone":"")),K(P,"role",J=e[6]?"region":"tabpanel"),K(P,"aria-label",Q=e[6]?e[0].searchResultsLabel:e[0].categories[e[22].name]),K(P,"id",V=e[6]?"":"tab-"+e[22].id),K(P,"tabindex","0"),K(X,"class",Z="favorites emoji-menu "+(e[8]?"gone":"")),K(X,"role","menu"),K(X,"aria-label",ee=e[0].favoritesLabel),G(X,"padding-right",e[20]+"px"),K(X,"data-testid","favorites"),K(ne,"tabindex","-1"),K(ne,"class","emoji baseline-emoji"),K(te,"aria-hidden","true"),K(te,"class","hidden abs-pos"),K(t,"class","picker"),K(t,"aria-label",oe=e[0].regionLabel),K(t,"style",e[16])},m(a,s,c){F(a,t,s),O(t,n),O(t,o),O(o,i),O(i,r),W(r,e[3]),O(i,l),O(l,u),O(i,d),O(d,f),O(o,m),O(m,h),O(h,p),O(o,y),O(y,v),O(o,w);for(let e=0;e<ce.length;e+=1)ce[e].m(w,null);e[55](w),O(t,S);for(let e=0;e<ue.length;e+=1)ue[e].m(S,null);O(t,T),O(T,L),O(t,C),O(C,D),O(t,P);for(let e=0;e<fe.length;e+=1)fe[e].m(P,null);O(t,X);for(let e=0;e<ge.length;e+=1)ge[e].m(X,null);O(t,te),O(te,ne),e[57](ne),e[58](t),c&&B(ie),ie=[H(r,"input",e[54]),H(r,"keydown",e[26]),H(h,"click",e[31]),H(w,"keydown",e[32]),H(w,"focusout",e[33]),H(w,"click",e[30]),H(S,"keydown",e[28]),N(z=e[25].call(null,L)),H(P,"click",e[29]),H(X,"click",e[29])]},p(e,n){if(1&n[0]&&a!==(a=e[0].searchLabel)&&K(r,"placeholder",a),66&n[0]&&s!==(s=!(!e[6]||!e[1].length))&&K(r,"aria-expanded",s),128&n[0]&&c!==(c=-1===e[7]?"":"emoji-"+e[7])&&K(r,"aria-activedescendant",c),8&n[0]&&W(r,e[3]),1&n[0]&&re!==(re=e[0].searchLabel+"")&&Y(u,re),1&n[0]&&ae!==(ae=e[0].searchDescription+"")&&Y(f,ae),32768&n[0]&&Y(p,e[15]),1024&n[0]&&g!==(g="emoji "+(e[10]?"hide-focus":""))&&K(h,"class",g),131072&n[0]&&K(h,"aria-label",e[17]),131072&n[0]&&K(h,"title",e[17]),1024&n[0]&&K(h,"aria-expanded",e[10]),2048&n[0]&&b!==(b="skintone-button-wrapper "+(e[11]?"expanded":""))&&K(m,"class",b),1&n[0]&&se!==(se=e[0].skinToneDescription+"")&&Y(v,se),278529&n[0]){const t=e[18];ce=pe(ce,n,ve,1,e,t,le,w,he,Ke,null,He)}if(1024&n[0]&&k!==(k="skintone-list "+(e[10]?"":"hidden no-animate"))&&K(w,"class",k),1024&n[0]&&j!==(j=e[10]?"transform: translateY(0);":"transform: translateY(calc(-1 * var(--num-skintones) * var(--total-emoji-size)))")&&K(w,"style",j),1&n[0]&&$!==($=e[0].skinTonesLabel)&&K(w,"aria-label",$),16384&n[0]&&x!==(x="skintone-"+e[14])&&K(w,"aria-activedescendant",x),1024&n[0]&&E!==(E=!e[10])&&K(w,"aria-hidden",E),140509185&n[0]){const t=e[21];ue=pe(ue,n,ke,1,e,t,de,S,he,Ye,null,qe)}if(2097152&n[0]&&G(S,"grid-template-columns","repeat("+e[21].length+", 1fr)"),1&n[0]&&_!==(_=e[0].categoriesLabel)&&K(S,"aria-label",_),512&n[0]&&K(L,"style",e[9]),256&n[0]&&Y(D,e[8]),256&n[0]&&M!==(M="message "+(e[8]?"":"gone"))&&K(C,"class",M),4202693&n[0]){const t=e[2];fe=pe(fe,n,$e,1,e,t,me,P,he,Qe,null,Ue)}if(8388864&n[0]&&R!==(R="tabpanel "+(!e[23]||e[8]?"gone":""))&&K(P,"class",R),64&n[0]&&J!==(J=e[6]?"region":"tabpanel")&&K(P,"role",J),4194369&n[0]&&Q!==(Q=e[6]?e[0].searchResultsLabel:e[0].categories[e[22].name])&&K(P,"aria-label",Q),4194368&n[0]&&V!==(V=e[6]?"":"tab-"+e[22].id)&&K(P,"id",V),532480&n[0]){const t=e[19];ge=pe(ge,n,Ee,1,e,t,be,X,he,Ze,null,Fe)}256&n[0]&&Z!==(Z="favorites emoji-menu "+(e[8]?"gone":""))&&K(X,"class",Z),1&n[0]&&ee!==(ee=e[0].favoritesLabel)&&K(X,"aria-label",ee),1048576&n[0]&&G(X,"padding-right",e[20]+"px"),1&n[0]&&oe!==(oe=e[0].regionLabel)&&K(t,"aria-label",oe),65536&n[0]&&K(t,"style",e[16])},i:A,o:A,d(n){n&&I(t);for(let e=0;e<ce.length;e+=1)ce[e].d();e[55](null);for(let e=0;e<ue.length;e+=1)ue[e].d();for(let e=0;e<fe.length;e+=1)fe[e].d();for(let e=0;e<ge.length;e+=1)ge[e].d();e[57](null),e[58](null),B(ie)}}}function tt(e,t){return t&&e.skins&&e.skins[t]||e.unicode}function nt(e,t,n){let o,i,r,a,s,c,l,u,{locale:d=null}=t,{dataSource:f=null}=t,{skinToneEmoji:m=Ee}=t,{i18n:h=ye}=t,{database:p=null}=t,{customEmoji:g=null}=t,b=[],y=[],v="",w="",k=!1,j=-1,$=0,x="",E=!1,S=!1,_=0,T=0,L="",z=[],A=[],D=8,M=0,B=0,P=we,R=!1;function N(e){o.getRootNode().getElementById(e).focus()}function O(e,t){o.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}var F;function I(e){const t=o.getRootNode();!function(e,t,n){for(const o of e){const e=n(o);if(!e)continue;const i=Re(e);void 0===Ne&&(Ne=Re(t));const r=i.toFixed(1)===Ne.toFixed(1);Ce.set(o.unicode,r),r||o.unicode}}(e,i,e=>t.querySelector(`[data-emoji=${JSON.stringify(e.unicode)}]`)),n(1,b=b)}function U(e){return!e.unicode||!$e(e)||Ce.get(e.unicode)}async function q(e){const t=await ze;return e.filter(({version:e})=>!e||e<=t)}async function H(e){return function(e,t){const n=e=>{const n={};for(const o of e)"number"==typeof o.tone&&o.version<=t&&(n[o.tone]=o.unicode);return n};return e.map(({unicode:e,skins:t,shortcodes:o,url:i,name:r,category:a})=>{return{unicode:e,name:r,skins:t&&n(t),label:(s=[e||r,...o],Me(s,e=>e)).join(", "),title:o.join(", "),url:i,id:e||r,category:a};var s})}(e,await ze)}async function K(e){if(void 0===e)return[];const t=-1===e?g:await p.getEmojiByGroup(e);return H(await q(t))}async function Y(e){return H(await q(await p.getEmojiBySearchQuery(e)))}function W(e){n(3,v=""),n(40,w=""),n(7,j=-1),n(44,B=P.findIndex(t=>t.id===e.id))}async function G(e){const t=await p.getEmojiByUnicodeOrName(e),o=[...b,...A].find(t=>t.unicode===e||t.name===e),i=o.unicode&&tt(o,_);await p.incrementFavoriteEmojiCount(e),n(42,l=l),O("emoji-click",{emoji:t,skinTone:_,...i&&{unicode:i},...o.name&&{name:o.name}})}ze.then(e=>{e||n(8,r=h.emojiUnsupportedMessage)}),F=async()=>{await re(),n(34,d=d||"en"),n(35,f=f||"https://cdn.jsdelivr.net/npm/emojibase-data@5/en/data.json")},V().$$.on_mount.push(F),function(e){V().$$.on_destroy.push(e)}(async()=>{p&&await p.close()});return e.$set=e=>{"locale"in e&&n(34,d=e.locale),"dataSource"in e&&n(35,f=e.dataSource),"skinToneEmoji"in e&&n(37,m=e.skinToneEmoji),"i18n"in e&&n(0,h=e.i18n),"database"in e&&n(36,p=e.database),"customEmoji"in e&&n(38,g=e.customEmoji)},e.$$.update=()=>{if(56&e.$$.dirty[1]&&d&&f&&(!p||p.locale!==d&&p.dataSource!==f)&&n(36,p=new C({dataSource:f,locale:d})),160&e.$$.dirty[1]&&g&&p&&n(36,p.customEmoji=g,p),257&e.$$.dirty[0]|32&e.$$.dirty[1]){p&&async function(){const e=setTimeout(()=>{n(8,r=h.loadingMessage)},1e3);try{await p.ready(),n(23,R=!0)}catch(e){console.error(e),n(8,r=h.networkErrorMessage)}finally{clearTimeout(e),r===h.loadingMessage&&n(8,r="")}}()}if(2097152&e.$$.dirty[0]|128&e.$$.dirty[1]&&(g&&g.length?n(21,P=[ke,...we]):P!==we&&n(21,P=we)),8&e.$$.dirty[0]&&je(()=>{n(40,w=(v||"").trim()),n(7,j=-1)}),2097152&e.$$.dirty[0]|8192&e.$$.dirty[1]&&n(22,u=P[B]),4194304&e.$$.dirty[0]|544&e.$$.dirty[1]){!async function(){p?w.length>=2?(n(1,b=await Y(w)),n(6,k=!0)):u&&(n(1,b=await K(u.id)),n(6,k=!1)):(n(1,b=[]),n(6,k=!1))}()}if(2097216&e.$$.dirty[0]&&n(16,c=`\n  --font-family: ${_e};\n  --num-groups: ${P.length}; \n  --indicator-opacity: ${k?0:1}; \n  --num-skintones: 6;`),32&e.$$.dirty[1]){!async function(){p&&n(13,_=await p.getPreferredSkinTone())}()}if(64&e.$$.dirty[1]&&n(18,z=Array(6).fill().map((e,t)=>function(e,t){if(0===t)return e;const n=e.indexOf("‍");return-1!==n?e.substring(0,n)+String.fromCodePoint(127995+t-1)+e.substring(n):(e.endsWith("️")&&(e=e.substring(0,e.length-1)),e+"\ud83c"+String.fromCodePoint(57339+t-1))}(m,t))),270336&e.$$.dirty[0]&&n(15,s=z[_]),8193&e.$$.dirty[0]&&n(17,L=h.skinToneLabel.replace("{skinTone}",h.skinTones[_])),32&e.$$.dirty[1]){p&&async function(){n(42,l=(await Promise.all(Se.map(e=>p.getEmojiByUnicodeOrName(e)))).filter(Boolean))}()}if(6176&e.$$.dirty[1]){p&&l&&async function(){const e=await p.getTopFavoriteEmoji(D),t=await H(Me([...e,...l],e=>e.unicode||e.name).slice(0,D));n(19,A=t)}()}if(9216&e.$$.dirty[1]&&n(9,x=Be?`transform: translateX(${B*$}px);`:`transform: translateX(${100*B}%);`),2&e.$$.dirty[0]){const e=b.filter(e=>e.unicode).filter(e=>$e(e)&&!Ce.has(e.unicode));e.length?requestAnimationFrame(()=>I(e)):n(1,b=b.filter(U))}if(e.$$.dirty[0],e.$$.dirty[1],66&e.$$.dirty[0]){n(2,y=function(){if(k)return[{category:"",emojis:b}];const e=new Map;for(const t of b){const n=t.category||"";let o=e.get(n);o||(o=[],e.set(n,o)),o.push(t)}return[...e.entries()].map(([e,t])=>({category:e,emojis:t})).sort((e,t)=>e.category<t.category?-1:1)}())}5120&e.$$.dirty[0]&&(E?a.addEventListener("transitionend",()=>{n(11,S=!0)},{once:!0}):n(11,S=!1))},[h,b,y,v,o,i,k,j,r,x,E,S,a,_,T,s,c,L,z,A,M,P,u,R,function(e){return Pe(e,t=>{const i=parseInt(getComputedStyle(o).getPropertyValue("--num-columns"),10),r=e.parentElement.getBoundingClientRect().width-t;n(43,D=i),n(20,M=r)})},function(e){return Pe(e,e=>{n(41,$=e)})},function(e){if(!k||!b.length)return;const t=t=>{Ae(e),n(7,j=De(t,j,b))};switch(e.key){case"ArrowDown":return t(!1);case"ArrowUp":return t(!0);case"Enter":if(-1!==j)return Ae(e),G(b[j].unicode);b.length&&n(7,j=0)}},W,function(e){const{target:t,key:n}=e,o=t=>{t&&(Ae(e),t.focus())};switch(n){case"ArrowLeft":return o(t.previousSibling);case"ArrowRight":return o(t.nextSibling)}},async function(e){const{target:t}=e;if(!t.classList.contains("emoji"))return;Ae(e),G(t.dataset.emoji)},function(e){const{target:t}=e;if(!t.classList.contains("emoji"))return;Ae(e);const o=parseInt(t.id.slice(9),10);n(13,_=o),n(10,E=!1),N("skintone-button"),O("skin-tone-change",{skinTone:o}),p.setPreferredSkinTone(o)},async function(e){n(10,E=!E),n(14,T=_),E&&(Ae(e),requestAnimationFrame(()=>N("skintone-"+T)))},function(e){const{key:t}=e;if(!E)return;const o=async t=>{Ae(e),n(14,T=De(t,T,z)),await re(),N("skintone-"+T)};switch(t){case"ArrowUp":return o(!0);case"ArrowDown":return o(!1)}},async function(){await new Promise(e=>requestAnimationFrame(e));const{activeElement:e}=o.getRootNode();e&&e.classList.contains("skintone-option")||n(10,E=!1)},d,f,p,m,g,!0,w,$,l,D,B,N,O,I,U,q,H,K,Y,G,function(){v=this.value,n(3,v)},function(e){Z[e?"unshift":"push"](()=>{n(12,a=e)})},e=>W(e),function(e){Z[e?"unshift":"push"](()=>{n(5,i=e)})},function(e){Z[e?"unshift":"push"](()=>{n(4,o=e)})}]}class ot extends be{constructor(e){super(),this.shadowRoot.innerHTML="<style>:host{--emoji-padding:0.5rem;--emoji-size:1.375rem;--indicator-height:3px;--input-border-radius:0.5rem;--input-border-size:1px;--input-font-size:1rem;--input-line-height:1.5;--input-padding:0.25rem;--num-columns:8;--outline-size:2px;--border-size:1px;--skintone-border-radius:1rem;--category-font-size:1rem;display:flex;width:min-content;height:400px}:host,:host(.light){--background:#fff;--border-color:#e0e0e0;--indicator-color:#385ac1;--input-border-color:#999;--input-font-color:#111;--input-placeholder-color:#999;--outline-color:#999;--category-font-color:#111;--button-active-background:#e6e6e6;--button-hover-background:#d9d9d9}:host(.dark){--background:#222;--border-color:#444;--indicator-color:#5373ec;--input-border-color:#ccc;--input-font-color:#efefef;--input-placeholder-color:#ccc;--outline-color:#fff;--category-font-color:#efefef;--button-active-background:#555;--button-hover-background:#484848}@media(prefers-color-scheme:dark){:host{--background:#222;--border-color:#444;--indicator-color:#5373ec;--input-border-color:#ccc;--input-font-color:#efefef;--input-placeholder-color:#ccc;--outline-color:#fff;--category-font-color:#efefef;--button-active-background:#555;--button-hover-background:#484848}}button{margin:0;padding:0;border:none;background:none;box-shadow:none;cursor:pointer}button::-moz-focus-inner{border:0}input{padding:0;margin:0;line-height:1.15;font-family:inherit}input[type=search]{-webkit-appearance:none}:focus{outline:var(--outline-color) solid var(--outline-size);outline-offset:calc(-1*var(--outline-size))}:host([data-js-focus-visible]) :focus:not([data-focus-visible-added]){outline:none}:focus:not(:focus-visible){outline:none}.hide-focus{outline:none}*{box-sizing:border-box}.picker{contain:content;display:flex;flex-direction:column;background:var(--background);border:var(--border-size) solid var(--border-color);width:100%;height:100%;overflow:hidden;--total-emoji-size:calc(var(--emoji-size) + 2*var(--emoji-padding))}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.hidden{opacity:0;pointer-events:none}.abs-pos{position:absolute;left:0;top:0}.gone{display:none!important}.skintone-button-wrapper{background:var(--background);z-index:3}.skintone-button-wrapper.expanded{z-index:1}.skintone-list{position:absolute;right:0;top:0;z-index:2;overflow:visible;background:var(--background);border-bottom:var(--border-size) solid var(--border-color);border-radius:0 0 var(--skintone-border-radius) var(--skintone-border-radius);will-change:transform;transition:transform .2s ease-in-out;transform-origin:center 0}@media(prefers-reduced-motion:reduce){.skintone-list{transition-duration:1ms}}.skintone-list.no-animate{transition:none}.tabpanel{overflow-y:auto;-webkit-overflow-scrolling:touch;will-change:transform;min-height:0;flex:1;contain:content}.emoji-menu{display:grid;grid-template-columns:repeat(var(--num-columns),var(--total-emoji-size));justify-content:space-around;align-items:flex-start;width:100%}.category{padding:var(--emoji-padding);font-size:var(--category-font-size);color:var(--category-font-color)}.emoji,button.emoji{padding:var(--emoji-padding);font-size:var(--emoji-size);display:flex;align-items:center;justify-content:center;border-radius:100%;height:var(--total-emoji-size);width:var(--total-emoji-size);line-height:1;overflow:hidden;font-family:var(--font-family);-webkit-tap-highlight-color:transparent}@media(hover:hover) and (pointer:fine){.emoji:hover,button.emoji:hover{background:var(--button-hover-background)}}.emoji.active,.emoji:active,button.emoji.active,button.emoji:active{background:var(--button-active-background)}.custom-emoji{height:var(--total-emoji-size);width:var(--total-emoji-size);padding:var(--emoji-padding);object-fit:contain;pointer-events:none;background-repeat:no-repeat;background-position:50%;background-size:var(--emoji-size) var(--emoji-size)}.nav{display:grid;justify-content:space-between;contain:content}.nav,.nav-button{align-items:center}.nav-button{display:flex;justify-content:center}.indicator-wrapper{display:flex;border-bottom:1px solid var(--border-color)}.indicator{width:calc(100%/var(--num-groups));height:var(--indicator-height);opacity:var(--indicator-opacity);background-color:var(--indicator-color);will-change:transform,opacity;transition:opacity .1s linear,transform .25s ease-in-out}@media(prefers-reduced-motion:reduce){.indicator{will-change:opacity;transition:opacity .1s linear}}.pad-top{width:100%;height:var(--emoji-padding);z-index:3;background:var(--background)}.search-row{display:flex;align-items:center;position:relative;padding-left:var(--emoji-padding);padding-bottom:var(--emoji-padding)}.search-wrapper{flex:1;min-width:0}input.search{padding:var(--input-padding);border-radius:var(--input-border-radius);border:var(--input-border-size) solid var(--input-border-color);background:var(--background);color:var(--input-font-color);width:100%;font-size:var(--input-font-size);line-height:var(--input-line-height)}input.search::placeholder{color:var(--input-placeholder-color)}.favorites{display:flex;flex-direction:row;border-top:var(--border-size) solid var(--border-color);contain:content}.message{padding:var(--emoji-padding)}</style>",ge(this,{target:this.shadowRoot},nt,et,R,{locale:34,dataSource:35,skinToneEmoji:37,i18n:0,database:36,customEmoji:38},[-1,-1,-1]),e&&(e.target&&F(e.target,this,e.anchor),e.props&&(this.$set(e.props),le()))}static get observedAttributes(){return["locale","dataSource","skinToneEmoji","i18n","database","customEmoji"]}get locale(){return this.$$.ctx[34]}set locale(e){this.$set({locale:e}),le()}get dataSource(){return this.$$.ctx[35]}set dataSource(e){this.$set({dataSource:e}),le()}get skinToneEmoji(){return this.$$.ctx[37]}set skinToneEmoji(e){this.$set({skinToneEmoji:e}),le()}get i18n(){return this.$$.ctx[0]}set i18n(e){this.$set({i18n:e}),le()}get database(){return this.$$.ctx[36]}set database(e){this.$set({database:e}),le()}get customEmoji(){return this.$$.ctx[38]}set customEmoji(e){this.$set({customEmoji:e}),le()}}class it extends ot{constructor(e){super({props:e})}disconnectedCallback(){this.$destroy()}}return customElements.define("emoji-picker",it),e.Database=C,e.Picker=it,e}({});
