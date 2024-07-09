// Assuming you have already imported your findElement function
const findElement = require("./function");

describe("findElement", () => {
	it("should return the correct index of an existing element", () => {
		const arr = [10, 20, 30, 40];
		expect(findElement(arr, 30)).toBe(2); // Element 30 is at index 2
	});

	it("should return -1 for a non-existing element", () => {
		const arr = [10, 20, 30, 40];
		expect(findElement(arr, 50)).toBe(-1); // Element 50 is not in the array
	});

	it("should handle an empty array", () => {
		const emptyArr = [];
		expect(findElement(emptyArr, 42)).toBe(-1); // Empty array, so result is -1
	});

	it("should handle non-numeric elements", () => {
		const arr = ["apple", "banana", "cherry"];
		expect(findElement(arr, "banana")).toBe(1); // Element 'banana' is at index 1
	});

	it("should handle duplicate elements", () => {
		const arr = [10, 20, 30, 20, 40];
		expect(findElement(arr, 20)).toBe(1); // First occurrence of 20 is at index 1
	});
});
