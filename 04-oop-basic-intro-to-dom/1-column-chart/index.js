export default class ColumnChart {
  chartHeight = 50;
  subElements = [];

  constructor({
    data = [],
    label = '',
    link = '',
    value = 0,
    formatHeading = () => `${value}`
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.formatHeading = formatHeading;

    this.render();
  }

  render() {

    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.template;

    this.element = wrapper.firstElementChild;
    if (this.data.length) {
      this.element.classList.remove('column-chart_loading');
    }
  }

  update(data = []) {
    this.data = data;
    this.getSubElements().body.innerHTML = this.getColumnBody();
  }

  getSubElements() {
    if (this.subElements.length) {
      return this.subElements;
    }
    const elements = this.element.querySelectorAll("[data-element]");
    for (const subElement of elements) {
      this.subElements[subElement.dataset.element] = subElement;
    }
    return this.subElements;
  }

  get template() {
    return `<div class="dashboard__chart_${this.label} column-chart_loading">
    <div class="column-chart" style="--chart-height: ${this.chartHeight}">
      <div class="column-chart__title">
        Total ${this.label}
        ${this.getLink()}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
        <div data-element="body" class="column-chart__chart">
          ${this.getColumnBody()}
        </div>
      </div>
    </div>
  </div>`;
  }
  getLink() {
    return this.link
      ? `<a class="column-chart__link" href="${this.link}">View all</a>`
      : "";
  }

  getColumnBody() {
    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;
    let htmlArray = [];
    for (const value of this.data) {
      let percent = (value / maxValue * 100).toFixed(0) + '%';
      htmlArray.push(`<div style="--value: ${Math.floor(value * scale)}" data-tooltip="${percent}"></div>`);
    }

    return htmlArray.join('');
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = {};
    this.subElements = {};
  }
}

