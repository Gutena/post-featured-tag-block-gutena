(()=>{"use strict";const e=window.wp.element,t=window.wp.blocks,o=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"gutena/post-featured-tag","title":"Recent Post Custom Tag","category":"gutena","keywords":["custom tag","recent post tag","post tag","featured tag","news post tag"],"description":"Post featured tag block use to add custom featured or new tag on post based on post date.","textdomain":"post-featured-tag-block-gutena","supports":{"html":false},"attributes":{"hideAfter":{"type":"integer"},"latestPost":{"type":"boolean"}},"usesContext":["postId","postType"],"editorScript":"file:./index.js"}'),a=window.wp.i18n,s=window.wp.data,n=window.wp.coreData,l=window.wp.components,r=window.wp.blockEditor,c=[["core/buttons"]];(0,t.registerBlockType)(o,{edit:function(t){let{attributes:o,context:i,setAttributes:p}=t;const{latestPost:d,hideAfter:g}=o,u=(0,r.useBlockProps)({className:"post-featured-tag-block-gutena"}),w=(0,r.useInnerBlocksProps)(u,{template:c}),m=(0,e.createElement)(r.InspectorControls,{key:"settings"},(0,e.createElement)(l.PanelBody,{title:(0,a.__)("Settings","post-featured-tag-block-gutena")},(0,e.createElement)(l.ToggleControl,{label:(0,a.__)("Show Tag only on Latest Post","post-featured-tag-block-gutena"),checked:d,onChange:()=>p({latestPost:!d})}),(0,e.createElement)(l.RangeControl,{label:(0,a.__)("Hide Tag after (in days)","post-featured-tag-block-gutena"),value:g,onChange:e=>p({hideAfter:e}),min:0,max:30,allowReset:!0}))),{latestPosts:h}=(0,s.useSelect)((e=>{const{getEntityRecords:t}=e(n.store);return{latestPosts:t("postType",i.postType,{per_page:1})}}),[]),f=!(null==h||!h.length),[C,k]=(0,n.useEntityProp)("postType",i.postType,"date",i.postId);let b=!0;return""!=o.hideAfter&&0!=o.hideAfter&&((e,t)=>{const o=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()),a=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.floor((a-o)/864e5)})(new Date(C),new Date)>o.hideAfter&&(b=!1),o.latestPost&&b&&f&&(b=h[0].id==i.postId),(0,e.createElement)(e.Fragment,null,m,b&&(0,e.createElement)("div",w))},save:function(){const t=r.useBlockProps.save({className:"post-featured-tag-block-gutena"}),o=r.useInnerBlocksProps.save(t);return(0,e.createElement)("div",o)},icon:(0,e.createElement)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)("g",{"clip-path":"url(#clip0_3298_19)"},(0,e.createElement)("path",{d:"M4 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V22.276C21.0001 22.3594 20.9793 22.4416 20.9395 22.5149C20.8997 22.5882 20.8422 22.6505 20.7722 22.6959C20.7023 22.7413 20.622 22.7685 20.5388 22.775C20.4557 22.7815 20.3722 22.767 20.296 22.733L12 19.03L3.704 22.732C3.6279 22.766 3.54451 22.7805 3.46141 22.774C3.37831 22.7676 3.29813 22.7405 3.22818 22.6952C3.15822 22.6499 3.1007 22.5878 3.06085 22.5146C3.021 22.4414 3.00008 22.3593 3 22.276V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2ZM19 19.965V4H5V19.965L12 16.841L19 19.965ZM12 13.5L9.061 15.045L9.622 11.773L7.245 9.455L10.531 8.977L12 6L13.47 8.977L16.755 9.455L14.378 11.773L14.938 15.045L12 13.5Z",fill:"#0EA489"})),(0,e.createElement)("defs",null,(0,e.createElement)("clipPath",{id:"clip0_3298_19"},(0,e.createElement)("rect",{width:"24",height:"24",fill:"white"}))))})})();