import angular from 'angular';

class App {
  constructor() {
      "ngInject";
  }
}

export const main = {
  template: require('./main.html'),
  controller: App
};
