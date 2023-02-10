"use strict";(self["webpackChunkmusic"]=self["webpackChunkmusic"]||[]).push([[581],{6535:function(e,t,n){n.r(t),n.d(t,{default:function(){return z}});var o=n(970),a=(n(451),n(3396));function c(e,t,n,c,l,s){const r=(0,a.resolveComponent)("song-menu",!0),u=o.Mr;return(0,a.openBlock)(),(0,a.createBlock)(u,{onScroll:e.onscroll,class:"song_menu",ref:"elRef"},{default:(0,a.withCtx)((()=>[(0,a.createVNode)(r,{hotTags:e.hotTags,tags:e.Tags,class:"lessen"},null,8,["hotTags","tags"])])),_:1},8,["onScroll"])}var l=n(4870),s=n(65),r=n(6097),u=(n(2760),n(8179)),m=(n(6809),n(1015)),i=(n(8474),n(7139)),d=n(9242),g=n(5399);const f={class:"tabs_main"},p={class:"tabs_songMenu"},k={class:"tabs_select"},v={class:"tabs_check"},h=["onClick"],B={class:"conent"},_={class:"total_Menu"},y={class:"icona"},C={class:"category_select"},E=["onClick"],N={key:0,class:"hot"};var V={__name:"songMenuPage",props:{hotTags:{type:Array,default:[]},tags:{type:Array,default:[]}},emits:["update:current-page"],setup(e,{emit:t}){const o=e,{ref:c,reactive:s}=n(4870),{useStore:V}=n(65),T=(0,a.defineAsyncComponent)((()=>n.e(102).then(n.bind(n,2102)))),w=V(),b=c(),M=c(!1),x=c(),L=c({}),z=c({}),F=c({}),H=c(0),P=c([]),S=e=>{const t=setTimeout((()=>{I.value=!1}),300);w.dispatch("recommend/songlist/getHotSongMenu",e).then((e=>{200==e.code&&(clearInterval(t),I.value=!0)}))};(0,a.watch)((()=>o.tags),(e=>{console.log(e),L.value=e[0],z.value=e[1],F.value=e[2]}));const R=s({order:"hot",cat:"全部",limit:30,offset:1}),A=e=>{let t={...R};t.offset=e*t.limit,S(t)};(0,a.watch)((()=>w.state.recommend.songlist.hotSongMenu),(e=>{H.value=e.total,P.value=e.playlists}));const I=c(!0);S(R);const Z=(e,t)=>{x.value=t.name,R.cat=t.name,R.offset=1,S(R),b.value.innerHTML=t.name},D=()=>{M.value=!M.value},U=e=>{console.log(e),R.cat=e,R.offset=1,S(R),M.value=!1,x.value=e,b.value.innerHTML=e},O=e=>{M.value=!1,x.value=e,R.cat=e,R.offset=1,S(R),b.value.innerHTML=e};(0,a.computed)((()=>w.state.tabsIndex));return(t,n)=>{const o=(0,a.resolveComponent)("ArrowRight"),c=m.gn,s=u.mi,V=r.R;return(0,a.openBlock)(),(0,a.createElementBlock)("div",f,[(0,a.createElementVNode)("div",p,[(0,a.createElementVNode)("div",k,[(0,a.createVNode)(s,{round:"",onClick:D},{default:(0,a.withCtx)((()=>[(0,a.createElementVNode)("span",{ref_key:"totalMenuRef",ref:b},"全部歌单",512),(0,a.createVNode)(c,null,{default:(0,a.withCtx)((()=>[(0,a.createVNode)(o)])),_:1})])),_:1})]),(0,a.createElementVNode)("div",v,[((0,a.openBlock)(!0),(0,a.createElementBlock)(a.Fragment,null,(0,a.renderList)(e.hotTags,((e,t)=>((0,a.openBlock)(),(0,a.createElementBlock)("span",{key:t,class:(0,i.C_)(["tabs_text",{tabs_action:(0,l.unref)(x)===e.name}]),onClick:n=>Z(t,e)},(0,i.zw)(e.name),11,h)))),128))])]),(0,a.withDirectives)((0,a.createElementVNode)("div",B,[(0,l.unref)(I)?((0,a.openBlock)(),(0,a.createElementBlock)(a.Fragment,{key:0},[(0,a.createVNode)((0,l.unref)(T),{songlist:(0,l.unref)(P)},null,8,["songlist"]),0!==(0,l.unref)(P).length?((0,a.openBlock)(),(0,a.createBlock)(V,{key:0,background:"",layout:"prev, pager, next",total:(0,l.unref)(H),currentPage:(0,l.unref)(R).offset,"onUpdate:currentPage":[n[0]||(n[0]=e=>(0,l.unref)(R).offset=e),A],"page-size":(0,l.unref)(R).limit,"onUpdate:page-size":n[1]||(n[1]=e=>(0,l.unref)(R).limit=e),class:"pageina"},null,8,["total","currentPage","page-size"])):(0,a.createCommentVNode)("",!0)],64)):((0,a.openBlock)(),(0,a.createBlock)(g.Z,{key:1})),(0,a.withDirectives)((0,a.createElementVNode)("div",_,[(0,a.createElementVNode)("div",{class:"headre",onClick:n[2]||(n[2]=e=>U((0,l.unref)(L).name))},[(0,a.createElementVNode)("span",{class:(0,i.C_)({total_check:(0,l.unref)(x)===(0,l.unref)(L).name})},(0,i.zw)((0,l.unref)(L).name),3)]),((0,a.openBlock)(!0),(0,a.createElementBlock)(a.Fragment,null,(0,a.renderList)((0,l.unref)(z),((e,t)=>((0,a.openBlock)(),(0,a.createElementBlock)("div",{class:"category",key:t},[(0,a.createElementVNode)("div",y,(0,i.zw)(e),1),(0,a.createElementVNode)("div",C,[((0,a.openBlock)(!0),(0,a.createElementBlock)(a.Fragment,null,(0,a.renderList)((0,l.unref)(F),(e=>((0,a.openBlock)(),(0,a.createElementBlock)(a.Fragment,{key:e},[e.category==t?((0,a.openBlock)(),(0,a.createElementBlock)("div",{key:0,class:"category_items",onClick:t=>O(e.name)},[(0,a.createElementVNode)("span",{class:(0,i.C_)(["text",{text_check:(0,l.unref)(x)===e.name}])},(0,i.zw)(e.name),3),e.hot?((0,a.openBlock)(),(0,a.createElementBlock)("span",N,"HOT ")):(0,a.createCommentVNode)("",!0)],8,E)):(0,a.createCommentVNode)("",!0)],64)))),128))])])))),128))],512),[[d.F8,(0,l.unref)(M)]])],512),[[d.F8,e.tags]])])}}},T=n(89);const w=(0,T.Z)(V,[["__scopeId","data-v-a3cbb03e"]]);var b=w,M=n(6237),x=(0,a.defineComponent)({name:"songmenu",components:{songMenu:b},setup(e){const t=(0,s.useStore)();console.log("歌单组件加载"),t.dispatch("recommend/songlist/getPlayListHot");const n=(0,a.computed)((()=>t.state.recommend.songlist.hotTags));t.dispatch("recommend/songlist/getPlayListCatlist");const o=(0,a.computed)((()=>t.state.recommend.songlist.Tags)),c=(0,l.ref)();return(0,M.f)(c),{hotTags:n,Tags:o,onscroll:onscroll,elRef:c}}});const L=(0,T.Z)(x,[["render",c],["__scopeId","data-v-c965f98c"]]);var z=L}}]);
//# sourceMappingURL=tabMenu.650a4456.js.map