"use strict";(self["webpackChunkmusic"]=self["webpackChunkmusic"]||[]).push([[464],{1536:function(e,t,a){a.r(t),a.d(t,{default:function(){return C}});var o=a(970),r=(a(451),a(7026)),s=a(6097),n=(a(2760),a(3396)),c=a(7139),l=a(4870),u=a(2483),i=a(65);const p=e=>((0,n.pushScopeId)("data-v-645bbc02"),e=e(),(0,n.popScopeId)(),e),f={class:"total"},h=["onClick"],d=["onClick"],g=p((()=>(0,n.createElementVNode)("span",null," / ",-1))),m=["onClick"];var v={__name:"search-page",setup(e){const t=(0,u.yj)(),a=(0,i.useStore)(),p=(0,u.tv)(),v=(0,l.ref)({limit:30,offset:1}),k=(0,l.ref)(),w=e=>{a.dispatch("search/getSearchList",{keyword:t.query.value,limit:v.value.limit,offset:e*v.value.limit})};(0,n.watch)((()=>t.query.value),(()=>{w(0)})),w(0);const C=(0,n.computed)((()=>a.state.search.songsList)),y=(0,l.ref)(!1);(0,n.watch)((()=>C.value),(e=>{a.commit("songMenu/changePrivileges",e),0!=e.length&&(y.value=!0)})),(0,n.watch)((()=>v.value.offset),(e=>{console.log(e),y.value=!1,a.state.search.songsList=[],k.value.scrollTop=0,w(e-1)}));const b=(0,n.computed)((()=>a.state.search.songCount)),N=e=>{a.dispatch("playMusic/dispatchMusicInfo",e),a.commit("songMenu/CurrentMenuList",C.value)},V=e=>{console.log(e),p.push({path:"/singerDetailPage",query:{id:e}})},_=e=>{console.log(e),p.push({path:"/albumDetailPage",query:{ids:e}})};return(e,a)=>{const u=s.R,i=r.Z,p=o.Mr;return(0,n.openBlock)(),(0,n.createBlock)(p,{class:"search_page",ref_key:"searchPageRef",ref:k},{default:(0,n.withCtx)((()=>[(0,n.createElementVNode)("span",{ref:"searchTitle"},"搜索 "+(0,c.zw)((0,l.unref)(t).query.value),513),(0,n.createElementVNode)("div",f,"共找到 "+(0,c.zw)((0,l.unref)(b))+"单曲",1),(0,n.createVNode)(i,{songList:(0,l.unref)(C),class:"songs_list",ref:"paginationRef",onOnhandleClick:N},{author:(0,n.withCtx)((e=>[(0,n.createElementVNode)("span",{onClick:t=>V(e.row.author[0].id),class:"cursorHover"},(0,c.zw)(e.row.author[0].name),9,h),e.row.author[1]?((0,n.openBlock)(),(0,n.createElementBlock)("span",{key:0,onClick:t=>V(e.row.author[1].id),class:"cursorHover"},[g,(0,n.createTextVNode)(" "+(0,c.zw)(e.row.author[1].name),1)],8,d)):(0,n.createCommentVNode)("",!0)])),album:(0,n.withCtx)((e=>[(0,n.createElementVNode)("span",{onClick:t=>_(e.row.songsInfo.id),class:"cursorHover"},(0,c.zw)(e.row.album),9,m)])),default:(0,n.withCtx)((()=>[(0,l.unref)(y)?((0,n.openBlock)(),(0,n.createBlock)(u,{key:0,background:"",layout:"prev, pager, next",total:(0,l.unref)(b),currentPage:(0,l.unref)(v).offset,"onUpdate:currentPage":a[0]||(a[0]=e=>(0,l.unref)(v).offset=e),"page-size":(0,l.unref)(v).limit,"onUpdate:page-size":a[1]||(a[1]=e=>(0,l.unref)(v).limit=e),class:"pageination"},null,8,["total","currentPage","page-size"])):(0,n.createCommentVNode)("",!0)])),_:1},8,["songList"])])),_:1},512)}}},k=a(89);const w=(0,k.Z)(v,[["__scopeId","data-v-645bbc02"]]);var C=w}}]);
//# sourceMappingURL=search.45eeeae7.js.map