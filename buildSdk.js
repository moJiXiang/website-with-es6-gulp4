import config from './config';
import sdk from './sdk/app';
// import videojs from 'video.js';

((root) => {
  let sdkRef = root[config.globalName];
  if (sdkRef && sdkRef._ready && sdkRef._config) {
    sdk.init(sdkRef._config).then(sdkRef._ready.bind(sdkRef, sdk));
  } else {
    root[config.globalName] = sdk;
    // if your sdk is wrapper of some another sdks
    // reject them to the window variable
    // root['videojs'] = videojs
  }
})(window);
