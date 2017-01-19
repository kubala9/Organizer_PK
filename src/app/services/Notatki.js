import angular from 'angular';

class Notatki {
    constructor($localStorage) {
        "ngInject";

        this.lista = [];

        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.notatki)) {
                this.lista = $localStorage.notatki;
            }
        };

        this.zapisz = function zapisz() {
            if (angular.isArray(this.lista)) {
                $localStorage.notatki = this.lista;
            }
        };

        this.wczytaj();

        //@TODO defaultowe dane do firstRun
    }

    getPusty() {
        return {
            id: null,
            id_projektu: null,
            tresc: ''
        };
    }

    nowy(notatki) {
        if (this.lista.length === 0) {
            notatki.id = 1;
        } else {
            notatki.id = this.lista[this.lista.length - 1].id + 1;
        }

        notatki.data = new Date().getTime();
        this.lista.push(notatki);
        this.zapisz();

        return true;
    }

    pobierz() {
        this.wczytaj();

        return this.lista;
    }

    edytuj(notatki) {
        var i = this.lista.findIndex((element, index, array) => element.id === notatki.id);

        if (i === -1) {
            return false;
        }

        notatki.data = new Date().getTime();
        this.lista[i] = notatki;
        this.zapisz();

        return true;
    }

    usun(notatki) {
        var i = this.lista.indexOf(notatki);
        if (i === -1) {
            return false;
        }

        this.lista.splice(i, 1);
        this.zapisz();

        return true;
    }

   
}

export default Notatki;
