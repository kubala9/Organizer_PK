import angular from 'angular';

class Klient {
    constructor($localStorage) {
        "ngInject";

        this.listaklientow = [];

        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.klient)) {
                this.listaklientow = $localStorage.klient;
            }
        };

        this.zapisz = function zapisz() {
            if (angular.isArray(this.listaklientow)) {
                $localStorage.klient = this.listaklientow;
            }
        };

        this.nowy = function nowy(klient) {
            if (this.listaklientow.length) {
                klient.id = this.listaklientow[this.listaklientow.length - 1].id + 1;
            } else {
                klient.id = 1;
            }

            this.listaklientow.push(klient);

            this.zapisz();

            return true;
        };

        this.edytuj = function edytuj(klient) {
            var i = this.listaklientow.findIndex((element, index, array) => element.id === klient.id);
            if (i === -1) {
                return false;         
            }
            this.listaklientow[i] = klient;

            this.zapisz();
            return true;
        };

        this.usun = function usun(klient) {
            var i = this.listaklientow.findIndex((element, index, array) => element.id === klient.id);
            if (i === -1) {
                return false;         
            }
            this.listaklientow.splice(i, 1);

            this.zapisz();
            return true;
        };

        this.wczytaj();
    }

    pobierz() {
        this.wczytaj();
        return this.listaklientow;
    }

    getKlient(id) {
        var i = this.listaklientow.findIndex((element, index, array) => element.id === id);
        if (i === -1) {
            return false;
        }

        return this.listaklientow[i];
    }

}

export default Klient;
