import angular from 'angular';

class Kupujacy {
    constructor($localStorage) {
        "ngInject";

        this.listakupujacych = [];

        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.kupujacy)) {
                this.listakupujacych = $localStorage.kupujacy;
            }
        };

        this.zapisz = function zapisz() {
            if (angular.isArray(this.listakupujacych)) {
                $localStorage.kupujacy = this.listakupujacych;
            }
        };

        this.nowy = function nowy(kupujacy) {
            if (this.listakupujacych.length) {
                kupujacy.id = this.listakupujacych[this.listakupujacych.length - 1].id + 1;
            } else {
                kupujacy.id = 1;
            }

            this.listakupujacych.push(kupujacy);

            this.zapisz();

            return true;
        };

        this.edytuj = function edytuj(kupujacy) {
            var i = this.listakupujacych.findIndex((element, index, array) => element.id === kupujacy.id);
            if (i === -1) {
                return false;         
            }
            this.listakupujacych[i] = kupujacy;

            this.zapisz();
            return true;
        };

        this.usun = function usun(kupujacy) {
            var i = this.listakupujacych.findIndex((element, index, array) => element.id === kupujacy.id);
            if (i === -1) {
                return false;         
            }
            this.listakupujacych.splice(i, 1);

            this.zapisz();
            return true;
        };

        this.wczytaj();
    }

    pobierz() {
        this.wczytaj();
        return this.listakupujacych;
    }

    getKlient(id) {
        var i = this.listakupujacych.findIndex((element, index, array) => element.id === id);
        if (i === -1) {
            return false;
        }

        return this.listakupujacych[i];
    }

}

export default Kupujacy;
