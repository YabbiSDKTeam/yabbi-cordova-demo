document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  try {
    const publisherID = EnvironmentVariables.publisherID;

    window.Yabbi = cordova.require("cordova.plugin.yabbi.Yabbi");

    Yabbi.enableDebug(true);
    window.Yabbi.initialize(publisherID, function (error) {
      if (error) {
        console.error("Plugin initialization error:", error);
      } else {
        const version = window.Yabbi.version;
        console.log(`Plugin successfully initialized (${version})`);
      }
    });
  } catch (error) {
    console.error(error);
  }
}
