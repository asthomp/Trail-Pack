import isURL from "validator/lib/isURL";

import { getPresetCategoryKeywords } from "./categoryPresets";

// Given a string,checks for the presence of specific keywords and attempts to assign a corresponding category,
// returning the name of the react-paper-icon that represents that category.
// String comparison is not case-sensitive.
const assignCategoryIcon = function (category) {
  // Returns a list of the application's preset categories.
  const categories = getPresetCategoryKeywords();

  const lowerCategory = category.toLowerCase();

  for (const [categoryKey, keywords] of Object.entries(categories)) {
    if (keywords.some((keyword) => lowerCategory.includes(keyword))) {
      return categoryKey;
    }
  }

  return "folder";
};

// Given some input, attempts to parse strings to numbers; if it is not a number or cannot be parsed, returns 0.0
const convertStrToNum = function (num) {
  if (typeof num === "string" && num.length > 0) {
    const parsedNum = parseFloat(num);
    if (!Number.isNaN(parsedNum)) {
      return Math.round((parsedNum + Number.EPSILON) * 100) / 100;
    }
  } else if (typeof num === "number") {
    return num;
  }
  return 0.0;
};

// Converts a given weight value into ounces.
const convertWeight = function (value, unit) {
  if (value < 0) {
    throw new Error("Input value cannot be negative.");
  }

  const lowerCaseUnit = unit.toLowerCase();

  if (
    lowerCaseUnit === "pounds" ||
    lowerCaseUnit === "pound" ||
    lowerCaseUnit === "lb" ||
    lowerCaseUnit === "lbs"
  ) {
    return Math.round((value * 16 + Number.EPSILON) * 100) / 100; // Convert pounds to ounces (1 pound = 16 ounces)
  }

  if (
    lowerCaseUnit === "grams" ||
    lowerCaseUnit === "gram" ||
    lowerCaseUnit === "g"
  ) {
    return Math.round((value * 0.03527396 + Number.EPSILON) * 100) / 100; // Convert grams to ounces (1 gram = 0.03527396 ounces)
  }
  // If the unit is not recognized, assume it's already in ounces
  return value;
};

// Given two numbers, creates a range of numbers (inclusive).
const createRange = function (start, end) {
  if (start > end) {
    throw new Error(
      "Incorrect index; starting value should be less than the ending value",
    );
  }
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
};

// Removes the "itemID" key from an object; this field is stored in the database as a document ID, not as a field.
const removeItemID = function (item) {
  if ("itemID" in item) {
    delete item.itemID;
  }
  return item;
};

// Remove URL tracking parameters
const removeURLTracking = function (url) {
  return url.replace(/\?.*/, "");
};

// Sorts an array of objects and returns the newly sorted array.
// It needs to know the key to order the array by and the order (asc/desc).
function sortArray(array, orderBy = "timestamp", order = "asc") {
  // If the object passed is not an array or nothing was passed, just return it.
  if (
    array === null ||
    array === undefined ||
    typeof array === "undefined" ||
    array.length === undefined ||
    typeof array.length !== "number"
  ) {
    return array;
  }

  let comparator = undefined;
  switch (orderBy) {
    case "timestamp":
    default:
      array.forEach((x) => {
        if (!x.timestamp || !x.timestamp.seconds) {
          x["timestamp"] = { seconds: new Date().getTime() / 1000 };
        }
      });
      comparator = (a, b) => -(a.timestamp.seconds - b.timestamp.seconds);
      break;

    case "product":
      array.forEach((x) => {
        if (!x.product) {
          throw Error('Sorting failed because "product" key is missing.');
        }
      });
      if (order === "asc") {
        comparator = (a, b) => a.product.localeCompare(b.product);
      } else {
        comparator = (a, b) => -a.product.localeCompare(b.product);
      }
      break;
    case "category":
      array.forEach((x) => {
        if (!x.category) {
          throw Error('Sorting failed because "category" key is missing.');
        }
      });
      if (order === "asc") {
        comparator = (a, b) => a.category.localeCompare(b.category);
      } else {
        comparator = (a, b) => -a.category.localeCompare(b.category);
      }
      break;
    case "weight":
      array.forEach((x) => {
        if (!x.weight) {
          throw Error('Sorting failed because "weight" key is missing.');
        }
      });
      if (order === "asc") {
        comparator = (a, b) => a.weight - b.weight;
      } else {
        comparator = (a, b) => -(a.weight - b.weight);
      }
      break;
  }
  const newArray = Array.from(array);
  return newArray.sort(comparator);
}

// Confirms a given string is a valid URL
const validateURL = function (url) {
  if (!url || typeof url !== "string" || url.length < 4) {
    return false;
  }

  url = url.toLowerCase();
  if (url.substring(0, 4) !== "http") {
    url = "https://" + url;
  }

  return isURL(url);
};

// Converts various units to their shorthand versions
const weightUnitParser = function (unit) {
  if (!unit || typeof unit !== "string" || unit.length < 1) {
    // Catch null, undefined, not-a-string, or empty string
    throw new Error(
      "Incorrect input; requires a valid string with at least 1 character",
    );
  }

  const lowercaseUnit = unit.toLowerCase();

  if (lowercaseUnit === "ounce" || lowercaseUnit === "ounces") {
    return "oz";
  } else if (lowercaseUnit === "gram" || lowercaseUnit === "grams") {
    return "g";
  } else if (lowercaseUnit.includes("pound") || lowercaseUnit === "lb") {
    return "lbs";
  } else {
    return unit; // Return the original unit for other cases (ex: kilogram)
  }
};

export {
  assignCategoryIcon,
  convertWeight,
  convertStrToNum,
  createRange,
  removeItemID,
  removeURLTracking,
  sortArray,
  validateURL,
  weightUnitParser,
};
