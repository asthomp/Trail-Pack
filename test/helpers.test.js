// These tests evaluate the helper functions found in dataParser.js
import {
  assignCategoryIcon,
  convertOuncesToPounds,
  convertStrToNum,
  convertWeightToOunces,
  createRange,
  randomFromArray,
  removeItemID,
  removeURLTracking,
  sortArray,
  sumValues,
  validateURL,
  weightUnitParser,
} from "../utils/helpers";

// ASSIGN CATEGORY ICON FUNCTION
describe("assignCategoryIcon", () => {
  test("Identifies correct category", () => {
    // Test cases for different categories
    expect(assignCategoryIcon("Tent for Camping")).toEqual("tent");
    expect(assignCategoryIcon("Sleeping Bag")).toEqual("sleep");
    expect(assignCategoryIcon("Bear Repellent")).toEqual("bear");
    expect(assignCategoryIcon("Backpack")).toEqual("storage");
    expect(assignCategoryIcon("Hiking Boots")).toEqual("clothing");
    expect(assignCategoryIcon("GPS Navigation")).toEqual("compass");
    expect(assignCategoryIcon("Water Purifier")).toEqual("water");
    expect(assignCategoryIcon("Dehydrated Food")).toEqual("food");
    expect(assignCategoryIcon("First Aid Kit")).toEqual("medical");
    expect(assignCategoryIcon("Digital Camera")).toEqual("camera");
    expect(assignCategoryIcon("Multi-Tool")).toEqual("tools");
    expect(assignCategoryIcon("LED Lantern")).toEqual("light");
    expect(assignCategoryIcon("Fire Matches")).toEqual("fire");
    expect(assignCategoryIcon("Toothbrush")).toEqual("dental");
    expect(assignCategoryIcon("Toilet Paper")).toEqual("toiletpaper");
    expect(assignCategoryIcon("Book for Camping")).toEqual("book");
    expect(assignCategoryIcon("Insect Repellent")).toEqual("bug");
    expect(assignCategoryIcon("Phone Charger")).toEqual("electronics");
    expect(assignCategoryIcon("Sunscreen SPF 50")).toEqual("sun");
    expect(assignCategoryIcon("Snowshoes")).toEqual("snow");
    expect(assignCategoryIcon("Wallet and ID")).toEqual("wallet");
    expect(assignCategoryIcon("Climbing Helmet")).toEqual("helmet");

    // Test case for the default "folder" category
    expect(assignCategoryIcon("Unknown Category")).toEqual("folder");
  });

  test("Is case-insensitive", () => {
    // Test case with mixed case
    expect(assignCategoryIcon("sLeEpInG pAd")).toEqual("sleep");
  });

  test("Handles multiple keywords", () => {
    // Test case with multiple keywords
    expect(assignCategoryIcon("Water Filtration System")).toEqual("water");
  });
});

// CONVERT STRING TO NUMBER FUNCTION
describe("convertStrToNum function", () => {
  test("Should convert a valid string to a number and round to two decimal places", () => {
    expect(convertStrToNum("123.456")).toBe(123.46);
    expect(convertStrToNum("5.6789")).toBe(5.68);
  });

  test("Should return the input number if it's already a number", () => {
    expect(convertStrToNum(42)).toBe(42);
    expect(convertStrToNum(-3.14)).toBe(-3.14);
  });

  test("Should return 0.0 for invalid inputs or empty strings", () => {
    expect(convertStrToNum("")).toBe(0.0);
    expect(convertStrToNum("abc")).toBe(0.0);
    expect(convertStrToNum(null)).toBe(0.0);
    expect(convertStrToNum(undefined)).toBe(0.0);
    expect(convertStrToNum({})).toBe(0.0);
  });
});

// CONVERT WEIGHT TO OUNCES FUNCTION
describe("convertWeightToOunces", () => {
  test("Converts pounds to ounces", () => {
    expect(convertWeightToOunces(1, "pound")).toBeCloseTo(16.0, 2);
  });

  test("Converts grams to ounces", () => {
    expect(convertWeightToOunces(1, "grams")).toBeCloseTo(0.03527396, 2);
  });

  test("Returns the original value for unsupported units", () => {
    expect(convertWeightToOunces(10, "kilograms")).toBe(10);
  });

  test("Throws an error for negative input values", () => {
    expect(() => {
      convertWeightToOunces(-5, "pounds");
    }).toThrowError("Input value cannot be negative.");
  });
});

// CONVERT WEIGHT FUNCTION
describe("convertOuncesToPounds", () => {
  test("Converts pounds to ounces", () => {
    expect(convertOuncesToPounds(16)).toBeCloseTo(1, 2);
  });

  test("Converts pounds to ounces", () => {
    expect(convertOuncesToPounds(8)).toBeCloseTo(0.5, 2);
  });

  test("Converts pounds to ounces", () => {
    expect(convertOuncesToPounds(24)).toBeCloseTo(1.5, 2);
  });

  test("Throws an error for negative input values", () => {
    expect(() => {
      convertOuncesToPounds(-5, "pounds");
    }).toThrowError("Input value cannot be negative.");
  });
});

