function findElement(arr, elem) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === elem) {
			return i; // Return the index of the first occurrence
		}
	}
	return -1; // Element not found
}

module.exports = findElement;
