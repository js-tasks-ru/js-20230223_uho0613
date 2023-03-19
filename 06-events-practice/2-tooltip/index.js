class Tooltip {
  element = null;
  instance = null;
  subSelectors = [];

  constructor() {
    if (this.instance !== null) {
      return this.instance;
    }
    this.initElement();
    this.initSubSelectors();
    this.actionForMoving = this.actionForMoving.bind(this);
    this.actionForOver = this.actionForOver.bind(this);
    this.actionForOut = this.actionForOut.bind(this);
    this.instance = this;
  }

  initialize() {
    this.subSelectors.forEach((item) => {
      item.addEventListener('pointerover', this.actionForOver);
    });
  }

  actionForOver(event) {
    this.element.hidden = false;
    event.target.addEventListener('pointermove', this.actionForMoving);
    event.target.addEventListener('pointerout', this.actionForOut);
    const closestElement = event.target.closest('[data-tooltip]');
    this.render(`${closestElement.dataset.tooltip}`);
  }

  actionForOut(event) {
    event.target.removeEventListener('pointermove', this.actionForMoving);
    this.element.hidden = true;
  }

  actionForMoving(event) {
    if (!event.clientY) {
      return;
    }
    this.element.style.cssText = "position:fixed";
    this.element.style.top = event.clientY + 'px';
    this.element.style.left = event.clientX + 'px';
  }

  render(string = '') {
    this.element.innerHTML = string;
    document.body.append(this.element);
  }

  initElement() {
    if (this.element !== null) {
      return this.element;
    }
    const elementWrapper = document.createElement('div');
    elementWrapper.innerHTML = `<div class="tooltip">This is tooltip</div>`;
    this.element = elementWrapper.firstElementChild;
    return this.element;
  }

  initSubSelectors() {
    this.subSelectors = document.body.querySelectorAll("[data-tooltip]");
  }

  remove() {
    if (this.element !== null) {
      this.element.remove();
      this.element = null;
    }
  }

  removeAllListeners() {
    this.subSelectors.forEach((item) => {
      item.removeListener('pointermove', this.actionForMoving);
      item.removeListener('pointerout', this.actionForOut);
      item.removeListener('pointerover', this.actionForOver);
    });
  }

  destroy() {
    this.removeAllListeners();
    this.instance = null;
    this.subSelectors = [];
    this.remove();
  }
}

export default Tooltip;
