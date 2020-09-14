<template>
  <div class="countdown-box">
    <p v-if="isCountDown">距离活动结束还有 <span>{{config.day}}天</span><span>{{config.hour}}时</span><span>{{config.minute}}分</span><span>{{config.seconds}}秒</span></p>
    <slot v-else name="content"></slot>
  </div>
</template>

<script>
import { transformTime, getTime } from '@/utils/time.js'

// 开始时间，结束时间，开始倒计时，结束倒计时
export default {
  name: 'CountDown',
  props: {
    start: {
      type: [String, Number],
      default: getTime()
    },
    end: {
      type: [String, Number],
      default: getTime(3)
    },
    afterCountdown: {
      type: Function,
      default: () => {
        return false
      }
    }
  },
  computed: {},
  data () {
    return {
      config: {
        day: 0,
        hour: 0,
        minute: 0,
        seconds: 0
      },
      timer: null, // 定时器对象
      allSeconds: 0, // 倒计时剩余时间，单位为秒
      isCountDown: true // 是否继续倒计时
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    this.initialize()
  },
  methods: {
    // 初始化调用
    initialize () {
      // 初始化处理开始和结束时间
      this.formatCountDownTime()
      // 如果都是默认时间,则不进行倒计时
      if (this.allSeconds <= 0) return
      // 开始倒计时
      this.startCountDown()
    },
    formatCountDownTime () {
      this.start = new Date(this.start).getTime()
      this.end = new Date(this.end).getTime()
      this.allSeconds = Math.floor((this.end - this.start) / 1000)
    },
    startCountDown () {
      this.timer = setInterval(this.countDowm, 1000)
    },
    countDowm () {
      this.allSeconds--
      if (this.allSeconds === 0) {
        this.isCountDown = false
        clearInterval(this.timer)
        this.afterCountdown && this.afterCountdown()
        return
      }
      // 将时间戳转化为时间格式
      this.config = transformTime(this.allSeconds)
    }
  }
}
</script>
