"use strict";(self["webpackChunkmusic"]=self["webpackChunkmusic"]||[]).push([[436],{9883:function(e,t,l){l.r(t),l.d(t,{default:function(){return B}});var a=l(9776),o=(l(6885),l(4902)),c=(l(8839),l(3396)),n=l(7139),s=l(2483);const r={key:0,class:"title"},m={key:1,class:"sticky_box"},i={class:"month"},u={key:0,class:"xia"},d={class:"year"},k={class:"album_box"},p=["onClick"],y={class:"name_text"};var h={__name:"albumlist",props:{weekData:{type:Array,default:[]},year:{type:Number,default:void 0},month:{type:Number,default:void 0}},setup(e,{emit:t}){const l=(0,s.tv)(),h=e=>{console.log(e),l.push({path:"/albumDetailPage",query:{ids:e}})};return console.log("本周新碟"),(t,l)=>{const s=o.Dv,v=a.dq,w=(0,c.resolveDirective)("image");return(0,c.openBlock)(),(0,c.createElementBlock)("div",{class:"album_list",onScroll:l[0]||(l[0]=(...e)=>t.onscroll&&t.onscroll(...e))},[0!=e.weekData.length?((0,c.openBlock)(),(0,c.createElementBlock)("span",r,[(0,c.renderSlot)(t.$slots,"title",{text:2,count:1})])):(0,c.createCommentVNode)("",!0),0!=e.weekData.length?((0,c.openBlock)(),(0,c.createElementBlock)("span",m,[(0,c.createElementVNode)("span",i,(0,n.zw)(e.month),1),e.month?((0,c.openBlock)(),(0,c.createElementBlock)("i",u)):(0,c.createCommentVNode)("",!0),(0,c.createElementVNode)("span",d,(0,n.zw)(e.year),1)])):(0,c.createCommentVNode)("",!0),(0,c.createVNode)(v,{gutter:20,class:"style_row"},{default:(0,c.withCtx)((()=>[((0,c.openBlock)(!0),(0,c.createElementBlock)(c.Fragment,null,(0,c.renderList)(e.weekData,(e=>((0,c.openBlock)(),(0,c.createBlock)(s,{key:e,span:4},{default:(0,c.withCtx)((()=>[(0,c.createElementVNode)("div",k,[(0,c.withDirectives)((0,c.createElementVNode)("img",{alt:"",class:"img",onClick:t=>h(e.id)},null,8,p),[[w,`${e.picUrl}?param=300y300`]]),(0,c.createElementVNode)("span",y,(0,n.zw)(e.name),1)])])),_:2},1024)))),128))])),_:1})],32)}}},v=l(89);const w=(0,v.Z)(h,[["__scopeId","data-v-5f921388"]]);var B=w}}]);
//# sourceMappingURL=albumlist.ff37ae52.js.map