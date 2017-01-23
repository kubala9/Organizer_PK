import angular from 'angular';

class Notatki {
    constructor($localStorage, $rootScope) {
        "ngInject";

        this.listanotatek = [];
 
        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.notatki)) {              
             var id = $rootScope.zalogowany.id;
                this.listanotatek = $localStorage.notatki.filter(el => el.id_user === id);
            }
        };

        this.zapisz = function zapisz() {
            if (angular.isArray(this.listanotatek)) {
                $localStorage.notatki = this.listanotatek;
            }
        };

        this.wczytaj();

        //@TODO defaultowe dane do firstRun
    }

    getPusty() {
        return {
            id: null,
            tytul:'',
            tresc: '',
            data: ''
        };
    }

    nowy(notatki) {
        if (this.listanotatek.length === 0) {
            notatki.id = 1;
        } else {
            notatki.id = this.listanotatek[this.listanotatek.length - 1].id + 1;
        }

        notatki.data = new Date().getTime();
        this.listanotatek.push(notatki);
        this.zapisz();

        return true;
    }

    pobierz() {
        this.wczytaj();
        return this.listanotatek;
    }

    edytuj(notatki) {
        var i = this.listanotatek.findIndex((element, index, array) => element.id === notatki.id);

        if (i === -1) {
            return false;
        }

        notatki.data = new Date().getTime();
        this.listanotatek[i] = notatki;
        this.zapisz();

        return true;
    }

    usun(notatki) {
        var i = this.listanotatek.indexOf(notatki);
        if (i === -1) {
            return false;
        }

        this.listanotatek.splice(i, 1);
        this.zapisz();

        return true;
    }

   
}

export default Notatki;
