import angular from 'angular';

import 'angular-ui-router';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'angular-material/angular-material.css';
import 'angular-material-icons';
import 'angular-messages';
import 'ngStorage';

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

import {obslugaklienta} from './app/controllers/ObslugaKlienta.js';
import Klient from './app/services/Klient';

import {obslugaprojektu} from './app/controllers/ObslugaProjektu.js';
import Projekt from './app/services/Projekt';

import {obslugazadan} from './app/controllers/ObslugaZadan.js';
import Zadania from './app/services/Zadania';

import {obsluganotatek} from './app/controllers/ObslugaNotatek';
import Notatki from './app/services/Notatki';

angular
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

    .component('obslugaProjektu', obslugaprojektu)
    .service('Projekt', Projekt)

    .component('obslugaZadan', obslugazadan)
     .service('Zadania', Zadania)

    .component('obslugaNotatek', obsluganotatek)
    .service('Notatki', Notatki)

    .run(($transitions, $rootScope, $state) => {
        $transitions.onStart({ }, function(trans) {
            $rootScope.currentNavItem = trans.$to().name;
        });

        if (!$rootScope.zalogowany) {
            $state.go('organizer.start');
        }
    });