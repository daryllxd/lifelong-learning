# Web Components in Angular

- Adding to Angular: `schemas: [ CUSTOM_ELEMENTS_SCHEMA ]` or in the `NgModule`.
- [Reference](https://stackoverflow.com/questions/58699483/when-to-use-no-errors-schema-and-custom-elements-schema)
- `// @ts-nocheck` at the top of a File to avoid TS for the entire file.

# Web Components Basics and Performance Benefits
[Reference](https://medium.com/@spkamboj/web-components-basics-and-performance-benefits-f7537c908075)

- All major browsers support native Web Components.
- Benefits:
  - No need framework, better on performance, natively supported by browsers, and share-able.
- Three specifications:
  - Custom element, HTML template, shadow DOM.
```
<content-card
 text="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
 image="https://source.unsplash.com/random/300x174">
</content-card>
```
- Registering the custom element:

```
const template = document.createElement("template");
template.innerHTML = `
  <div>
    <img width="300" height="174" src="" alt="" />
    <p class="text"></p>
  </div>
  <style> <------- Styling
  .text {
    color: red;
  }
  </style>
  `;

customElements.define("content-card", class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // @ts-ignore
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log(this);
    let imageElement = this.shadowRoot.querySelector("img");
    let textElement = this.shadowRoot.querySelector(".text");

    if (this.getAttribute('text')) {
      textElement.innerText = this.getAttribute("text");
    } else {
      textElement.innerText = "Default";
    }

    imageElement.src = this.getAttribute("image");
  }
});
```

- CSS - compartmentalised to just that component. But, that component cannot be styled from outside, either by SCSS or by Tailwind.

## But Why?

- Performance (vs React components).
- Web components vs React components: CPU spends 7 times more CPU time in JS compared to web component page. React, the additional CPU cost comes from JS bundles.

# Why I don't use web components
[Reference](https://dev.to/richharris/why-i-don-t-use-web-components-2cia)

- Progressive enhancement - websites should work without JS wherever possible. Web components don't.
- Platform fatigue.
- Polyfills to support all browsers.
- Composition - eagerly loaded, not lazily loaded.
- Props vs attributes confusion.
- Global namespace.
- This is a solved problem already!

# Random things

- `Array.from` is different from `Array.fill` (`Array.fill` copies the reference, `from` is by value.
