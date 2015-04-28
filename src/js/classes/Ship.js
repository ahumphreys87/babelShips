export class Ship {
    constructor(id, length) {
        this.id = id;
        this._length = length;
    }

    getLength() {
		return this._length;
	}
}
