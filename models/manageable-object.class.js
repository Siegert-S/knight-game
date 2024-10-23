class ManageableObject {

    /**
    * Constructor for the class.
    * 
    * Initializes the class by checking if a storage array exists for the class, 
    * and if not, it creates one. Then it adds the current instance to the storage array.
    */
    constructor() {
        if (!this.constructor.storage) {
            this.constructor.storage = [];
        }
        this.constructor.storage.push(this);
    }

    /**
     * Static method to create an instance of the class.
     * 
     * @param {...any} args - Arguments that are passed to the constructor of the class.
     * @returns {void} This function does not return anything, but creates an instance of the class.
     */
    static produce(...args) {
        let instanz = new this(...args);
    }

    /**
    * Deletes the current instance from the class storage array.
    * 
    * Finds the index of the current instance in the storage array and removes it from the array if found.
    * 
    * @returns {void} This function does not return anything.
    */
    deleteSelf() {
        let index = this.constructor.storage.indexOf(this);
        if (index != -1) {
            this.constructor.storage.splice(index, 1);
        }
    }

}