// CREATE RANGE FUNCTION
describe("createRange", () => {
  test("createRange should generate a correct range of numbers", () => {
    expect(createRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  test("createRange should handle a single number range", () => {
    expect(createRange(3, 3)).toEqual([3]);
  });

  test("createRange should handle a negative range", () => {
    expect(createRange(-3, 2)).toEqual([-3, -2, -1, 0, 1, 2]);
  });
  test("Handles impossible range indexing", () => {
    expect(() => createRange(5, 2)).toThrowError(
      "Incorrect index; starting value should be less than the ending value",
    );
  });
});

// REMOVE ITEMID FUNCTION
describe("removeItemID", () => {
  test('removes "itemID" key from the object', () => {
    const inputObject = { itemID: 123, name: "Example" };
    const result = removeItemID(inputObject);
    expect(result).toEqual({ name: "Example" });
  });

  test('does not modify the object if "itemID" key is not present', () => {
    const inputObject = { name: "Example" };
    const result = removeItemID(inputObject);
    expect(result).toEqual({ name: "Example" });
  });

  test("handles an empty object", () => {
    const inputObject = {};
    const result = removeItemID(inputObject);
    expect(result).toEqual({});
  });

  // Test case 4: Should handle an object with other keys
  it("handles an object with other keys", () => {
    const inputObject = { age: 25, itemID: 456, name: "Example" };
    const result = removeItemID(inputObject);
    expect(result).toEqual({ age: 25, name: "Example" });
  });
});

//REMOVE URL TRACKING
describe("removeURLTracking", () => {
  test("Removes tracking parameters from a URL with query parameters", () => {
    const inputURL =
      "https://example.com/page?utm_source=test&utm_medium=email";
    const expectedURL = "https://example.com/page";
    expect(removeURLTracking(inputURL)).toBe(expectedURL);
  });

  test("Returns the original URL if no query parameters are present", () => {
    const inputURL = "https://example.com/page";
    expect(removeURLTracking(inputURL)).toBe(inputURL);
  });

  test("Handles URLs with multiple question marks by removing all query parameters", () => {
    const inputURL =
      "https://example.com/page?param1=value1&param2=value2&param3=value3";
    const expectedURL = "https://example.com/page";
    expect(removeURLTracking(inputURL)).toBe(expectedURL);
  });

  test("Handles URLs with no scheme and domain", () => {
    const inputURL = "/path/to/resource?query=value";
    const expectedURL = "/path/to/resource";
    expect(removeURLTracking(inputURL)).toBe(expectedURL);
  });
});

// SORT ARRAY FUNCTION
describe("sortArray", () => {
  test("sorts array by timestamp in descending order by default", () => {
    const inputArray = [
      { timestamp: { seconds: 3 } },
      { timestamp: { seconds: 1 } },
      { timestamp: { seconds: 2 } },
    ];
    const result = sortArray(inputArray, "timestamp");
    expect(result).toEqual([
      { timestamp: { seconds: 3 } },
      { timestamp: { seconds: 2 } },
      { timestamp: { seconds: 1 } },
    ]);
  });

  test("sorts array by product in ascending order", () => {
    const inputArray = [
      { product: "Banana" },
      { product: "Apple" },
      { product: "Orange" },
    ];
    const result = sortArray(inputArray, "product", "asc");
    expect(result).toEqual([
      { product: "Apple" },
      { product: "Banana" },
      { product: "Orange" },
    ]);
  });

  test("sorts array by category in descending order", () => {
    const inputArray = [
      { category: "Fruit" },
      { category: "Vegetable" },
      { category: "Dairy" },
    ];
    const result = sortArray(inputArray, "category", "desc");
    expect(result).toEqual([
      { category: "Vegetable" },
      { category: "Fruit" },
      { category: "Dairy" },
    ]);
  });

  test("sorts array by weight in ascending order", () => {
    const inputArray = [{ weight: 30 }, { weight: 20 }, { weight: 10 }];
    const result = sortArray(inputArray, "weight", "asc");
    expect(result).toEqual([{ weight: 10 }, { weight: 20 }, { weight: 30 }]);
  });

  test("sets a default time if no keys are provided", () => {
    const inputArray = [
      { product: "Banana" },
      { product: "Apple", timestamp: { seconds: 1 } },
      { product: "Orange", timestamp: { seconds: 2 } },
    ];
    expect(sortArray(inputArray)[0].timestamp.seconds).toBeCloseTo(
      new Date().getTime() / 1000,
      0,
    );
  });

  test('sets a default time if the "timestamp" is  selected', () => {
    const inputArray = [
      { product: "Banana" },
      { product: "Apple", timestamp: { seconds: 1 } },
      { product: "Orange", timestamp: { seconds: 2 } },
    ];
    expect(
      sortArray(inputArray, "timestamp", "asc")[0].timestamp.seconds,
    ).toBeCloseTo(new Date().getTime() / 1000, 0);
  });

  test('throws an error if "product" key is missing', () => {
    const inputArray = [
      { name: "Banana" },
      { name: "Apple" },
      { name: "Orange" },
    ];
    expect(() => sortArray(inputArray, "product", "asc")).toThrowError(
      'Sorting failed because "product" key is missing.',
    );
  });

  test('throws an error if "category" key is missing', () => {
    const inputArray = [
      { type: "Fruit" },
      { type: "Vegetable" },
      { type: "Dairy" },
    ];
    expect(() => sortArray(inputArray, "category", "desc")).toThrowError(
      'Sorting failed because "category" key is missing.',
    );
  });

  test('throws an error if "weight" key is missing', () => {
    const inputArray = [{ value: 30 }, { value: 20 }, { value: 10 }];
    expect(() => sortArray(inputArray, "weight", "asc")).toThrowError(
      'Sorting failed because "weight" key is missing.',
    );
  });
});
// SUM VALUES FUNCTION
describe("sumArray", () => {
  test("sumValues should return the correct sum for an array of numeric strings", () => {
    const result = sumValues(["1", "2", "3"]);
    expect(result).toBe(6);
  });

  test("sumValues should handle an empty array and return 0", () => {
    const result = sumValues([]);
    expect(result).toBe(0);
  });

  test("sumValues should handle an array with non-numeric strings and ignore them", () => {
    const result = sumValues(["1", "abc", "3", "xyz"]);
    expect(result).toBe(4); // 1 + 3 = 4
  });
});

// VALIDATE URL FUNCTION
describe("validateURL", () => {
  test("Validates a valid URL", () => {
    expect(validateURL("https://example.com")).toBe(true);
    expect(validateURL("https://amazon.com")).toBe(true);
    expect(validateURL("https://pbs.org")).toBe(true);
    expect(validateURL("https://a.com")).toBe(true);
    expect(validateURL("https://a.ai")).toBe(true);
  });

  test('Adds "https://" to a URL without a protocol', () => {
    expect(validateURL("example.com")).toBe(true);
    expect(validateURL("lala.org")).toBe(true);
    expect(validateURL(".org")).toBe(false);
  });

  test("Returns false for a URL with length less than 4 characters", () => {
    expect(validateURL("abc")).toBe(false);
    expect(validateURL("zzz")).toBe(false);
    expect(validateURL("111")).toBe(false);
    expect(validateURL("a")).toBe(false);
  });

  test("Returns false for an invalid URL", () => {
    expect(validateURL("abc")).toBe(false);
    expect(validateURL(".com")).toBe(false);
    expect(validateURL("my name")).toBe(false);
  });
});

// WEIGHT UNIT PARSER FUNCTION
describe("weightUnitParser", () => {
  test('Should return "oz" for input containing "ounce"', () => {
    expect(weightUnitParser("ounce")).toBe("oz");
    expect(weightUnitParser("OuNcE")).toBe("oz"); // case-insensitive
  });

  test('Should return "g" for input containing "gram"', () => {
    expect(weightUnitParser("gram")).toBe("g");
    expect(weightUnitParser("gRaM")).toBe("g"); // case-insensitive
  });

  test('Should return "lbs" for input containing "pound" or "lb"', () => {
    expect(weightUnitParser("pound")).toBe("lbs");
    expect(weightUnitParser("PouNd")).toBe("lbs"); // case-insensitive
    expect(weightUnitParser("lb")).toBe("lbs");
  });

  test("Should return the input unchanged for other units", () => {
    expect(weightUnitParser("kilogram")).toBe("kilogram");
    expect(weightUnitParser("asdf")).toBe("asdf");
  });

  test("Should throw errors for invalid input ", () => {
    expect(() => weightUnitParser("")).toThrowError(
      "Incorrect input; requires a valid string with at least 1 character",
    );

    expect(() => weightUnitParser(null)).toThrowError(
      "Incorrect input; requires a valid string with at least 1 character",
    );
    expect(() => weightUnitParser(undefined)).toThrowError(
      "Incorrect input; requires a valid string with at least 1 character",
    );
    expect(() => weightUnitParser(123)).toThrowError(
      "Incorrect input; requires a valid string with at least 1 character",
    );
    expect(() => weightUnitParser(1)).toThrowError(
      "Incorrect input; requires a valid string with at least 1 character",
    );
  });
});

// Test suite for randomFromArray function
describe("randomFromArray", () => {
  // Test case for a non-empty array
  test("Should return a random element from the array", () => {
    const inputArray = [1, 2, 3, 4, 5];
    const result = randomFromArray(inputArray);
    expect(inputArray).toContain(result);
  });

  test("Should return the original empty array", () => {
    const inputArray = [];
    const result = randomFromArray(inputArray);
    expect(result).toEqual(inputArray);
  });

  test("Should return the original falsy array", () => {
    const inputArray = null;
    const result = randomFromArray(inputArray);
    expect(result).toEqual(inputArray);
  });

  // Test case for undefined array
  test("Should return the original undefined array", () => {
    const inputArray = undefined;
    const result = randomFromArray(inputArray);
    expect(result).toEqual(inputArray);
  });
});
