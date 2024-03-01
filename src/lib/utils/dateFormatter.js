function convertDate(dateToConvert) {
	return `${dateToConvert.getFullYear()}-${padZero(dateToConvert.getMonth() + 1)}-${padZero(
		dateToConvert.getDate()
	)} ${padZero(dateToConvert.getHours())}:${padZero(dateToConvert.getMinutes())}:${padZero(
		dateToConvert.getSeconds()
	)}`;
}

function padZero(num) {
	return num < 10 ? `0${num}` : num;
}

function formatStringToDateOnly(stringDate) {
	const date = new Date(stringDate);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

function formatStringToDateTime(stringDate) {
	const date = new Date(stringDate);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export { convertDate, formatStringToDateOnly, formatStringToDateTime };
