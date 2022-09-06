// we want font-awesome to load as soon as possible to show the fa-spinner
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/styles.css";
import "../styles/styles.components.css";
import "../styles/styles.login.css";
import "../styles/styles.theme.css";
import "../styles/dashboard.css";
import "bootstrap";
import authConfig from "../auth-config";
import "whatwg-fetch";

// comment out if you don't want a Promise polyfill (remove also from webpack.common.js)
import * as Bluebird from "bluebird";
Bluebird.config({ warnings: false });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature("au-components")
    .feature("components")
    .feature("converters")
    .plugin("aurelia-api", (config) => {
      var offset = (new Date().getTimezoneOffset() / 60) * -1;
      var defaultConfig = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-timezone-offset": offset,
        },
      };

      var auth = "https://com-batiksolo-service-auth-uat.azurewebsites.net/v1/";
      var master = "https://com-batiksolo-service-core-uat.azurewebsites.net/v1/";
      var inventory = "https://com-batiksolo-service-warehouse-uat.azurewebsites.net/v1/";
      var merchandiser = "https://com-batiksolo-service-warehouse-uat.azurewebsites.net/v1/";
      var sales = "https://com-batiksolo-service-pos-uat.azurewebsites.net/v1/";
      //Config API
      config.registerEndpoint("auth", auth);
      config.registerEndpoint("master", master);
      config.registerEndpoint("inventory", inventory);
      config.registerEndpoint("merchandiser", merchandiser);
      config.registerEndpoint("sales", sales);
    })
    .plugin("aurelia-authentication", (baseConfig) => {
      baseConfig.configure(authConfig);
    })
    .plugin("aurelia-dialog", (config) => {
      config.useDefaults();
      config.settings.lock = true;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 5;
    })
    .plugin("aurelia-dragula")
    .plugin("aurelia-bootstrap")
    .developmentLogging();

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')

  await aurelia.start();
  aurelia.setRoot("app");

  // if you would like your website to work offline (Service Worker),
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */
}
