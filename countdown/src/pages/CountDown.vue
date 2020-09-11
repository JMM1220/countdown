<template>
  <div class="countdown-box">
    <p>距离活动结束还有 <span>{{day}}天</span><span>{{hour}}时</span><span>{{minute}}分</span><span>{{seconds}}秒</span></p>
  </div>
</template>

<script>
// 开始时间，结束时间，开始倒计时，结束倒计时
export default {
  name: 'CountDown',
  props: {
    startTime: {
      type: [String, Number],
      default: new Date().getTime()
    },
    endTime: {
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
      allSeconds: Math.floor((this.endTime - this.startTime) / 1000)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    this.startCountDown()
  },
  methods: {
    // 开始倒计时
    startCountDown () {
      this.timer = setInterval(this.countDowm, 1000)
    },
    countDowm () {
      this.allSeconds--
      if (this.allSeconds === 0) {
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
