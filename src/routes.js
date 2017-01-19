export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

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
      url: 'klient',
      component: 'obslugaKlienta',
      data: {pageTitle: 'Klient'}
    })
    .state('organizer.projekt', {
      url: 'projekt',
      component: 'obslugaProjektu',
      data: {pageTitle: 'Projekt'}
    })
    .state('organizer.zadania', {
      url: 'zadania',
      component: 'obslugaZadan',
      data: {pageTitle: 'Zadanie'}
    }).state('organizer.notatki', {
      url: 'notatki',
      component: 'obslugaNotatek',
      data: {pageTitle: 'Notatki'}
  });
}