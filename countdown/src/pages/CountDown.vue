<template>
  <div class="countdown-box">
    <p v-if="isCountDown">距离活动结束还有 <span>{{day}}天</span><span>{{hour}}时</span><span>{{minute}}分</span><span>{{seconds}}秒</span></p>
    <slot v-else name="content"></slot>
  </div>
</template>

<script>
// 开始时间，结束时间，开始倒计时，结束倒计时
export default {
  name: 'CountDown',
  props: {
    start: {
      type: [String, Number],
      default: new Date().getTime()
    },
    end: {
      type: [String, Number],
      default: new Date('2020-10-1 23:59:59').getTime()
    }
  },
  computed: {},
  data () {
    return {
      day: '',
      hour: '',
      minute: '',
      seconds: '',
      timer: null,
      allSeconds: Math.floor((this.end - this.start) / 1000),
      isCountDown: true // 是否还在倒计时
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    this.handleInit()
  },
  methods: {
    // 初始化调用
    handleInit() {
      // 初始化处理开始和结束时间
      this.handleCountDownTime()
      // 开始倒计时
      this.startCountDown()
    },
    handleCountDownTime() {
      this.start = new Date(this.start).getTime()
      this.end = new Date(this.end).getTime()
    },
    startCountDown () {
      this.timer = setInterval(this.countDowm, 1000)
    },
    countDowm () {
      this.allSeconds--
      if (this.allSeconds === 0) {
        this.isCountDown = false
        clearInterval(this.timer)
        return
      }
      // 将时间戳转化为时间格式
      this.transformTime(this.allSeconds)
    },
    transformTime (allSeconds) {
      let _allSeconds = allSeconds
      let _day = Math.floor(_allSeconds / 60 / 60 / 24) // 天
      let _hour = Math.floor((_allSeconds - _day * 60 * 60 * 24) / (60 * 60)) // 小时
      let _minutes = Math.floor((_allSeconds - _day * 60 * 60 * 24 - _hour * 60 * 60) / 60) // 分钟
      let _seconds = _allSeconds - _day * 60 * 60 * 24 - _hour * 60 * 60 - _minutes * 60 // 秒

      this.day = _day
      this.hour = _hour < 10 ? `0${_hour}` : _hour
      this.minutes = _minutes < 10 ? `0${_minutes}` : _minutes
      this.seconds = _seconds < 10 ? `0${_seconds}` : _seconds
    }
  }
}
</script>
