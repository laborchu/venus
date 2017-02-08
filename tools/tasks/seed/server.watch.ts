import { watch } from '../../utils';
import Config from '../../config';

/**
 * Executes the build process, watching for file changes and rebuilding the development environment.
 */
export = watch('build.server', Config.APP_SERVER_SRC);
