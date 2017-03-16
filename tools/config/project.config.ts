import { join } from 'path';

import { SeedConfig } from './seed.config';
// import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';

    this.SYSTEM_CONFIG_DEV.paths['@ng-bootstrap/ng-bootstrap'] = `${this.APP_BASE}node_modules/@ng-bootstrap/ng-bootstrap/index.js`;
    this.SYSTEM_CONFIG_DEV.paths['traceur'] = 'node_modules/traceur/bin/traceur.js';
    this.SYSTEM_CONFIG_DEV.paths['angular-in-memory-web-api'] = 'node_modules/angular-in-memory-web-api/index.js';

    this.SYSTEM_CONFIG_DEV.paths['angular2-notifications'] = 'node_modules/angular2-notifications/components.js';
    this.SYSTEM_CONFIG_DEV.paths['ng2-dragula'] = 'node_modules/ng2-dragula/index.js';
    this.SYSTEM_CONFIG_DEV.paths['dragula'] = 'node_modules/dragula/dist/dragula.js';


    this.SYSTEM_CONFIG_DEV.paths['ng2-slim-loading-bar'] = 'node_modules/ng2-slim-loading-bar/bundles/index.umd.js';

    this.SYSTEM_CONFIG_DEV.paths['ng2-validation'] = 'node_modules/ng2-validation/bundles/ng2-validation.umd.js';

    this.SYSTEM_CONFIG_DEV.paths['ng2-ace-editor'] = 'node_modules/ng2-ace-editor/ng2-ace-editor.js';
    this.SYSTEM_CONFIG_DEV.paths['brace'] = 'node_modules/brace/index.js';
    this.SYSTEM_CONFIG_DEV.paths['w3c-blob'] = 'node_modules/w3c-blob/index.js';
    this.SYSTEM_CONFIG_DEV.paths['buffer'] = 'node_modules/buffer/index.js';
    this.SYSTEM_CONFIG_DEV.paths['base64-js'] = 'node_modules/base64-js/index.js';
    this.SYSTEM_CONFIG_DEV.paths['ieee754'] = 'node_modules/ieee754/index.js';
    this.SYSTEM_CONFIG_DEV.paths['ace/theme/chrome'] = 'node_modules/ace-builds/src-min/theme-chrome.js';
   
    this.SYSTEM_BUILDER_CONFIG.packages['@ng-bootstrap/ng-bootstrap'] = {
      main: 'index.js',
      defaultExtension: 'js'
    };
    this.SYSTEM_BUILDER_CONFIG.paths['ng2-validation'] = 'node_modules/ng2-validation/bundles/ng2-validation.umd.js';


    this.SYSTEM_BUILDER_CONFIG.packageConfigPaths = [
      ...this.SYSTEM_BUILDER_CONFIG.packageConfigPaths,
      join('node_modules', '@ng-bootstrap', '*', 'package.json')
    ]
    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      { src: 'font-awesome/css/font-awesome.min.css', inject: true },
      { src: 'dragula/dist/dragula.css', inject: true },
      { src: 'ng2-slim-loading-bar/bundles/style.css', inject: true }
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    // Add packages (e.g. ng2-translate)
    // let additionalPackages: ExtendPackages[] = [{
    //   name: 'ng2-translate',
    //   // Path to the package's bundle
    //   path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js'
    // }];
    //
    // this.addPackagesBundles(additionalPackages);

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

  FONTS_DEST = `${this.APP_DEST}/fonts`;

  FONTS_SRC = [
    'node_modules/font-awesome/fonts/**'
  ];

  MODELS_SRC = [
    `${this.APP_DEST}/app/models/**`
  ];
  MODELS_DEST = `${this.DIST_DIR}/${this.APP_SERVER}/client/app/models`;
}
