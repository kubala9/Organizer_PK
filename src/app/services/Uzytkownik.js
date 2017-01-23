import angular from 'angular';

class Uzytkownik {
    constructor($localStorage, $rootScope) {
        "ngInject";

        this.listauzytkownikow = [];

        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.uzytkownik)) {
                this.listauzytkownikow = $localStorage.uzytkownik;
            }
        };

        this.zapisz = function zapisz() {
            if (angular.isArray(this.listauzytkownikow)) {
                $localStorage.uzytkownik = this.listauzytkownikow;
            }
        };

        this.wczytaj();

        this.nowy = (uzytkownik, manager) => {
            if (this.listauzytkownikow.length === 0) {
                uzytkownik.id = 1;
            } else {
                uzytkownik.id = this.listauzytkownikow[this.listauzytkownikow.length - 1].id + 1;
            }
            if (!angular.isDefined(manager)) {
                uzytkownik.id_manager = $rootScope.zalogowany.id;
            }

            this.listauzytkownikow.push(uzytkownik);
            this.zapisz();

            return true;
        };

        this.pobierz = () => {
            this.wczytaj();

            return this.listauzytkownikow.filter(item => {
                return angular.isDefined(item.id_manager) && item.id_manager === $rootScope.zalogowany.id;
            });
        };
    }



    pobierzWszystkich() {
        this.wczytaj();

        return this.listauzytkownikow;
    }

    edytuj(uzytkownik) {
        var i = this.listauzytkownikow.findIndex((element, index, array) => element.id === uzytkownik.id);

        if (i === -1) {
            return false;
        }

        this.listauzytkownikow[i] = uzytkownik;
        this.zapisz();

        return true;
    }

    usun(uzytkownik) {
        var i = this.listauzytkownikow.indexOf(uzytkownik);
        if (i === -1) {
            return false;
        }

        this.listauzytkownikow.splice(i, 1);
        this.zapisz();

        return true;
    }
}

export default Uzytkownik;
