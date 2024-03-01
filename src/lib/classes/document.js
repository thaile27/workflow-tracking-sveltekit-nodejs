class Document {
	constructor(
		documentNumber,
		packageNumber,
		invoiceNumber,
		documentName,
		documentStatus,
		timeSpent,
		priority
	) {
		this._documentNumber = documentNumber;
		this._packageNumber = packageNumber;
		this._invoiceNumber = invoiceNumber;
		this._documentName = documentName;
		this._documentStatus = documentStatus;
		this._timeSpent = timeSpent;
		this._priority = priority;
	}

	get documentNumber() {
		return this._documentNumber;
	}

	set documentNumber(value) {
		this._documentNumber = value;
	}

	get packageNumber() {
		return this._packageNumber;
	}

	set packageNumber(value) {
		this._packageNumber = value;
	}

	get invoiceNumber() {
		return this._invoiceNumber;
	}

	set invoiceNumber(value) {
		this._invoiceNumber = value;
	}

	get documentName() {
		return this._documentName;
	}

	set documentName(value) {
		this._documentName = value;
	}

	get documentStatus() {
		return this._documentStatus;
	}

	set documentStatus(value) {
		this._documentStatus = value;
	}

	get timeSpent() {
		return this._timeSpent;
	}

	set timeSpent(value) {
		this._timeSpent = value;
	}

	get priority() {
		return this._priority;
	}

	set priority(value) {
		this._priority = value;
	}
}

export { Document };
