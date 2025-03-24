document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  try {
    const adType = window.Yabbi.INTERSTITIAL;
    const placementName = EnvironmentVariables.coreInterstitialUnitID;
    const advert = document.querySelector("#advert");

    advert.setAttribute("placementname", placementName);
    advert.setAttribute("adtype", adType);

    window.addEventListener("onInterstitialLoaded", function (adInfo) {
      _addLog("onInterstitialLoaded");
    });
    window.addEventListener("onInterstitialLoadFailed", function (adInfo) {
      _addLog(`onInterstitialLoadFail - ${adInfo.error}`);
    });
    window.addEventListener("onInterstitialShown", function (adInfo) {
      _addLog("onInterstitialShown");
    });
    window.addEventListener("onInterstitialShowFailed", function (adInfo) {
      _addLog(`onInterstitialShowFail - ${adInfo.error}`);
    });
    window.addEventListener("onInterstitialClosed", function (adInfo) {
      _addLog("onInterstitialClosed");
    });
  } catch (error) {
    console.error(error);
  }
}

function _addLog(message) {
  const advert = document.querySelector("#advert");
  const logger = advert.shadowRoot.querySelector("#logger");

  const currentText = logger.textContent || "";
  const separator = currentText.length > 0 ? "\n" : "";
  logger.textContent = currentText + separator + "* " + message;
}
