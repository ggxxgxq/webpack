<template>
 <div class="index-container">
  <router-view></router-view>
  <nav>
  	<ul>
	   <router-link tag="li" to="/wiki" activeClass="active" class=".yo-ico"><span>&#xe93b;</span><span>wiki</span></router-link>
	   <router-link  tag="li" to="/settings"  activeClass="active" class=".yo-ico"><span>&#xe608;</span><span>list</span></router-link>
	   <router-link  tag="li" to="/list" activeClass="active"  class=".yo-ico"><span>&#xe64c;</span><span>settings</span></router-link>
  	</ul>
  </nav>
 </div>
</template>

<script>
 export default{

 }
</script>

<style lang="scss">
    @import "../style/app.scss";
    @font-face {
	  font-family: 'yofont';
	  src: url('../images/fonts/iconfont.woff') format('woff'),url('../images/fonts/iconfont.ttf') format('truetype');
	}

   .index-container{
   	  display: flex;
   	  height: 100%;
   	  flex-direction: column;
   	  >div{	  	
   	  	flex:1;
   	  }
   	   >nav{
         height: .44rem;
         ul{
         	display: flex;
            width: 100%;
            height: 100%;
            @include border(1px 0 0 0);
            background: #fff;
          .active{
          	color: #666;
          }
         	li{
         		display: flex;
         		flex:1;
         		color: #ccc;
         		align-items: center;
                justify-content: center;
         	    
         	}
         }

   	  }
   }

</style>