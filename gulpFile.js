/*
Author:       Shyam B
Date:         13th July 2017
Description:  This tool captures screenshots of websites listed in the json object.
              1. Navigate to the gulpFile.js in Terminal
              2. To capture only a certain viewport, e.g. mobile then run "sudo gulp mobile-screenshot"
              3. Amend viewport size in this file
              4. Change output format to png/jpg
*/

var gulp = require('gulp');
const rev = require('gulp-rev');
const Pageres = require('pageres');
const dateFormat = require('dateformat');

var dt = new Date(),
responsive = new Array(),
responsive = [
  {'type':'Mobile', 'size':'320x3000',  'destination':'/mobile'},
  {'type':'Tablet', 'size':'852x3000',  'destination':'/tablet'},
  {'type':'Desktop','size':'1400x3000', 'destination':'/desktop'}];
var urlList = new Array(),
urlList = [
  {'url':'https://www.lonelyplanet.com'},
  {'url':'https://www.qz.com'}
];

//creates the screenshot of the page using PageRes
function pageResCapture(urlVal, size, type, dest){
  try {
    const pageres = new Pageres({delay: 30, username: 'email@address.com', password: 'password1', format: 'jpg'})
      .src(urlVal, [size])
      .src('data:text/html;base64,PGgxPkZPTzwvaDE+', ['1024x768'])
      .dest(type + '/' + dateFormat(dt, 'yyyy-mm-dd') + ' ' + dateFormat(dt, 'h.MM TT (dddd)'))
    	.run()
    	.then(() => console.log(type +' Done. URL:' + urlVal));
  } catch (e) {
    console.log(e.console.error());
  } finally {

  }
};

function loopUrls(loopSize, loopType, loopDest){
  for (var i=0;i<=urlList.length -1;i++) {
    console.log((i+1) + '. ' + urlList[i].url);
    try {
      pageResCapture(urlList[i].url, loopSize, loopType, loopDest);
    } catch (e) {
      console.log('Error:' + e)
    } finally {
    }
  }
};

gulp.task('default', function() {
  gulp.start('capture');
});
gulp.task('capture', function() {
  gulp.start('mobile-screenshot', 'tablet-screenshot', 'desktop-screenshot');
});
gulp.task('mobile-screenshot', function() {
  loopUrls(responsive[0].size, responsive[0].type, responsive[0].destination);
});
gulp.task('tablet-screenshot', function() {
  loopUrls(responsive[1].size, responsive[1].type, responsive[1].destination);
});
gulp.task('desktop-screenshot', function() {
  loopUrls(responsive[2].size, responsive[2].type, responsive[2].destination);
});
