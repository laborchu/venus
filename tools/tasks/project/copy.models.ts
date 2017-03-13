import * as gulp from 'gulp';
import Config from '../../config';

export = () => {
	return gulp.src(Config.MODELS_SRC)
		.pipe(gulp.dest(Config.MODELS_DEST));
};