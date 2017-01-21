import angular from 'angular';

import 'angular-ui-router';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'angular-material/angular-material.css';
import 'angular-material-icons';
import 'angular-messages';
import 'ngStorage';
import 'material-date-picker';

import routesConfig from './routes';

import {main} from './app/layout/main';
import {header} from './app/layout/header';
import {menu} from './app/layout/menu';
import {footer} from './app/layout/footer';

import './index.scss';

import {start} from './app/controllers/Start';

import Notyfikacje from './app/services/Notyfikacje';

import {obslugauzytkownika} from './app/controllers/ObslugaUzytkownika';
import Uzytkownik from './app/services/Uzytkownik';

import {obslugaklienta} from './app/controllers/ObslugaKlienta';
import Klient from './app/services/Klient';

import {obslugaprojektow} from './app/controllers/ObslugaProjektow';
import {obslugaprojektu} from './app/controllers/ObslugaProjektu';
import Projekt from './app/services/Projekt';

import {obslugazadan} from './app/controllers/ObslugaZadan';
import Zadania from './app/services/Zadania';

import {obsluganotatek} from './app/controllers/ObslugaNotatek';
import Notatki from './app/services/Notatki';

var app = angular
  .module('organizer', ['ui.router', 'ngMaterial', 'ngMdIcons', 'ngMessages', 'ngStorage'])
  .config(routesConfig)
  .component('organizer', main)
  .component('organizerHeader', header)
  .component('organizerMenu', menu)
  .component('organizerFooter', footer)

    .service('Notyfikacje', Notyfikacje)

    .component('start', start)

    .component('obslugaUzytkownika', obslugauzytkownika)
    .service('Uzytkownik', Uzytkownik)

    .component('obslugaKlienta', obslugaklienta)
    .service('Klient', Klient)

    .component('obslugaProjektow', obslugaprojektow)
    .component('obslugaProjektu', obslugaprojektu)
    .service('Projekt', Projekt)

    .component('obslugaZadan', obslugazadan)
    .service('Zadania', Zadania)

    .component('obslugaNotatek', obsluganotatek)
    .service('Notatki', Notatki)
    .config($mdThemingProvider => {
        $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('grey');
    })
    .run(($transitions, $rootScope, $state) => {
        $transitions.onStart({ }, function(trans) {
            $rootScope.currentNavItem = trans.$to().name;
        });

        if (!$rootScope.zalogowany) {
            $state.go('organizer.start');
        }
    });
