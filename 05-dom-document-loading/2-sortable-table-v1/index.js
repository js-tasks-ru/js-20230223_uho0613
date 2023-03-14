export default class SortableTable {
  subElements = [];
  currentSorting = null;
  currentOrder = 'asc';

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = [...data];
    this.initTable();
  }

  initTable() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.template;

    this.element = wrapper.firstElementChild;
    this.subElements = this.getSubElements();
  }

  get template() {
    return `<div data-element="productsContainer" class="products-list__container">
  <div class="sortable-table">
     ${this.header}
     ${this.getTableBody()}
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
    return `<div data-element="body" class="sortable-table__body">
      ${bodyResult.join('')}
    </div>`;
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
    if (typeof this.headerConfig[0].template === "function") {
      return this.headerConfig[0].template(data);
    }
    return '';
  }

  getHeaderCells() {
    let headerResult = [];
    for (const config of this.headerConfig) {
      headerResult.push((`<div <div class="sortable-table__cell" data-id="${config.id}" data-sortable="${config.sortable}" data-order="${this.currentOrder}">
        <span>${config.title}</span>
        ${this.getArrow(config.id)}
      </div>`));
    }
    return headerResult.join('');
  }

  getArrow(sortingField) {
    if (this.currentSorting === sortingField) {
      return `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`;
    }
    return '';
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

  sort(field, order) {
    this.currentSorting = field;
    this.currentOrder = order;
    this.sortData(field, order);
    this.subElements.body.innerHTML = this.getTableBody();
    this.subElements.header.innerHTML = this.getHeaderCells();
    throw new Error(`unknown type for sorting`);
  }

  sortData(field, order) {
    const action = {
      'asc': 1,
      'desc': -1
    };

    const sortType = this.headerConfig.find(item => item['id'] === field)['sortType'];
    if (sortType === 'number') {
      this.data.sort(function (a, b) {
        return action[order] * (a[field] - b[field]);
      });
      return;
    }

    if (sortType === 'string') {
      const collator = new Intl.Collator(['ru-RU', 'en-EN'], {
        caseFirst: 'upper',
        sensitivity: "variant"
      });
      this.data.sort((a, b) => action[order] * collator.compare(a[field], b[field]));
      return;
    }
    throw new Error(`unknown type  ${sortType}`);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.subElements = [];
    this.currentSorting = null;
    this.currentOrder = 'asc';
    this.remove();
  }
}

