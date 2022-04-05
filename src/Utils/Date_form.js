export default function date(time) {
      if(!time) {
           return ''
      }
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()

      minute = (minute.toString().length === 1) ? ("0" + minute) : minute
      second = (second.toString().length === 1) ? ("0" + second) : second

      return year + '-' + month + '-' + day
        + ' ' + hour + ':' + minute + ':' + second
}