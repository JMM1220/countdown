function transformTime (allSeconds) {
  let _allSeconds = allSeconds
  let config
  let _day = Math.floor(_allSeconds / 60 / 60 / 24) // 天
  let _hour = Math.floor((_allSeconds - _day * 60 * 60 * 24) / (60 * 60)) // 小时
  let _minutes = Math.floor((_allSeconds - _day * 60 * 60 * 24 - _hour * 60 * 60) / 60) // 分钟
  let _seconds = _allSeconds - _day * 60 * 60 * 24 - _hour * 60 * 60 - _minutes * 60 // 秒

  config = {
    day: _day,
    hour: _hour < 10 ? `0${_hour}` : _hour,
    minute: _minutes < 10 ? `0${_minutes}` : _minutes,
    seconds: _seconds < 10 ? `0${_seconds}` : _seconds
  }

  return config
}

// 获取时间
function getTime (time) {
  let date
  if (!time) {
    date = new Date().getTime()
  } else {
    date = new Date().getTime() + 24 * 60 * 60 * 1000 * time
  }

  return date
}

export {
  transformTime,
  getTime
}
