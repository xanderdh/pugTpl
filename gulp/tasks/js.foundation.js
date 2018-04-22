'use strict';

module.exports = function() {
	$.gulp.task('js:foundation', function() {
		return $.gulp.src($.path.jsFoundation)
			.pipe($.gp.concat('foundation.js'))
			.pipe($.gulp.dest($.config.path.root + '/assets/js'))
			.pipe($.gp.if(!$.dev, $.gp.uglify()))
			.pipe($.gp.if(!$.dev, $.gp.rename({ suffix: ".min" })))
			.pipe($.gp.if(!$.dev, $.gulp.dest($.config.path.root + '/assets/js')))
			.pipe($.browserSync.stream());
	})
};

