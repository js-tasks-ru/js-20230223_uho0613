export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.initTable();
  }

  initTable() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.template;

    this.element = wrapper.firstElementChild;
  }

  get template() {
    return `<div data-element="productsContainer" class="products-list__container">
  <div class="sortable-table">
     ${this.header}
    <div data-element="body" class="sortable-table__body">
     ${this.getTableBody()}
    </div>

    <div data-element="loading" class="loading-line sortable-table__loading-line"></div>

    <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
      <div>
        <p>No products satisfies your filter criteria</p>
        <button type="button" class="button-primary-outline">Reset all filters</button>
      </div>
    </div>

  </div>
</div>`;
  }

  get header() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.getHeaderCells()}
    </div>`;
  }

  getTableBody() {
    let bodyResult = [];
    for (const config of this.data) {
      bodyResult.push((this.getProductRow(config)));
    }
    return bodyResult.join('');
  }

  getProductRow(productRowData) {
    return `<a href="#" class="sortable-table__row">
      ${this.getImageSell(productRowData)}
      <div class="sortable-table__cell">${productRowData.title}</div>

      <div class="sortable-table__cell">${productRowData.quantity}</div>
      <div class="sortable-table__cell">${productRowData.price}</div>
      <div class="sortable-table__cell">${productRowData.sales}</div>
    </a>`;
  }

  getImageSell(data) {
    return this.headerConfig[0].template(data);
  }

  getHeaderCells() {
    let headerResult = [];
    for (const config of this.headerConfig) {
      headerResult.push((`<div <div class="sortable-table__cell" data-id="${config.id}" data-sortable="${config.sortable}" data-order="asc">
        <span>${config.title}</span>
      </div>`));
    }
    return headerResult.join('');
  }

  sort(field, order) {

  }
}

