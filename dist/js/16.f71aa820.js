"use strict";(self["webpackChunkvue_week7"]=self["webpackChunkvue_week7"]||[]).push([[16],{9016:function(e,t,s){s.r(t),s.d(t,{default:function(){return w}});var a=s(6252),n=s(9963);const o=e=>((0,a.dD)("data-v-7e95c8ba"),e=e(),(0,a.Cn)(),e),i={class:"login"},r={class:"row justify-content-center"},l=o((()=>(0,a._)("div",{class:"page-title text-center"},"請先登入",-1))),d={class:"form-floating mb-3"},c=o((()=>(0,a._)("label",{for:"email"},"Email",-1))),u={class:"form-floating"},p=o((()=>(0,a._)("label",{for:"password"},"密碼",-1))),m=o((()=>(0,a._)("div",{class:"d-grid gap-2 mt-3"},[(0,a._)("button",{type:"submit",class:"btn btn-dark btn-lg"},"登入")],-1)));function h(e,t,s,o,h,g){const v=(0,a.up)("VLoading");return(0,a.wg)(),(0,a.iD)("div",i,[(0,a.Wm)(v,{active:h.isLoading,"z-index":1060},null,8,["active"]),(0,a._)("div",r,[l,(0,a._)("form",{action:"",onSubmit:t[2]||(t[2]=(0,n.iM)(((...e)=>g.login&&g.login(...e)),["prevent"]))},[(0,a._)("div",d,[(0,a.wy)((0,a._)("input",{type:"email","onUpdate:modelValue":t[0]||(t[0]=e=>h.user.username=e),class:"form-control",id:"email",placeholder:"name@example.com"},null,512),[[n.nr,h.user.username]]),c]),(0,a._)("div",u,[(0,a.wy)((0,a._)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>h.user.password=e),class:"form-control",id:"password",placeholder:"密碼",autocomplete:""},null,512),[[n.nr,h.user.password]]),p]),m],32)])])}var g={data(){return{isLoading:!1,user:{username:"",password:""}}},methods:{login(){const e="https://vue3-course-api.hexschool.io/v2/admin/signin";this.isLoading=!0,this.$http.post(e,this.user).then((e=>{const{token:t,expired:s}=e.data;document.cookie=`hexToken=${t}; expires=${new Date(s)}; path=/`,this.isLoading=!1,this.$router.push("/admin/products")})).catch((()=>{this.isLoading=!1,alert("登入失敗")}))}}},v=s(3744);const f=(0,v.Z)(g,[["render",h],["__scopeId","data-v-7e95c8ba"]]);var w=f}}]);
//# sourceMappingURL=16.f71aa820.js.map