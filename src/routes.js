export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('');
  $urlRouterProvider.otherwise('organizer/start');

  $stateProvider
    .state('organizer', {
      url: '/',
      component: 'organizer',
      redirectTo: 'organizer.start'
    })
    .state('organizer.start', {
        url: 'start',
        component: 'start',
        data: {pageTitle: 'Start'}
    })
    .state('organizer.uzytkownik', {
      url: 'uzytkownik',
      component: 'obslugaUzytkownika',
      data: {pageTitle: 'Użytkownik'}
    })
    .state('organizer.klient', {
      url: 'klienci',
      component: 'obslugaKlienta',
      data: {pageTitle: 'Klient'}
    })
    .state('organizer.projekt', {
      url: 'projekty',
      component: 'obslugaProjektow',
      data: {pageTitle: 'Projekt'}
    })
    .state('organizer.moje-zadania', {
        url: 'moje-zadania',
        component: 'obslugaMoichZadan',
        data: {pageTitle: 'Moje zadania'}
    })
    .state('organizer.notatki', {
      url: 'notatki',
      component: 'obslugaNotatek',
      data: {pageTitle: 'Notatki'}
  });
}