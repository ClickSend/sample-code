(()=>{"use strict";var e={3:(e,t,n)=>{const i=n(251),l=n(339),s=n(589),o=new Set(["AREA","BASE","BR","COL","EMBED","HR","IMG","INPUT","LINK","META","PARAM","SOURCE","TRACK","WBR"]);e.exports=class extends l{constructor(e){super(),this._symbol=Symbol(),this._tagName=e.toUpperCase(),this._attributes={}}get attributes(){return this._attributes}get children(){return this._children.filter((e=>"Element"===e.constructor.name))}set className(e){this.setAttribute("class",e)}get className(){return this.getAttribute("class")}get id(){return this.getAttribute("id")}set id(e){this.setAttribute("id",e)}get innerHTML(){if(o.has(this.tagName))return"";let e="";for(const t of this._children)e+=t.outerHTML;return e}get outerHTML(){const e=o.has(this.tagName),t=this.tagName.toLowerCase();let n="";n+=`<${t}`;const l=Object.keys(this._attributes);for(const e of l)n+=` ${e}="${this._attributes[e].replace(/[&"]/g,(e=>i[e]))}"`;if(n+=">",e)return n;for(const e of this._children)n+=e.outerHTML;return n+=`</${t}>`,n}get tagName(){return this._tagName}append(...e){for(const t of e)"string"==typeof t?this.appendChild(new s(t)):this.appendChild(t)}getAttribute(e){return this._attributes[e]||null}hasAttribute(e){return void 0!==this._attributes[e]}prepend(...e){this._children.splice(0,0,...e.map((e=>"string"==typeof e?new s(e):e)))}remove(){if(null!=this._parentNode)return this._parentNode.removeChild(this)}removeAttribute(e){delete this._attributes[e]}setAttribute(e,t){if(arguments.length<2)throw new TypeError(`Element.setAttribute: At least 2 arguments required, but only ${arguments.length} passed`);if(null!=/[<>&"']/.exec(e))throw new Error("String contains an invalid character");let n;n=void 0===t?"undefined":null===t?"null":t.toString(),this._attributes[e]=n}_attach(){for(const e of this._children)e._attach&&e._attach(e);this.onAttach&&this.onAttach(this)}}},251:e=>{e.exports={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}},339:(e,t,n)=>{const i=n(589);e.exports=class{constructor(){this._children=[],this._parentNode=null}get childNodes(){return this._children}get firstChild(){return this._children[0]}get lastChild(){return this._children[this._children.length-1]}get parentNode(){return this._parentNode}get textContent(){let e="";for(const t of this._children)e+=t.textContent;return e}set textContent(e){for(const e of this._children)e._parentNode=null;if(this._children=[],null==e)return;const t=e.toString();t.length>0&&this.appendChild(new i(t))}appendChild(e){null!=e._parentNode&&e._parentNode.removeChild(e),e._parentNode=this,this._children.push(e)}removeChild(e){if(null==e)throw new TypeError("Node.removeChild: At least 1 argument required, but only 0 passed");if(null==e._parentNode||e._parentNode._symbol!==this._symbol)throw new Error("Node.removeChild: The node to be removed is not a child of this node");for(let t=0;t<this._children.length;t+=1)if(this._children[t]._symbol===e._symbol)return this._children[t]._parentNode=null,this._children.splice(t,1),e}}},589:(e,t,n)=>{const i=n(251);e.exports=class{constructor(e){this._symbol=Symbol(),this._data=e.toString(),this._parentNode=null}get outerHTML(){return this._data.replace(/[&<>]/g,(e=>i[e]))}get parentNode(){return this._parentNode}get textContent(){return this._data}}},851:(e,t,n)=>{const i=n(3),l=n(589),s={createElement:e=>new i(e),createTextNode:e=>new l(e)};e.exports=s},313:e=>{e.exports.parseBoolean=(e,t)=>"boolean"==typeof e?e:t,e.exports.parseMaxHeader=(e,t)=>Number.isInteger(e)&&e>=1&&e<=6?e:t},569:(e,t,n)=>{const i=n(3),l=n(589),s=n(851),{parseBoolean:o,parseMaxHeader:r}=n(313),a=["*","[","`","!","#","~","^"].join(""),c=new RegExp(`\\\\([${a}])`,"g"),d=new RegExp(`[${a}]`),h=e=>/^\s$/.test(e),p=(e,t)=>{let n=0;for(;n<t.length;){const i=t.substring(n),l=/^([^=]+)=(?:"(.+?)"|([^;]+))?/.exec(i);if(null==l)return;const s=l[1],o=l[2]||l[3];e.setAttribute(s,o),n+=l[0].length+1}},u=(e,t={})=>{const n=o(t.allowHeader,!0),l=o(t.allowLink,!0),a=o(t.allowImage,!0),f=o(t.allowCode,!0),m=o(t.allowMultilineCode,!0),g=o(t.allowUnorderedList,!0),C=o(t.allowUnorderedNestedList,!0),E=o(t.allowOrderedList,!0),b=o(t.allowOrderedNestedList,!0),N=o(t.allowHorizontalLine,!0),x=o(t.allowQuote,!0),A=o(t.allowFootnote,!1),L=o(t.allowHTMLAttributes,!1),_=r(t.maxHeader,3),v=new i("div");let w=0;const O=`${e}\n`,y=O.length;let T,S,k,$,I;const M={},H=new Set,U=new Map,R=()=>{null!=T&&(v.appendChild(T),v.lastChild._attach(),T=null,S=null)},P=()=>{if(null==S&&(T=s.createElement("P"),S=T),k<$){const e=(e=>e.replace(c,((e,t)=>t)))(I.substring(k,$));S.appendChild(s.createTextNode(e)),k=$}},j=e=>I[$+e];for(;w<y;){const e=O.substring(w),i=e.indexOf("\n");I=e.substring(0,i);let o=i+1,r=!1;if(0===I.trim().length)null!=T&&"P"===T.tagName&&R();else{$=0,k=0;let e=!0;const c=I[0];if("\\"===c)$=1;else if(n&&"#"===c){let n=1;for(;n<_&&"#"===j(n);)n+=1;if(" "===j(n)){R();const i=I.substring(I.indexOf(" ")+1),l=s.createElement(`H${n}`);l.textContent=i,l.onAttach=t.onHeader,T=l,e=!1,R()}}else if("!"===c){if("["===j(1)&&a){const n=I.substring($+1),i=/^\[(.*?)]\((.+?)(?:\s"(.*)")?\)(?:{(.+?)})?$/.exec(n);if(i){R();const n=i[1],l=i[2],o=i[3],r=i[4],a=s.createElement("FIGURE");if(L&&null!=r&&p(a,r),l.endsWith(".mp3")){const e=s.createElement("SOURCE");e.setAttribute("src",l),e.setAttribute("type","audio/mpeg");const n=s.createElement("AUDIO");n.appendChild(e),n.setAttribute("controls",""),n.onAttach=t.onAudio,a.appendChild(n)}else if(l.endsWith(".mp4")){const e=s.createElement("SOURCE");e.setAttribute("src",l),e.setAttribute("type","video/mp4");const n=s.createElement("VIDEO");n.appendChild(e),n.setAttribute("controls",""),n.onAttach=t.onVideo,a.appendChild(n)}else{const e=s.createElement("IMG");e.setAttribute("src",l),e.setAttribute("alt",n),e.onAttach=t.onImage,a.appendChild(e)}if(null!=o){const e=s.createElement("FIGCAPTION");e.textContent=o,a.appendChild(e)}T=a,e=!1,R()}}}else if("-"===c){if(N&&"---"===I&&"\n"===O[w-2]&&"\n"===O[w-1]&&"\n"===O[w+3]&&"\n"===O[w+4]){R();const n=s.createElement("HR");n.onAttach=t.onHorizontalLine,T=n,e=!1,R()}else if(g&&" "===j(1)){if(null!=T&&"UL"!==T.tagName&&R(),null==T){const e=s.createElement("UL");e.onAttach=t.onUnorderedList,e.appendChild(s.createElement("LI")),T=e}else T.appendChild(s.createElement("LI"));S=T.lastChild,$=2,k=$,r=!0}}else if(E&&Number.isInteger(parseInt(c,10))){const e=/^([0-9]+)\. /.exec(I);if(e){const n=e[0].length;if(null!=T&&"OL"!==T.tagName&&R(),null==T){const e=s.createElement("OL");e.onAttach=t.onOrderedList,e.appendChild(s.createElement("LI")),T=e}else T.appendChild(s.createElement("LI"));S=T.lastChild,$=n,k=$,r=!0}}else if(" "===c&&" "===j(1)){const e=/^([ ]{2,})((- )|(\d+\. ))?/.exec(I),n=e[0].length,i=e[1].length,l=null!=e[2],o="- "===e[2]?"UL":"OL";if((!1===l&&null!=S&&null!=S.parentNode&&"UL"===S.parentNode.tagName&&i>=2||!1===l&&null!=S&&null!=S.parentNode&&"OL"===S.parentNode.tagName&&i>=3)&&("LI"===S.tagName&&S.appendChild(s.createElement("BR")),$+=n,k+=n,r=!0),l&&null!=S&&null!=S.parentNode&&(C&&"UL"===T.tagName&&i>=2||b&&"OL"===T.tagName&&i>=3)){let e=0,i=S;for(;null!=i;)"UL"!==i.tagName&&"OL"!==i.tagName||(e+=1),i=i.parentNode;const l=S.parentNode,a=l.lastChild;if(2===e&&S.parentNode.tagName===o)l.appendChild(s.createElement("LI")),S=l.lastChild;else{const e=s.createElement(o);e.onAttach="UL"===o?t.onUnorderedList:t.onOrderedList,e.appendChild(s.createElement("LI")),a.appendChild(e),S=a.lastChild.lastChild}$=n,k=$,r=!0}}else if(x&&">"===c){if(" "===j(1)){if(null!=T&&"BLOCKQUOTE"===T.tagName||R(),null==T){const e=s.createElement("P"),n=s.createElement("BLOCKQUOTE");n.onAttach=t.onQuote,n.appendChild(e),T=n,S=e}else if("BLOCKQUOTE"===T.tagName&&1===I.trim().length){const e=s.createElement("P");T.appendChild(e),S=e}$=2,k=$,r=!0}}else if(m&&I.startsWith("```")){const n=/^```(\w*)\n((.|\n(?!```))+)\n```/.exec(O.substring(w));if(n){R();const i=n[0].length,l=n[1],r=n[2],a=s.createElement("CODE");a.textContent=r.replace(/\\`/g,"`");const c=s.createElement("PRE");c.appendChild(a),c.onAttach=null!=t.onMultilineCode?e=>t.onMultilineCode(e,l):void 0,T=c,R(),o=i,e=!1}}else if(A&&"["===c){const t=/^\[\^([\d\w]+)\]: (.+)/.exec(I);if(t){R();const n=t[1],i=t[2];M[n]=i,e=!1}}if(e){let e;for(!1===r&&null!=T&&"P"!==T.tagName&&R(),null!=S&&"P"===S.tagName&&null!=S.firstChild&&S.appendChild(s.createElement("BR"));$<=i;){let n=0;const i=d.exec(I.substring($,e));if(null==i){if(null==e){$=I.length,P();break}for($=e,P(),$+=S.ffOnTextEnd,k+=S.ffOnTextEnd;S.upOnTextEnd;)S=S.parentNode;S=S.parentNode,e=void 0}else{const o=i[0];if(n=1,$+=i.index,"\\"===j(-1));else if("*"===o){if(null==S||"EM"!==S.tagName&&"STRONG"!==S.tagName){const t=I.substring($),i=/^(\*{1,3})(.*?\S)(\*{1,3})/.exec(t);if(i){const t=i[1],l=t.length,o=i[2],r=i[3],a=o[0];if(t===r&&!1===h(a)){const n=l+o.length;if(P(),e=$+n,"*"===t){const e=s.createElement("EM");e.ffOnTextEnd=l,S.appendChild(e),S=e}else if("**"===t){const e=s.createElement("STRONG");e.ffOnTextEnd=l,S.appendChild(e),S=e}else{const e=s.createElement("EM");e.ffOnTextEnd=l,e.upOnTextEnd=!0;const t=s.createElement("STRONG");t.appendChild(e),S.appendChild(t),S=e}k+=l}n=l}}}else if("~"===o){if("~"===j(1)){const t="~~",i=t.length,l=$+i,o=I.substring(l).indexOf(t);if(o>0){P(),e=l+o;const t=s.createElement("S");t.ffOnTextEnd=i,S.appendChild(t),S=t,n=i,k+=i}}}else if("^"===o){const e=1,t=I.substring($+e),i=("("===t[0]?/^\((.+?)\)/:/^(\w+)/).exec(t);if(i){P();const t=i[0].length,l=i[1],o=s.createElement("SUP");o.textContent=l,S.appendChild(o),n=e+t,k+=n}}else if("["===o){const e=I.substring($+1);if(A&&"^"===j(1)){const i=/\^([\d\w]+)]/.exec(e);if(i){P();const e=i[1];let l;!1===H.has(e)?(H.add(e),l=H.size,U.set(e,l)):l=U.get(e);const o=s.createElement("SUP");o.textContent=l;const r=s.createElement("A");r.setAttribute("href",`#reference${l}`),r.appendChild(o),r.onAttach=null!=t.onReference?n=>t.onReference(n,e):void 0,S.appendChild(r),n=1+i[0].length,k+=n}}else if(l){const i=/^([^\]]+?)]\(([^)]+?)\)/.exec(e);if(i){P();const e=i[1],l=i[2],o=s.createElement("A");o.setAttribute("href",l),o.textContent=e,o.onAttach=t.onLink,S.appendChild(o),n=1+i[0].length,k+=n}}}else if("!"===o&&"["===j(1)){if(a){const e=I.substring($+1),i=/^\[(.+?)]\(([^;)]+)\)(?:{(.+?)})?/.exec(e);if(i){P();const e=1+i[0].length,l=i[1],o=i[2],r=i[3],a=s.createElement("IMG");a.onAttach=t.onImage,a.setAttribute("src",o),a.setAttribute("alt",l),L&&null!=r&&p(a,r),S.appendChild(a),n=e,k+=n}}}else if(f&&"`"===o){const e=I.substring($+1),i=e.indexOf("`");if(i>0){P();const l=e.substring(0,i),o=s.createElement("CODE");o.textContent=l,o.onAttach=t.onCode,S.appendChild(o),n=1+i+1,k+=n}}}$+=n}}}w+=o}if(T&&R(),A){const e=s.createElement("ol");let n=1;for(const i of H.keys()){const l=s.createElement("li");l.id=`reference${n}`;const o=M[i];if(null!=o){const e=u(o,Object.assign({},t,{allowHeader:!1,allowImage:!1,allowMultilineCode:!1,allowUnorderedList:!1,allowOrderedList:!1,allowHorizontalLine:!1,allowQuote:!1,allowFootnote:!1})).firstChild;for(const t of Array.from(e.childNodes))l.appendChild(t)}e.appendChild(l),n+=1}if(e.children.length>0){const t=s.createElement("section");t.appendChild(e),v.appendChild(t)}}return v};e.exports.Element=i,e.exports.Text=l,e.exports.parse=u}},t={};function n(i){var l=t[i];if(void 0!==l)return l.exports;var s=t[i]={exports:{}};return e[i](s,s.exports,n),s.exports}(()=>{const e={version:"1.0.0",date:"2022-05-23",repos:{"java-sdk":{location:"https://github.com/ClickSend/clicksend-java",icon:"https://github.com/ClickSend/clicksend-java/icon.png",title:"The official Java library for ClickSend v3 API",description:"This is the official  [ClickSend](https://clicksend.com/)  SDK. Documentation can be found  [here](https://developers.clicksend.com/docs/rest/v3/?java#introduction).\nUse this library to seamlessly incorporate the power of the ClickSend API directly into your Java application. \n",author:"ClickSend","author-link":"https://www.clicksend.com","operating-system":"all","human-language":"English","computer-languages":["java"]},"php-sdk":{repo:"https://github.com/ClickSend/clicksend-php",icon:"https://github.com/ClickSend/clicksend-php/icon.png",title:"The official PHP library for ClickSend v3 API",description:"This is the official  [ClickSend](https://clicksend.com/)  SDK. Documentation can be found [here](https://developers.clicksend.com/docs/rest/v3/?php#introduction).\nUse this library to seamlessly incorporate the power of the ClickSend API directly into your PHP application.\n",author:"ClickSend","author-link":"https://www.clicksend.com","operating-system":"all","human-language":"English","computer-languages":["php"]}}},t=n(569);function i(){return e&&e.repos?e.repos:null}function l(){const e=function(){const e=["human-language","computer-languages"],t=[],n=i();for(const i in e){const l=e[i];for(const e in n){const i=n[e],s=t.findIndex((e=>e.name===l)),o=t.find((e=>e.items.includes(i[l])));if(-1!==s||o)o||(t[s].items=t[s].items.concat(i[l]));else if(!o){const e={};e.name=l,e.items=[],e.items=e.items.concat(i[l]),t.push(e)}}}return t}(),t=document.querySelector(".categories"),n=document.createElement("ul");for(const t in e){const i=e[t],l=document.createElement("li"),s=document.createElement("ul");for(const e in i.items){const t=i.items[e];s.innerHTML+=`<li><input type="checkbox" name="selected-category" id="${t}" value="${i.name}:${t}"><label for="${t}">${t}</label></li>`}const o=i.name.replace("-"," ");l.innerHTML=`<h3>${o}<h3>`,l.appendChild(s),n.appendChild(l)}t.appendChild(n),function(){const e=document.querySelectorAll('input[name="selected-category"]'),t=[];e.forEach((e=>{e.addEventListener("change",(()=>{if(e.checked&&!t.includes(e.value))t.push(e.value);else{const n=t.indexOf(e.value);t.splice(n,1)}!function(e){const t=i();let n=[];t&&e.length?(e.forEach((e=>{const i=e.split(":"),l=i[0],s=i[1];n=n.concat(Object.entries(t).filter((e=>"object"==typeof e[1][l]?e[1][l].includes(s):e[1][l]===s)))})),n=Object.fromEntries(n),r(n)):r(t)}(t)}))}))}()}function s(e){try{const n=t.parse(e.description).innerHTML,i=document.createElement("div"),l=`<div class="image"><img src="${e.icon}" width="150" height="150" alt="Repository Icon" onerror="this.src = '../src/img/default.svg';"></div>`,s=`<div class="details">\n            <span><strong>Author:</strong> <a href="${e["author-link"]}" target="_blank">${e.author}</a></span>\n            <span><strong>Human Language:</strong> ${e["human-language"]}</span>\n            <span><strong>Computer Language(s):</strong> ${e["computer-languages"]}</span>\n            <span><strong>Operating System:</strong> ${e["operating-system"]}</span>\n        </div>`,o=`<div><a href="${e.location}" target="_blank"><h2>${e.title}</h2></a><p>${n}</p>${s}</div>`;return i.classList.add("repo"),i.innerHTML=`${l}${o}`,i}catch(e){console.log(e)}}function o(){return document.querySelector(".sample-codes")}function r(e){const t=o();if(t.innerHTML="",e)for(const n in e){const i=s(e[n]);t.appendChild(i)}t.classList.remove("loading")}!function(){const e=o();!function(e){for(let t=0;t<2;t++){const t=document.createElement("div");t.classList.add("repo"),t.innerHTML='<div class="image"></div><div><h2></h2><p></p><div class="details"><span></span><span></span><span></span><span></span></div></div>',e.appendChild(t)}}(e),e.classList.add("loading"),r(i()),l()}()})()})();