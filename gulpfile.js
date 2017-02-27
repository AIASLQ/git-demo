/*
 * @Author: Administrator
 * @Date:   2017-02-27 11:58:01
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-02-27 15:00:25
 */

'use strict';
/**
 *1.less编译  压缩 合并
 *2.JS合并 压缩 混淆
 *3.img复制
 *html压缩
 */

//在gulpfile中现下载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');


//1.l编less译  压缩 合并
gulp.task('style', function() {
	//这里是在执行style任务时自动执行的
	gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.reload({
			stream:true
		}));
});
//2.JS合并 压缩 混淆
gulp.task('script', function() {
	gulp.src('src/script/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts/'))
		.pipe(browserSync.reload({
			stream:true
		}))
});



//3.img复制
gulp.task('image', function() {
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({
			stream:true
		}))
});



//4.html压缩
gulp.task('html', function() {
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true, //折叠空白字符
			removeComments: true //去掉空白字符
		}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream:true
		}));
});

//npm install browser-sync --save-dev
gulp.task('serve', function() {
	browserSync({
		server:{
			baseDir:['dist']
		},
	}, function(err, bs) {
		console.log(bs.options.getIn(["urls", "local"]));
	});


	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
})