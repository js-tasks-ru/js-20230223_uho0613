export default class NotificationMessage {

  constructor(message = '', {duration = 1000, type = 'default'} = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.initElement();
  }

  initElement() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.defaultElement;
    this.element = wrapper.firstElementChild;
  }

  show(targetElement = false) {
    if (targetElement !== false) {
      this.element = this.getUpdatedTemplate(targetElement);
    }
    console.log(this.element);
    document.body.innerHTML += this.getMessageTemplate();
    document.body.innerHTML += this.element;

    setTimeout(() => {
      this.destroy();
    }, this.duration);
  }

  getUpdatedTemplate(targetElement) {
    targetElement.classList.add(this.type);
    targetElement.classList.add('notification-body');
    targetElement.innerHTML = this.message;
    return targetElement;
  }

  get defaultElement() {
    return `<div class="notification-body ${this.type}">
        ${this.message}
      </div>`;
  }

  getMessageTemplate() {
    return `<div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
    </div>
  </div>`;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
  }
}
