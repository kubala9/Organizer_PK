import angular from 'angular';

class App {
  constructor($rootScope, $localStorage, $state, Uzytkownik) {
      "ngInject";

      $rootScope.zalogowany = Uzytkownik.pobierzWszystkich()[0];
      $rootScope.zalogowany.manager = 1;
      $rootScope.zalogowany.uzytkownik = 1;

      $state.go('organizer.projekt');

      if (!angular.isArray($localStorage.uzytkownik)) {
          $localStorage.uzytkownik = [
              {
                  id: 1,
                  login: 'dami95',
                  haslo: '123123',
                  name: 'Damian Lewita',
                  email: 'boss@sggw.pl',
                  telefon: '791555333',
                  dane: 'Front-End Developer Webankieta'
              }
          ];
      }

      if (!angular.isArray($localStorage.klient)) {
          //  this.Klient = Klient;
            //this.firstInitKlient();
      }

  }


  firstInitUzytkownik() {
    let uzytkownik2 = {
        login: 'kubala',
        haslo: '123123',
        name: 'Jakub Michniewski',
        email: 'kuba@sggw.pl',
        telefon: '721888999',
        dane: 'Junior Front-End Developer',
        id_manager: 2
    };
      
      let uzytkownik3 = {
        login: 'kompomaster',
        haslo: '123123',
        name: 'Maciej Janowicz',
        email: 'komponent@poczta.pl',
        telefon: '781222333',
        dane: 'SGGW Master of Component Programming',
        id_manager: 4
    };
    this.Uzytkownik.nowy(uzytkownik2);
    this.Uzytkownik.nowy(uzytkownik3);
  }

  firstInitKlient() {
    let klient1 = {
        id_user: 1,
        nazwa: 'Jan Kowalski',
        email: 'janek@poczta.pl',
        telefon: '791999468',
        adres: 'Jagodowa 3, Warszawa'
    };

    let klient2 = {
        id_user: 1,
        nazwa: 'WebAnkieta',
        email: 'admin@ankieta.pl',
        telefon: '781222333',
        adres: 'Ryżowa 49, Warszawa'
    };

    let klient3 = {
        id_user: 1,
        nazwa: 'Polsat',
        email: 'admin@polsat.pl',
        telefon: '666211322',
        adres: 'Sienkiewicza 4, Wrocław'
    };
    this.Klient.nowy(klient1);
    this.Klient.nowy(klient2);
    this.Klient.nowy(klient3);
  }
 
}

export const main = {
  template: require('./main.html'),
  controller: App
};
