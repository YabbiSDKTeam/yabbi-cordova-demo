document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  try {
    const publisherID = EnvironmentVariables.publisherID;

    window.SspnetCore = cordova.require("cordova.plugin.sspnet.SspnetCore");

    SspnetCore.enableDebug(true);
    window.SspnetCore.initialize(publisherID, function (error) {
      if (error) {
        console.error("Plugin initialization error:", error);
      } else {
        const version = window.SspnetCore.version;
        console.log(`Plugin successfully initialized (${version})`);
      }
    });
  } catch (error) {
    console.error(error);
  }
}
