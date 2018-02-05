const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

gulp.task('test', function () {
	return gulp.src('test/test.js', {read: false})
	// gulp-mocha needs filepaths so you can't have any plugins before it
		.pipe(mocha({reporter: 'nyan'}));
});
gulp.task('lint', () => {
	return gulp.src(['**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
