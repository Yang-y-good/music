"use strict";(self["webpackChunkmusic"]=self["webpackChunkmusic"]||[]).push([[194],{120:function(e,l,t){t.r(l),t.d(l,{default:function(){return k}});var a=t(9425),o=(t(9910),t(8179)),n=(t(6809),t(3396)),c=t(4870),s=t(65),d=t(6031);const i=e=>((0,n.pushScopeId)("data-v-696f27a3"),e=e(),(0,n.popScopeId)(),e),r={class:"login"},u=i((()=>(0,n.createElementVNode)("div",null,null,-1))),m={class:"login_layout"},p=i((()=>(0,n.createElementVNode)("h1",{class:"title"},"扫码登陆",-1))),g={class:"login_img"},v=["src"],h=i((()=>(0,n.createElementVNode)("span",{class:"disabled_text"},"二维码已过期",-1))),f=i((()=>(0,n.createElementVNode)("div",null,[(0,n.createElementVNode)("span",null,[(0,n.createTextVNode)("使用 "),(0,n.createElementVNode)("a",{href:"https://music.163.com/#/download",class:"login_url"},"网易云音乐App"),(0,n.createTextVNode)("扫码登陆")])],-1))),V=i((()=>(0,n.createElementVNode)("div",{class:"login_other"},"选择其他登陆模式 >",-1)));var y={__name:"loginUI",props:{loginShow:{type:Boolean,default:!1}},emits:["loginshow"],async setup(e,{emit:l}){let i,y;const{ref:w}=t(4870),{watch:N,onMounted:k}=t(3396),E=(0,s.useStore)(),_=w(!1),I=w(),x=w(),b=e=>(0,d.gU)(e);let C;const S=async()=>{C&&clearInterval(C);const{data:e}=await(0,d.km)(),{data:{qrimg:l}}=await(0,d.lf)(e.unikey);I.value=l,_.value=!0,C=setInterval((async()=>{const l=await b(e.unikey);800===l.code&&(clearInterval(C),x.value.style.display=""),801===l.code&&console.log("等待扫码"),802===l.code&&console.log("待确认"),803===l.code&&(clearInterval(C),E.dispatch("login/chechLoginStatus"),localStorage.setItem("cookie",l.cookie),_.value=!1)}),3e3)};[i,y]=(0,n.withAsyncContext)((()=>S())),await i,y();const T=e=>{console.log("关闭"),l("loginshow",!1),e(),clearInterval(C)},B=()=>{console.log("刷新二维码"),S(),x.value.style.display="none"};return(e,l)=>{const t=o.mi,s=a.d0;return(0,n.openBlock)(),(0,n.createElementBlock)("div",r,[(0,n.createVNode)(s,{modelValue:(0,c.unref)(_),"onUpdate:modelValue":l[0]||(l[0]=e=>(0,c.isRef)(_)?_.value=e:null),title:"Tips",width:"320px",draggable:"","before-close":T,"close-on-click-modal":!1},{header:(0,n.withCtx)((()=>[u])),default:(0,n.withCtx)((()=>[(0,n.createElementVNode)("div",m,[p,(0,n.createElementVNode)("div",g,[(0,n.createElementVNode)("img",{src:(0,c.unref)(I),alt:"",class:"img"},null,8,v),(0,n.createElementVNode)("div",{class:"disabled",ref_key:"disabledRef",ref:x,style:{display:"none"}},[h,(0,n.createVNode)(t,{type:"primary",onClick:B},{default:(0,n.withCtx)((()=>[(0,n.createTextVNode)("点击刷新")])),_:1})],512)]),f,V])])),_:1},8,["modelValue"])])}}},w=t(89);const N=(0,w.Z)(y,[["__scopeId","data-v-696f27a3"]]);var k=N}}]);
//# sourceMappingURL=loginUI.d8ad7353.js.map