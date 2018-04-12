<template>
 <div class="wiki-container">
   <div >
   	   <img src="../images/banner@3x.png">
   </div>
   <mt-loadmore
   :top-method="loadTop" 
   :bottom-method="loadBottom" 
   @top-status-change="statusChange"
   :top-status.sync="topStatus"
   ref="loadmore">
	   <ul>
	   	 <li v-for="item in list" :key="item.id">
	   	 	  <img :src="item.imgUrl">
	   	 	  <span>{{item.title}}}</span>
	   	 </li>
	   </ul>
     <div slot="top" class="mint-loadmore-top">
        <span v-if="topStatus == 'pull'">pull</span>
        <span v-if="topStatus == 'drop'">drop</span>
        <span v-if="topStatus == 'loading'">Loading...</span>
      </div>
   </mt-loadmore>

 </div>
</template>

<script>
 import Vue from "vue"
 import { Loadmore,Indicator } from 'mint-ui';

 Vue.component(Loadmore.name, Loadmore);
 export default{
    data(){
    	return{
    		list:[],
        topStatus:""
    	}
    },
    async mounted(){
       Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      });
	    const res = await this.getData()
	    this.list = res.data.categories

    },
    updated(){
       setTimeout(()=>{
          Indicator.close()
       },2000)
    },
    methods:{
    	getData(){	
		 	   return  	fetch("/api/index.php")
						    	.then((res)=>res.json())
						    	.then(res=>{
						    		  return res
						    	})
	    	
    	},
      loadTop() {
        fetch('/api/listmore.php')
          .then((response) => response.json())
          .then(result => {
            this.list = [...result.data.categories, ...this.list]
            //console.log(result)
            //this.list.unshift(result.data.categories)
            this.$refs.loadmore.onTopLoaded();
          })
        },

        loadBottom() {
          console.log('loadBottom');
        },
        statusChange(status){
          console.log(status)
           this.topStatus = status
        }
    }
 }
</script>

<style lang="scss">
    @import "../style/app.scss";
   .wiki-container{
   	  display: flex;
   	  flex-direction:column; 
   	 >div:first-child{
   	    
       >img{
       	 width: 100%;
       }
   	 }
     >div:last-child{
         flex:1;
         overflow-y:scroll;  
       ul{
       	 display: flex;
       	 flex-wrap: wrap;
       	 li{
       	 	width: 33.33%;
       	 	display: flex;
       	 	flex-direction: column;
       	 	align-items: center;
       	 	justify-content: center;
       	 	img{
       	 		display: block;
       	 		width: 1rem;
       	 		height: 1rem;
       	 		@include border(1px,#ccc,solid,.1rem)
       	 	}
       	 }
       } 
     }
   }
</style>