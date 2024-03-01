class Client {
	constructor(
		clientNumber,
		firstName,
		lastName,
		email,
		phoneNumber,
		roleId,
		username,
		companyName,
		companyAddress,
		docControl,
		password
	) {
		this._clientNumber = clientNumber;
		this._firstName = firstName;
		this._lastName = lastName;
		this._email = email;
		this._phoneNumber = phoneNumber;
		this._roleId = roleId;
		this._username = username;
		this._companyName = companyName;
		this._companyAddress = companyAddress;
		this._docControl = docControl;
		this._password = password;
	}

	get clientNumber() {
		return this._clientNumber;
	}

	set clientNumber(value) {
		this._clientNumber = value;
	}

	get firstName() {
		return this._firstName;
	}

	set firstName(value) {
		this._firstName = value;
	}

	get lastName() {
		return this._lastName;
	}

	set lastName(value) {
		this._lastName = value;
	}

	get email() {
		return this._email;
	}

	set email(value) {
		this._email = value;
	}

	get phoneNumber() {
		return this._phoneNumber;
	}

	set phoneNumber(value) {
		this._phoneNumber = value;
	}

	get roleId() {
		return this._roleId;
	}

	set roleId(value) {
		this._roleId = value;
	}

	get username() {
		return this._username;
	}

	set username(value) {
		this._username = value;
	}

	get companyName() {
		return this._companyName;
	}

	set companyName(value) {
		this._companyName = value;
	}

	get companyAddress() {
		return this._companyAddress;
	}

	set companyAddress(value) {
		this._companyAddress = value;
	}

	get docControl() {
		return this._docControl;
	}

	set docControl(value) {
		this._docControl = value;
	}

	get password() {
		return this._password;
	}

	set password(value) {
		this._password = value;
	}
}

export { Client };
