/**
 * Created by honoka on 16/4/24.
 */
export default class EventUtil {
  addHandler (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  }

  getEvent (event = window.event) {
    return event;
  }

  getTarget (event) {
    return event.target || event.srcElement;
  }
}