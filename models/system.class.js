class System {
    show='main';
    menu =[];
    world;

    constructor(){

    }

    loadMenu(){
        this.menu.push(new Menu('main'));
        this.menu.push(new Menu('settings'));       
        this.menu.push(new Menu('controlls'));
        this.menu.push(new Menu('legal'));
        this.menu.push(new Menu('game'));
        this.menu.push(new Menu('skills'));
    }

    renderCanvas(){
        // die schleifen die den ihalt des canvas rendert
    }

    switchingMenu(){
        // die funktion wechseld das angezeigte menu bzw das spiel
    }

    saveGame(){
        // funktion zum speichern des spielstandes
    }
}