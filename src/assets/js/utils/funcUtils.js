import moment from 'moment';
import $ from "jquery";
import * as ConstantUtils from "~/assets/js/utils/constantUtils";

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function webGlId() {
  String.prototype.hashCode = function () {
    let hash = 0;
    if (this.length === 0)
      return hash;
    for (let i = 0; i < this.length; i++) {
      let character = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + character;
      hash = hash & hash;
    }
    return hash;
  };
  let canvas = $('<canvas />', {width: '1', height: '1'}).appendTo('body');
  let gl = canvas[0].getContext("webgl");
  let sum = '';
  for (let a in gl) {
    if (gl.hasOwnProperty(a) && typeof gl[a] !== 'function') {
      sum += a + ':' + gl[a] + '\n';
    }
  }
  canvas.remove();
  return sum.hashCode();
}

export function isUndefined(obj) {
  return undefined === obj;
}

export function isNull(obj) {
  return null === obj;
}

export function isEmpty(obj) {
  return isUndefined(obj) || isNull(obj);
}

export function isNotEmpty(obj) {
  return !isUndefined(obj) && !isNull(obj);
}

export function addToLocalStorage(key, value) {
  if (isNotEmpty(key) && isNotEmpty(value)) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function addToSessionStorage(key, value) {
  if (isNotEmpty(key) && isNotEmpty(value)) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

export function getfromLocalStorage(key) {
  let res = null;
  let item = localStorage.getItem(key);
  if (isNotEmpty(item)) {
    res = JSON.parse(item);
  }
  return res;
}

export function getFromSessionStorage(key) {
  let res = null;
  let item = sessionStorage.getItem(key);
  if (isNotEmpty(item)) {
    res = JSON.parse(item);
  }
  return res;
}

export function lookupValue(dictName, key) {
  let res = {
    label: '',
    value: ''
  };
  let dict = ConstantUtils[dictName];
  for (let i = 0; i < dict.length; i++) {
    let object = dict[i];
    if (object.value == key) {
      return object;
    }
  }
  return res;
}

export function clearAll() {
  localStorage.removeItem('userName');
  localStorage.removeItem('auth');
  localStorage.removeItem('sid');
  localStorage.removeItem('lastActive');
  localStorage.removeItem('registerReestr');
  localStorage.removeItem('packageReestr');
  localStorage.removeItem('dictReestr');
  localStorage.removeItem('reportReestr');
  sessionStorage.removeItem('mainMenuActiveName');
  addToSessionStorage('path', [{routeName: 'Authorization', current: true}]);
}

export function parseDateTime(dateTime, format) {
  if (isEmpty(dateTime)) return '';
  return moment(dateTime).format(format);
}

export function formatDateTime(dateTime, format) {
  return moment(dateTime, format).toString();
}
