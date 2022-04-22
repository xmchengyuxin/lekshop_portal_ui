<template>
  <uni-popup :custom="true" type="bottom" ref="Keyboar">
    <view class="KeyboarBody">
    <!--  <view @tap="close" class="dowmImgBx">
        <view class="dowmImg"></view>
      </view> -->
      <view class="KeyboarBx">
        <view v-for="(num , index) in keyboardNum " :key='index' @tap="clickBoard(num)" hover-class="hover"
          :hover-stay-time='20' class="keyboar">
          {{num}}
        </view>
        <view @tap="clickBoard(otherNum)" :class="['keyboar',otherNum==''?'empty':'']" :hover-stay-time='20' hover-class="hover">{{otherNum}}</view>
        <view @tap="clickBoard('0')" hover-class="hover" :hover-stay-time='20' class="keyboar">0</view>
        <view @tap="deleteKeyboar()" class="keyboar keyboarflex" :hover-stay-time='20' hover-class="hover">
          <view class="keyboarDel"></view>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script>
  // import uniPopup from "@/components/uni-popup/uni-popup"
  export default {
    components: {
      // uniPopup
    },
    props: {
      //限制输入框的长度 空值不限制
      psdLength: {
        type: [Number, String],
        default: ''
      },
      //键盘码
      keyboardNum: {
        type: [Array, Object],
        default: () => {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
      },
      //特殊键盘码 .或者X  默空
      otherNum: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        password: '', //要返回的结果
        iptNum: [], //输入的内容
        KeyboarHid: true, //键盘影藏和显示
      }
    },
    created() {
          setTimeout(()=>{console.log("this.psdLength：",this.psdLength)},2000)
    },
    methods: {
      open() {
        this.$refs.Keyboar.open();
      },
      close() {
        this.$refs.Keyboar.close();
      },
      // 密码框
      clickBoard(num) {
        if (num == '') return;
       
        let iptNum = this.iptNum;
        //判断是否限制长度
        if (this.psdLength!='') {
         if (iptNum.length >=this.psdLength) {return};
          this.iptNum.push(num);
          this.returnVal()
        } else {
           this.iptNum.push(num);
          this.returnVal()
        }
      },
      //重置 清空
      reset() {
        this.iptNum = [];
        this.returnVal()
      },
      //删除
      deleteKeyboar() {
        if (this.password == '') {
          return
        }
        this.iptNum.pop();
        this.returnVal()
      },

      //处理返回值
      returnVal() {
        let str = '';
        for (let i = 0; i < this.iptNum.length; i++) {
          str += this.iptNum[i];
        }
        this.password = str;
        this.$emit("input", str)
      }
    }
  }
</script>

<style scoped>
  .KeyboarBody {
    /*  position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99; */
    /* 注释的样式 如果不依赖 uniPopup需要打开，否则不需要*/
    background-color: #FFFFFF;
  }

  .KeyboarBx {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    background-color:rgba(3,3,3,0.1);
    padding:10rpx  6rpx 0rpx 6rpx;
     margin-left: -12rpx;
  }


  .keyboar {
    width: 20%;
    flex-grow: 1;
    padding: 3%;
    font-size: 40rpx;
    background-color: #FFFFFF;
    border-radius: 10rpx;
    margin-left: 12rpx;
    margin-bottom: 10rpx;
  }

  .dian {
    margin-top: -10rpx;
  }

  .keyboarBtn {
    background: linear-gradient(45deg, rgba(242, 131, 9, 1) 0%, rgba(230, 36, 15, 1) 100%);
    color: #fff;
  }

  .hover {
    background: #ebedf0;
  }


  .bot {
    bottom: 0;
  }

  .empty {
    background-color: #EEEEEE;
  }

  .dowmImgBx {
    display: flex;
    justify-content: center;
    border-top: 1rpx solid A1A1A1;
  }

  .dowmImg {
    width: 35rpx;
    height: 35rpx;
    margin-bottom: 10rpx;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACT0lEQVRYR+2UPWgTYRjH/8/dpdZCpVhU/BoEB8FBEBFt7tJe7i5CbAXhrg6CQ8HBQXAQHBzq5CA4CA4OgoNgr0GQIhQTUkJqCPEDBEEQBAdBQSoVlIakXvLIofmopMnlizjkxuN9nt/v/b/v+xB6/FGP+egL9BPoJ/D/JLC8/Hp33sl9AXDOCMqRbsyH6NLzGwLR7BapuDMQCKy4jHICi5nMNinrpAk4DOC8EZQfdVKiBGemxyHNb5V6bziCaDRxSPT5bAaOCAJd0Cb8DzshUYIT4cnqit+anqZCTQH357NE+qDIhXmAjoJpxtD8D9qRqOwcT538DyscDuer+9W8hNFo8oDok2wGHxcIFzVVvt+KRAkOYDG3NmhNTR3L/ttn01eQTL7cv+6sz4NwkhmXQpp8rxmJ8s6B2NAATFmWf9aqr/sMY7HUHsEHmxkKGJcNTb7rRaKyc1rKZ4vW5KTyfbO6hnMgHo/vYmHQBjBBxFd0VblTT6IC56REjqmq6rd66xsKuMXx+ItRFn/ZYOhMfDWkKrdrNa068xQVJVPXT3xtlJgnAbdJIpEYcViyATpFoGt60H+runkVPCOwYGra2OdG8A2DyMvihYXU8NAwzQF8moDrelC+6daV4YRXcNg0DOWTl35NC7gF6XR661qu6N6JMwzMMrPgjlcw3hCzqevKR6/wlgTcokjk3cDI6KpNRGf/wt6yWDBD4+MfmoG3LPBHIiJu37F3jsH7JAgzqjr2vll4WwKtwJoeRJ2CtD0HuinieQ50S6Iv0E+g5wn8Bo+vyyFXaYw2AAAAAElFTkSuQmCC');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
  }

  .keyboarDel {
    width: 50rpx;
    height: 36rpx;
    margin-bottom: 10rpx;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABqUlEQVRYR+2WPUvEQBCGZze1/8DKUnsrEcVaLhvwCgULCy1sLGzFE8RKC0EsBLGwEBRuhmChlTb+hCu0vU4Ff4H3SkKCOS4fezHnNUkXQuZ58s7sbhSN+VJj5lMtUCdglYDrurNKqSMiWqpoaD+IaI6Z3woFjDErRHRJRBMVweMyz8y8mCsQwW8rBtsJjBgeSGQn8A/wbAFbOIBHpdQnEa2ltKijlHoBsJnTvsEEbOFR0SYz37mu21JK7SdAnV6v1wzutdYda4Eh4XHdDWa+Skgk4cHwzlgJlISHtQHsiMhpIAEgXDFa6yL47wx4njcJoPuXpQZgT0QOG43GtCW8fwiNMYFxsOGUucLYAXz7vv+aMhNZNfuHsKRECHcc5wvAAxFdM/OxpUTqKhgmifjLu47j3BPRfDQTWyJyYSGRvhHZJgHgQERanuf5AJaTOQNYFZEbY8wTES1k9CB3JxwmiTJzk78VB09tkyhLzz0L4qIjlig+jkechJ1AJHFGRNt/iHvgVQC7InJS+EeUaMc6gKkqJLTW7+12+zyoZS1QBTitRi1QJzD2BH4AtrHfITKVMwgAAAAASUVORK5CYII=');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    margin-top: 11rpx;

  }

  .keyboarflex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /deep/ .uni-popup__wrapper-box {
    padding: 0rpx !important;
    background-color: transparent;
  }
</style>
