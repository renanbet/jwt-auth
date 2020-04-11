var moment = require('moment-timezone')

function Date() { }

Date.prototype.getFormattedDate = (value, format = 'DD/MM/YYYY') => {
  if (!value) {
    return ''
  }

  return moment(value).tz(process.env.TIMEZONE).format(format)
}

Date.prototype.getToday = (format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment().tz(process.env.TIMEZONE).format(format)
}

Date.prototype.getDate = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(value).tz(process.env.TIMEZONE).format(format)
}

module.exports = new Date()
