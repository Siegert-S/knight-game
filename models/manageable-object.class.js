class ManageableObject {
    objectIntervalls = [];
    id;

    constructor() {
        if (!this.constructor.storage) {
            this.constructor.storage = [];
        }
        this.constructor.storage.push(this);
        this.createID();
    }

    createID() {
        let date = new Date;
        this.id = date.getTime();
    }

    static produce(...args) {
        let instanz = new this(...args);
    }

    deleteSelf() {
        let index = this.constructor.storage.indexOf(this);
        this.deleteAllIntervalls();
        this.constructor.storage.splice(index, 1);
    }

    setAndSaveIntervall(fn, ms) {
        let id = setInterval(fn, ms);
        this.objectIntervalls.push(id);
        // return id;
    }

    deleteAllIntervalls() {
        this.objectIntervalls.forEach(clearInterval);
    }
}