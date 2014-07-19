'use strict';

module.exports = {
  options: {
    stripBanners: true,
    separator: ';'
  },
  concat: {
    src: ['<%= vars.tmpPath %>/*.js'],
    dest: '<%= vars.tmpPath %>/concat.js',
  },
};
