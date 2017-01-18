class Notyfikacje {
    constructor($mdDialog, $mdToast) {
        this.dialog = $mdDialog;
        this.toast = $mdToast;
    }

    zamknij() {
        this.dialog.hide();
        this.toast.hide();
    }

    powiadomienie(tekst) {
        var toast = this.toast.simple()
            .textContent(tekst)
            .position('bottom right')
            .hideDelay(5000);

        return this.toast.show(toast);
    }

    potwierdzenie(tekst, ok, anuluj) {
        var dialog = this.dialog.confirm()
            .title(tekst)
            .ok(ok)
            .cancel(anuluj);

        return this.dialog.show(dialog);
    }

}

export default Notyfikacje;