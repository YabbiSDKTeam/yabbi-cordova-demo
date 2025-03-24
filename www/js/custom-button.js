class CustomButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._button = null;
    this._onClick = null;
    this.handleClick = this.handleClick.bind(this);
  }

  static get observedAttributes() {
    return ["title"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title" && this._button) {
      this._button.textContent = newValue || "Button";
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          width: 100%;
          background-color: #007AFF;
          color: #fff;
          border: none;
          padding: 12px;
          font-size: 16px;
          border-radius: 4px;
          cursor: pointer;
        }
      </style>
      <button>${this.getAttribute("title") || "Button"}</button>
    `;
    this._button = this.shadowRoot.querySelector("button");
    this._button.removeEventListener("click", this.handleClick);
    this._button.addEventListener("click", this.handleClick);
  }

  set onClick(callback) {
    if (typeof callback === "function") {
      this._onClick = callback;
    }
  }

  get onClick() {
    return this._onClick;
  }

  handleClick(event) {
    if (typeof this._onClick === "function") {
      this._onClick(event);
    }
  }
}

customElements.define("custom-button", CustomButton);
