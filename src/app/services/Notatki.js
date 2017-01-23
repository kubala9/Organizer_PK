import angular from 'angular';

class Notatki {
    constructor($localStorage, $rootScope) {
        "ngInject";

        this.listanotatek = [];
        this.id = $rootScope.zalogowany.id;

        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.notatki)) {
                this.listanotatek = $localStorage.notatki;
            }
        };

        this.zapisz = function zapisz() {
            if (angular.isArray(this.listanotatek)) {
                $localStorage.notatki = this.listanotatek;
            }
        };

        this.wczytaj();
    }

    nowy(notatki) {
        if (this.listanotatek.length === 0) {
            notatki.id = 1;
        } else {
            notatki.id = this.listanotatek[this.listanotatek.length - 1].id + 1;
        }

        notatki.id_user = this.id;
        notatki.data = new Date().getTime();

        this.listanotatek.push(notatki);
        this.zapisz();

        return true;
    }

    pobierz() {
        this.wczytaj();
        return this.listanotatek.filter(el => el.id_user === this.id);
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
