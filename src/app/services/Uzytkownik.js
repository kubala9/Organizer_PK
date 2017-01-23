import angular from 'angular';

class Uzytkownik {
    constructor($localStorage, $rootScope) {
        "ngInject";

        this.listauzytkownikow = [/*{
        login: 'dami95',
        haslo: '123123',
        imie: 'Damian',
        nazwisko: 'Lewita',
        email: 'boss@sggw.pl',
        telefon: '791555333',
        dane: 'Front-End Developer Webankieta'
    },
                      {
        login: 'kubala',
        haslo: '123123',
        imie: 'Jakub',
        nazwisko: 'Michniewski',
        email: 'kuba@sggw.pl',
        telefon: '721888999',
        dane: 'Junior Front-End Developer'
    }*/];
        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.uzytkownik)) {
                 var id = $rootScope.zalogowany.id;
                this.listauzytkownikow = $localStorage.uzytkownik.filter(el => el.id_user === id);
            }
        };

        this.zapisz = function zapisz() {
            if (angular.isArray(this.listauzytkownikow)) {
                $localStorage.uzytkownik = this.listauzytkownikow;
            }
        };

        this.wczytaj();
    }



    nowy(uzytkownik) {
        if (this.listauzytkownikow.length === 0) {
            uzytkownik.id = 1;
        } else {
            uzytkownik.id = this.listauzytkownikow[this.listauzytkownikow.length - 1].id + 1;
        }

        this.listauzytkownikow.push(uzytkownik);
        this.zapisz();

        return true;
    }

    pobierz() {
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

    getUzytkownik(id) {
        var i = this.listauzytkownikow.filter(element => element.id === id)[0];

        return this.listauzytkownikow[i];
    }
}

export default Uzytkownik;
