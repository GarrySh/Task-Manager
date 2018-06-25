import gulp from 'gulp';
import repl from 'repl';
import browserSync from 'browser-sync';

import container from './app/container';
import getServer from './app';
import initDb from './app/initDb';

const PORT = process.env.PORT || 5000;

gulp.task('console', () => {
  const replServer = repl.start({
    prompt: 'Application console > ',
  });

  Object.keys(container).forEach((key) => {
    replServer.context[key] = container[key];
  });
});

gulp.task('server', () => {
  getServer().listen(PORT, (err) => {
    if (err) {
      throw new Error('error start web server', err);
    }
    console.log(`server start on port ${PORT}`);
  });
});

gulp.task('browser-sync', ['server'], () => {
  browserSync.init({
    proxy: `http://localhost:${PORT}`,
    port: PORT + 2,
    open: false,
    notify: false,
  });
});

gulp.task('initDb', (done) => {
  initDb().then(() => {
    console.log('fine');
    done();
  });
});

gulp.task('default', ['server']);
