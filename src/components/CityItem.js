export class CityItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const city = this.getAttribute("city") || "Ciudad";
    this.render(city);
  }

  render(city) {
    this.shadowRoot.innerHTML = `
      <style>
        .item {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          background: #f9f9f9;
          border-radius: 8px;
          margin: 6px 0;
          font-family: Arial, sans-serif;
          justify-content: space-between;
          border: 1px solid #ddd;
        }

        span {
          font-weight: 600;
        }

        button {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          transition: 0.2s;
        }

        button:hover {
          background: #c0392b;
        }
      </style>

      <div class="item">
        <span>${city}</span>
        <button id="deleteBtn">X</button>
      </div>
    `;

    // Evento para que la lista dinámica pueda borrar este item
    this.shadowRoot.querySelector("#deleteBtn")
      .addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("delete-item", {
          detail: { city },
          bubbles: true,
          composed: true
        }));
      });
  }
}

customElements.define("city-item", CityItem);