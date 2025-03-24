document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  try {
    const adType = window.Yabbi.REWARDED;
    const placementName = EnvironmentVariables.coreRewardedUnitID;
    const advert = document.querySelector("#advert");

    advert.setAttribute("placementname", placementName);
    advert.setAttribute("adtype", adType);

    window.addEventListener("onRewardedLoaded", function (adInfo) {
      _addLog("onRewardedLoaded");
    });
    window.addEventListener("onRewardedLoadFailed", function (adInfo) {
      _addLog(`onRewardedLoadFail - ${adInfo.error}`);
    });
    window.addEventListener("onRewardedShown", function (adInfo) {
      _addLog("onRewardedShown");
    });
    window.addEventListener("onRewardedShowFailed", function (adInfo) {
      _addLog(`onRewardedShowFail - ${adInfo.error}`);
    });
    window.addEventListener("onRewardedClosed", function (adInfo) {
      _addLog("onRewardedClosed");
    });
    window.addEventListener("onRewardedVideoStarted", function (adInfo) {
      _addLog("onRewardedVideoStarted");
    });
    window.addEventListener("onRewardedVideoCompleted", function (adInfo) {
      _addLog("onRewardedVideoCompleted");
    });
    window.addEventListener("onUserRewarded", function (adInfo) {
      _addLog("onUserRewarded");
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
