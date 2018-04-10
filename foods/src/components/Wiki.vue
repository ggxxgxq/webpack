<template>
 <div class="wiki-container">
   <div >
   	   <img src="../images/banner@3x.png">
   </div>
   <div>	
	   <ul>
	   	 <li v-for="item in list" :key="item.id">
	   	 	  <img :src="item.imgUrl">
	   	 	  <span>{{item.title}}}</span>
	   	 </li>
	   </ul>
   </div>

 </div>
</template>

<script>
 const Iscroll = import("../public/iscroll-probe.js")
 export default{
    data(){
    	return{
    		list:[]
    	}
    },
    async mounted(){
	    const res = await this.getData()
	    this.list = res.data.categories

	    console.log(Iscroll)
    },
    methods:{
    	getData(){	
		 	   return  	fetch("/api/index.php")
						    	.then((res)=>res.json())
						    	.then(res=>{
						    		  return res
						    	})
	    	
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
       >ul{
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