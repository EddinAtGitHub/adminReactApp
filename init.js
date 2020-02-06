if(window && window.Storage) {
	Storage.prototype.saveObject = function (key, value) {
		
		this.setItem(key, JSON.stringify(value));
	}
	Storage.prototype.getObject = function (key) {
		let value = this.getItem(key);
		return JSON.parse(value) || null;
	}
}

