export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('apteka', {
      url: '/',
      component: 'apteka',
      redirectTo: 'apteka.start'
    })
    .state('apteka.start', {
        url: 'start',
        component: 'start',
        data: {pageTitle: 'Start'}
    })
    .state('apteka.sprzedajacy', {
      url: 'sprzedający',
      component: 'obslugaSprzedajacy',
      data: {pageTitle: 'Sprzedający'}
    })
    .state('apteka.kupujacy', {
      url: 'kupujący',
      component: 'obslugaKupujacy',
      data: {pageTitle: 'Kupujący'}
    })
    .state('apteka.produkt', {
      url: 'produkt',
      component: 'obslugaProduktow',
      data: {pageTitle: 'Produkt'}
    })
    .state('apteka.zamowienie', {
      url: 'zamowienie',
      component: 'obslugaZamowien',
      data: {pageTitle: 'Zamówienie'}
    }).state('apteka.sprzedaz', {
      url: 'sprzedaz',
      component: 'obslugaSprzedazy',
      data: {pageTitle: 'Sprzedaż'}
  });
}