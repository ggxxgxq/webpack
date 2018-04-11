<template>
 <div class="wiki-container">
   <div >
   	   <img src="../images/banner@3x.png">
   </div>
   <div class="scroll">	
	   <ul>
	     <p class="head">
            <img src="../images/arrow.png"/>
            <span>下拉刷新...</span>
        </p>
	   	 <li v-for="item in list" :key="item.id">
	   	 	  <img :src="item.imgUrl">
	   	 	  <span>{{item.title}}}</span>
	   	 </li>
	   	  <p class="foot">
            <img src="../images/arrow.png" />
            <span>上拉加载...</span>
        </p>
	   </ul>
   </div>

 </div>
</template>

<script>
 import $ from "../public/zepto.min.js"
 import ajaxLoader from '../images/ajax-loader.gif'
 import arrow from '../images/arrow.png'
 const Iscroll = require("../public/iscroll-probe.js")
 export default{
    data(){
    	return{
    		list:[]
    	}
    },
    async mounted(){
	    const res = await this.getData()
	    this.list = res.data.categories
      
      /*this.forceUpdate(()=>{
      	new Iscroll(".scroll")
      })*/

	    	


    },
    updated(){
    	const that = this
       // 页码计数器
      var pageCount = 1

      // 定义开始时候初始位置
      var topSize = 40


     var myScroll = new Iscroll('.scroll', {
	      probeType: 3,
	      mouseWheel: true
	    })
    // 将初始位置上移 topSize, 保证开始的时候loading隐藏
      myScroll.scrollBy(0, -topSize);

      // 获得头部Loading,尾部的loading是否是拉动以后的状态
      var head = $('.head img'),
          topImgHasClass = head.hasClass('up');
      var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');

      // 监听滚动事件
      myScroll.on('scroll', function () {
          var y = this.y,
              maxY = this.maxScrollY - y;

          // 判断下拉边界
          if (y >= 0) {
              !topImgHasClass && head.addClass('up');
              return '';
          }

          // 判断下拉边界
          if (maxY >= 0) {
              !bottomImgHasClass && foot.addClass('down');
              return '';
          }
      });

      // 监听滚动结束事件
      myScroll.on('scrollEnd', function () {
          // 为防止下拉高度不足 topSize, 去刷新页面
          if (this.y >= -topSize && this.y < 0) {
              myScroll.scrollTo(0, -topSize);
              head.removeClass('up');
          } else if (this.y >= 0) {
              head.attr('src', ajaxLoader);
              // ajax下拉刷新数据
              setTimeout(() => {
                // 复位
                myScroll.scrollTo(0, -topSize);
                head.removeClass('up');
                head.attr('src', arrow);
                myScroll.refresh();
              }, 1000)
          }

          // 为防止上拉高度不足 topSize, 去刷新页面
          var self = this;
          var maxY = this.maxScrollY - this.y;
          if (maxY > -topSize && maxY < 0) {
              myScroll.scrollTo(0, self.maxScrollY + topSize);
              foot.removeClass('down')
          } else if (maxY >= 0) {
              foot.attr('src', ajaxLoader);
              // ajax上拉加载数据
              $.ajax({
                url: '/api/listmore.php',
              
                success: function (res) {
                  console.log(res.data.categories);
                  that.list = [...that.list, ...res.data.categories]
                  //that.list.push(res.data.categories[0])
                  console.log(that.list);

                  // 复位
                  myScroll.refresh();
                  myScroll.scrollTo(0, self.y + topSize);
                  foot.removeClass('down');
                  foot.attr('src', arrow);
                }
              })
          }
        })




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
   	    overflow:hidden;  
       >img{
       	 width: 100%;
       }
   	 }
     >div:last-child{
         flex:1;
         overflow:hidden;
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
       	 p{
       	 	width: 100%;
       	 	display: flex;
       	 	align-items: center;
       	 	justify-content: center;
       	 	 img{
       	 	 	  width: .15rem;
       	 	 	  height: .15rem;
       	 	 }
       	 }
       } 
     }
   }
</style>