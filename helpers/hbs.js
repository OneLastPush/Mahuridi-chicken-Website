const moment = require('moment')
const i18n = require('i18n')
const urls = require('../routes/urls.json')

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format)
  },
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + ' '
      new_str = str.substr(0, len)
      new_str = str.substr(0, new_str.lastIndexOf(' '))
      new_str = new_str.length > 0 ? new_str : str.substr(0, len)
      return new_str + '...'
    }
    return str
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, '')
  },
  editIcon: function (storyUser, loggedUser, storyId, floating = true) {
    if (storyUser._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/batches/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
      } else {
        return `<a href="/batches/edit/${storyId}"><i class="fas fa-edit"></i></a>`
      }
    } else {
      return ''
    }
  },
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp('>' + selected + '</option>'),
        ' selected="selected"$&'
      )
  },
  i18n: function () {
    return i18n.__.apply(this, arguments)
  },
  __n: function () {
    return i18n.__n.apply(this, arguments)
  },
  url: function (name) {
    return urls[name]
  },
  compareStrings: function(p, q, options) {
    return (p == q) ? options.fn(this) : options.inverse(this)
  },
  concat : function() {
    arguments = [...arguments].slice(0, -1);
    return arguments.join('');
  },
}