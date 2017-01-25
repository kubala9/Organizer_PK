# Developerator
##Demo:
Aplikację można przetestować pod adresem: http://dzienniczek.home.pl/developerator/

##O projekcie:
Developerator to aplikacja internetowa, wykonana w języku Javascript, z użyciem Angular, NodeJS, Sass oraz Gulp. 
Aplikacja ma pomóc osobie zarządzającej projektami (Projekt Manager) w organizacji pracy. Każdy Project Manager posiada indywidualne konto, na którym może:

- zarządzać pracownikami (zakładka PRACOWNICY), czyli dodawać podwładnych pod siebie pracowników nadając im login i hasło specyficzne dla siebie np. manager_worker1, manager_worker2 etc., może ich edytować oraz usuwać.

- zarządzać klientami (zakładka KLIENCI) - podobnie jak w przypadku pracowników, może dodawać/usuwać/edytować klientów, z którymi prowadzi współpracę.

- zarządzać projektami (zakładka PROJEKTY) - tu skupia się najważniejsza część aplikacji. Project Manager po przejściu do zakładki PROJEKTY, widzi po prawej stronie listę projektów, gdzie wybiera dany klikająć na checkbox przy nazwie projektu lub dodaje nowy projekt. Aby dodać nowy projekt należy wpisać jego nazwę, opis,  klienta, dla którego projekt jest wykonywany, datę zakończenia(deadline) oraz można zaznaczyć wykonanie projektu (projekty zrealizowane trafiają do archiwum). Gdy już wybierzemy dany projekt z listy projektów, po środku wyświetla się lista zadań związana z danym projektem. Możemy dodać nowe zadanie, gdzie wpisujemy nazwę, opis, datę deadline oraz pracownika, któremu powierzamy to zadanie. Zadania wyświetlają się w 5ciu kolorach w zależności od czasu pozostałego do deadline'a:
* kolor domyślny (biały) - zadanie wykonane
* kolor zielony - powyżej tygodnia do deadline
* kolor żółty - od 7 do 2 dni do deadline
* kolor pomarańczowy - od 2 do 0 dni do deadline
* kolor czerwony - deadline został przekroczony

- podglądać swoje zadania (zakładka MOJE ZADANIA) - w zakładce MOJE ZADANIA, dostępnej również dla Pracownika, można podejrzeć swoje zadania oraz odhaczyć ich wykonanie. W przeglądaniu zadań pomocny jest filtr zadań wykonanych i niewykonanych.

- dodawać notatki (zakładka NOTATKI) - podgląd, dodawanie, edycja i usuwanie notatek. Opcja dostępna dla wszystkich użytkowników.


##Technologia:
* http://yeoman.io/
* https://angularjs.org/
* http://gulpjs.com/

Cała aplikacja znajduje się w folderze src.
Aplikacja jest zaprojektowana zgodnie z wzorcem MVC (Model-View-Controller). Język JavaScript nie oddaje w sposób bezpośredni komponentowości tej aplikacji, jednak łatwo można wyodrębnić komponenty (controllers), które korzystają z interfejsów (services). Interfejs graficzny znajduje się w folderach "views" oraz "layout".
Dokumentacja znajduje się w folderze docs.



