class Package {
	constructor(
		packageNumber,
		clientNumber,
		staffId,
		staffAssigned,
		documentName,
		reviewerNote,
		codeStatus,
		dateCompleted,
		internalComment,
		externalComment,
		serviceId
	) {
		this._packageNumber = packageNumber;
		this._clientNumber = clientNumber;
		this._staffId = staffId;
		this._staffAssigned = staffAssigned;
		this._documentName = documentName;
		this._reviewerNote = reviewerNote;
		this._codeStatus = codeStatus;
		this._dateCompleted = dateCompleted;
		this._internalComment = internalComment;
		this._externalComment = externalComment;
		this._serviceId = serviceId;
	}

	get packageNumber() {
		return this._packageNumber;
	}

	set packageNumber(value) {
		this._packageNumber = value;
	}

	get clientNumber() {
		return this._clientNumber;
	}

	set clientNumber(value) {
		this._clientNumber = value;
	}

	get staffId() {
		return this._staffId;
	}

	set staffId(value) {
		this._staffId = value;
	}

	get staffAssigned() {
		return this._staffAssigned;
	}

	set staffAssigned(value) {
		this._staffAssigned = value;
	}

	get documentName() {
		return this._documentName;
	}

	set documentName(value) {
		this._documentName = value;
	}

	get reviewerNote() {
		return this._reviewerNote;
	}

	set reviewerNote(value) {
		this._reviewerNote = value;
	}

	get codeStatus() {
		return this._codeStatus;
	}

	set codeStatus(value) {
		this._codeStatus = value;
	}

	get dateCompleted() {
		return this._dateCompleted;
	}

	set dateCompleted(value) {
		this._dateCompleted = value;
	}

	get internalComment() {
		return this._internalComment;
	}

	set internalComment(value) {
		this._internalComment = value;
	}

	get externalComment() {
		return this._externalComment;
	}

	set externalComment(value) {
		this._externalComment = value;
	}

	get serviceId() {
		return this._serviceId;
	}

	set serviceId(value) {
		this._serviceId = value;
	}
}

export { Package };
