var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('default', function (cb) {
    pump([
            gulp.src('vh-provider.js'),
            uglify(),
            gulp.dest('dist')
        ],
        cb
    );
});