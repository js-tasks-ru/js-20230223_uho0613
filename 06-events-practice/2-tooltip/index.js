class Tooltip {
  element = null;
  static instance = null;
  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
    this.initElement();
    Tooltip.instance = this;
  }

  initialize() {
    document.body.addEventListener('pointerover', this.actionForOver);
  }

  actionForOver = (event) => {
    const closestElement = event.target.closest('[data-tooltip]');
    if (!closestElement) {
      return;
    }
    this.element.hidden = false;
    closestElement.addEventListener('pointermove', this.actionForMoving);
    closestElement.addEventListener('pointerout', this.actionForOut);
    this.render(`${closestElement.dataset.tooltip}`);
  };

  actionForOut = (event) => {
    event.target.removeEventListener('pointermove', this.actionForMoving);
    this.element.hidden = true;
  };

  actionForMoving = (event) => {
    if (!event.clientY) {
      return;
    }
    this.element.style.cssText = "position:fixed";
    this.element.style.top = event.clientY + 'px';
    this.element.style.left = event.clientX + 'px';
  };

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

  remove() {
    if (this.element !== null) {
      this.element.remove();
      this.element = null;
    }
  }

  removeAllListeners() {
    const subSelectors = document.body.querySelectorAll("[data-tooltip]");
    subSelectors.forEach((item) => {
      item.removeListener('pointermove', this.actionForMoving);
      item.removeListener('pointerout', this.actionForOut);
      item.removeListener('pointerover', this.actionForOver);
    });
  }

  destroy() {
    this.removeAllListeners();
    Tooltip.instance = null;
    this.remove();
  }
}

export default Tooltip;
