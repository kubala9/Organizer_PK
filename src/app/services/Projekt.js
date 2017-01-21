import angular from 'angular';

class Projekt {
    constructor($localStorage, $rootScope) {
        "ngInject";

<<<<<<< HEAD
        this.listaprojektow = [{
          nazwa: 'prodzekt',
          opis: 'trzeba zdazyc',
          klient: 1,
          archiwum: 0,
          termin: null
        },
                              {
          nazwa: 'progsdkt',
          opis: 'tsddazyc',
          klient: 1,
          archiwum: 0,
          termin: null
        }];
=======
        this.listaprojektow = [];
>>>>>>> 27898d5068f6ffa898e39ea80778cb090ce13e7b

        this.wczytaj = () => {
            if (angular.isDefined($localStorage.projekt)) {
                this.listaprojektow = $localStorage.projekt.filter(item => item.id_user === $rootScope.zalogowany.id);
            }
        };

        this.zapisz = () => {
            if (angular.isArray(this.listaprojektow)) {
                $localStorage.projekt = this.listaprojektow;
            }
        };

        this.wczytaj();

        this.nowy = projekt => {
            if (this.listaprojektow.length === 0) {
                projekt.id = 1;
            } else {
                projekt.id = this.listaprojektow[this.listaprojektow.length - 1].id + 1;
            }

            projekt.id_user = $rootScope.zalogowany.id;

            this.listaprojektow.push(projekt);
            this.zapisz();

            return true;
        };
    }

    pobierz(archiwum) {
        this.wczytaj();

        if (archiwum === 1) {
            return this.listaprojektow.filter(projekt => projekt.archiwum === 1).map(i => {
                i.termin = new Date(i.termin);
                return i;
            });
        } else {
            return this.listaprojektow.filter(projekt => projekt.archiwum !== 1).map(i => {
                i.termin = new Date(i.termin);
                return i;
            });
        }

    }

    edytuj(projekt) {
        var i = this.listaprojektow.findIndex((element, index, array) => element.id === projekt.id);

        if (i === -1) {
            return false;
        }

        this.listaprojektow[i] = projekt;
        this.zapisz();

        return true;
    }

    usun(projekt) {
        var i = this.listaprojektow.indexOf(projekt);
        if (i === -1) {
            return false;
        }

        this.listaprojektow.splice(i, 1);
        this.zapisz();

        return true;
    }

    getProjekt(id) {
        var i = this.listaprojektow.findIndex((element, index, array) => element.id === id);
        if (i === -1) {
            return false;
        }

        return this.listaprojektow[i];
    }

 
}

export default Projekt;
