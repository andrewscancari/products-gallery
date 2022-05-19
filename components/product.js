const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import "./styles/products.css";
    @import "./styles/css-reset.css";
  </style>
  <div class="product">
    <img class="product__img" src="" alt="" />
    <div class="product__specs">
      <p class="product__name"></p>
      <p class="product__price"></p>
    </div>
  </div>`;

class ProductComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  updateData(attribute, value) {
    if (attribute === 'name') {
      this.shadowRoot.querySelector('img').alt = value;
      this.shadowRoot.querySelector('.product__name').innerText = value;
    }

    if (attribute === 'image') {
      this.shadowRoot.querySelector('img').src = value;
    }

    if (attribute === 'price') {
      this.shadowRoot.querySelector('.product__price').innerText = `$${value}`;
    }

    if (attribute === 'discount') {
      this.setDiscount(value)
    }
  }

  setDiscount(discountVl) {
    if (Number(discountVl)) {
      const discountEl = document.createElement('div');
      discountEl.setAttribute('class', 'product__price_off')
      discountEl.innerText = `SALE - $${discountVl}`;

      this.shadowRoot.querySelector('.product').appendChild(discountEl)
    } else {
      const discountEl = this.shadowRoot.querySelector('.product__price_off');

      if (discountEl) {
        discountEl.remove();
      }
    }
  }

  static get observedAttributes() {
    return ['name', 'price', 'image', 'discount'];
  }

  attributeChangedCallback(attribute, _oldVl, newValue) {
    this.updateData(attribute, newValue)
  }
}
window.customElements.define('product-component', ProductComponent);