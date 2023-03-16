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
    return `<div class="sortable-table">
     ${this.header}
     ${this.getTableBody()}</div>`;
  }

  get header() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.getHeaderCells()}
    </div>`;
  }

  getTableBody() {
    const bodyResult = this.data.map((item) => {
      return this.getProductRow(item);
    });

    return `<div data-element="body" class="sortable-table__body">
      ${bodyResult.join('')}
    </div>`;
  }

  getProductRow(productRowData) {
    const headerConfig = [...this.headerConfig];
    const resultCells = headerConfig.map((config) => {
      return typeof config.template === 'function' ?
        config.template(productRowData) : ` <div class="sortable-table__cell">${productRowData[config['id']]}</div>`;
    });
    return `<a href="/products/${productRowData['id']}" class="sortable-table__row">
      ${resultCells.join('')}
    </a>`;
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

