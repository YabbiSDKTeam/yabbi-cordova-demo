class Advert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["adtype", "placementname"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const adType = parseInt(this.getAttribute("adtype"), 10) || 0;
    const placementName = this.getAttribute("placementname") || "";

    this.shadowRoot.innerHTML = `
      <style>
        .advert-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px;
          font-family: sans-serif;
        }
        .buttons-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .events-header {
          text-align: center;
          font-size: 24px;
          margin-top: 16px;
        }
        #logger {
          white-space: pre-wrap;
          font-size: 14px;
          color: #333;
          padding: 8px;
        }
      </style>
      <div class="advert-container">
        <div class="buttons-container">
          <custom-button id="loadAdBtn" title="Load Ad"></custom-button>
          <custom-button id="showAdBtn" title="Show Ad"></custom-button>
          <custom-button id="destroyAdBtn" title="Destroy Ad"></custom-button>
        </div>
        <div class="events-header">Events</div>
        <p id="logger"></p>
      </div>
    `;

    const loadAdBtn = this.shadowRoot.querySelector("#loadAdBtn");
    const showAdBtn = this.shadowRoot.querySelector("#showAdBtn");
    const destroyAdBtn = this.shadowRoot.querySelector("#destroyAdBtn");

    loadAdBtn.onClick = () => {
      if (window.Yabbi.canLoadAd(adType)) {
        this.addLog("Ad start to load.");
        window.Yabbi.loadAd(adType, placementName);
      } else {
        this.addLog("SDK can't start load ad.");
      }
    };

    showAdBtn.onClick = () => {
      if (window.Yabbi.isAdLoaded(adType)) {
        window.Yabbi.showAd(adType, placementName);
      } else {
        this.addLog("Ad is not loaded yet");
      }
    };

    destroyAdBtn.onClick = () => {
      window.Yabbi.destroyAd(adType, placementName);
      this.addLog("Ad was destroyed.");
    };
  }

  addLog(message) {
    const logger = this.shadowRoot.querySelector("#logger");
    if (logger) {
      const currentText = logger.textContent || "";
      const separator = currentText.length > 0 ? "\n" : "";
      logger.textContent = currentText + separator + "* " + message;
    }
  }
}

customElements.define("advert-component", Advert);
