class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["title", "show-back-button"];
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
    const title = this.getAttribute("title") || "";
    const showBackButton =
      !this.hasAttribute("show-back-button") ||
      this.getAttribute("show-back-button") !== "false";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          height: 60px; /* Резервирует место для AppBar */
        }
        /* Блок-отступ, который занимает пространство AppBar в потоке документа */
        .spacer {
          height: 60px;
        }
        .app-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          font-family: sans-serif;
          color: #000;
        }
        .side {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
        }
        .back-button {
          cursor: pointer;
          font-size: 28px;
          line-height: 1;
        }
        .title {
          flex: 1;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
        }
      </style>
      <div class="spacer"></div>
      <div class="app-bar">
        <div class="side">
          ${
            showBackButton
              ? `<div class="back-button" id="backBtn">◀</div>`
              : ""
          }
        </div>
        <div class="title">${title}</div>
        <div class="side"></div>
      </div>
    `;

    if (showBackButton) {
      this.shadowRoot
        .querySelector("#backBtn")
        .addEventListener("click", () => {
          history.back();
        });
    }
  }
}

customElements.define("app-bar", AppBar);
