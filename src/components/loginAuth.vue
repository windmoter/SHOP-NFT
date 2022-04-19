
<template>
    <div class="row">
      <div class="col-md-8 col-md-offset-2">    
        <h3 class="text-center">크립토 <span style="color: red;">유튜브</span> 썸네일</h1>
        <h3 class="text-center">
          <code>Collect, Buy and Sell YouTube Thumbnails!</code>           
          <button type="button" 
                  class="btn btn-info pull-right" 
                  id="login" 
                  data-toggle="modal"
                  data-target="#loginModal">
                  로그인
          </button>
          <button type="button" 
                  class="btn btn-info pull-right" 
                  id="logout" 
                  style="display: none;"
                  onclick="App.handleLogout()">
                  로그아웃
          </button>
        </h3>         
        <div class="text-center" id="address"></div>         
    </div>
</template>

<script>
  import CouponsJS from 'mixins/storeCartCoupon/Coupons'
  import EventBus from 'stores/storeCartCoupon/eventBus.js'
  import { logHelper } from 'common/js/logHelper.js'

  export default {
    mixins : [ CouponsJS ],
    created(){
       EventBus.$on('autoSelect', this.autoSelect)
    },
    methods : {
      vindSelectedCoupon(coupon){ // 쿠폰 선택 
        this.selectedCoupon = coupon;
        this.addSelectedCoupon()
        logHelper.send(event.currentTarget);
      },
      dateFormatter(date){
        if ( date != null && date.length > 8 ) {
          let result = "yy.mm.dd";
          result = result.replace("yy", date.substr(2,2));
          result = result.replace("mm", date.substr(4,2));
          result = result.replace("dd", date.substr(6,2));
          return result;
        }else {
          return date;
        }
      },
      autoSelect(){ // 쿠폰 자동선택
        let highestCoupon = null;
        let highestDiscount = 0;
        for ( let i in this.coupons ) {
          let coupon = this.coupons[i];
          let discount = coupon.discount;
          if ( coupon.totalPrdPrice > coupon.discount ) {
            if ( discount > highestDiscount ){
              highestDiscount = discount;
              highestCoupon = coupon;
            }
          }
        }
        if (this.selectedCoupon == null || this.selectedCoupon.length == 0  ) {
          this.selectedCoupon = highestCoupon;
        }else if ( this.selectedCoupon.discount < highestDiscount) {
          this.selectedCoupon = highestCoupon;
        }
      }
    }
  }



</script>