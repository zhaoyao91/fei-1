import {createApp} from 'mantra-core';
import initContext from './configs/context';
import initHead from './configs/head';
import subscribeAppState from './configs/app-state';
import initJquery from './configs/jquery';
import initJqueryInview from './configs/jquery-inview';
import initBootstrap from './configs/bootstrap';
import initSummernote from './configs/summernote';

// modules
import coreModule from './modules/core';
import blogModule from './modules/blog';

initJquery();
initJqueryInview();
initBootstrap();
initSummernote();
subscribeAppState();
initHead();

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(blogModule);
app.init();

// make context global for convenience of debug
const global = this;
global.Context = context;