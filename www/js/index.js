document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  try {
    const interstitialBtn = document.querySelector("#interstitial");
    const rewardedBtn = document.querySelector("#rewarded");
    const bannerBtn = document.querySelector("#banner");

    interstitialBtn.addEventListener("click", function (event) {
      window.location.href = "interstitial.html";
    });

    rewardedBtn.addEventListener("click", function (event) {
      window.location.href = "rewarded.html";
    });

    bannerBtn.addEventListener("click", function (event) {
      window.location.href = "banner.html";
    });
  } catch (error) {
    console.error(error);
  }
}
