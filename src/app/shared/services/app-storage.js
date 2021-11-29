/**
 * App Storage class
 */
export class AppStorage {
    //CAN PASS SESSION STORAGE AS PARAMETER
    constructor(storage) {
        this.storage = storage || window.localStorage;

        /** Is storage is supported or not */
        if (!this.isSupported()) {
            throw new Error('Storage is not supported by browser!');
        }
    }

    setItem(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    }

    getItem(key) {
        return JSON.parse(this.storage.getItem(key));
    } 
    
    removeItem(key) {
        this.storage.removeItem(key);
    }

    /**
     * @description Check for storage support
     * @returns {boolean} supported
     * */
    isSupported() {
        let supported = true;

        if (!this.storage) {
            supported = false;
        }

        return supported;
    }
}

const appLocalStorage = new AppStorage();

export { appLocalStorage };