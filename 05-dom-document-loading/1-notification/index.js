export default class NotificationMessage {
  static currentObject = null;

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
    if (NotificationMessage.currentObject !== null) {
      NotificationMessage.currentObject.remove();
    }
    NotificationMessage.currentObject = this;

    if (targetElement !== false) {
      this.element = this.getUpdatedTemplate(targetElement);
    }
    document.body.append(this.getMessageTemplate());
    setTimeout(() => {
      this.remove();
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
    let templateWrapper = document.createElement('div');

    templateWrapper.innerHTML = `<div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      ${this.element.outerHTML}
    </div>
  </div>`;
    this.messageTemplate = templateWrapper.firstElementChild;
    return this.messageTemplate;
  }

  remove() {

    if (this.element) {
      this.element.remove();
    }
    if (this.messageTemplate) {
      this.messageTemplate.remove();
    }
  }

  destroy() {
    this.remove();
  }
}
