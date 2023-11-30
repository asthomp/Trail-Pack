import isURL from "validator/lib/isURL";

// Given a string, tries to guess its potential category.
const categoryIconParser = function (category) {
  category = category.toLowerCase();
  if (
    category.includes("shelter") ||
    category.includes("tent") ||
    category.includes("hammock")
  ) {
    return "tent";
  } else if (
    category.includes("sleeping") ||
    category.includes("mattress") ||
    category.includes("sleeping pad") ||
    category.includes("foam")
  ) {
    return "sleep";
  } else if (category.includes("bear")) {
    return "bear";
  } else if (
    category.includes("pack") ||
    category.includes("bag") ||
    category.includes("sack")
  ) {
    return "storage";
  } else if (
    category.includes("clothing") ||
    category.includes("gloves") ||
    category.includes("socks") ||
    category.includes("boots") ||
    category.includes("bandanna") ||
    category.includes("gaiters")
  ) {
    return "clothing";
  } else if (
    category.includes("navigation") ||
    category.includes("gps") ||
    category.includes("map") ||
    category.includes("guide") ||
    category.includes("compass") ||
    category.includes("tide chart") ||
    category.includes("star chart")
  ) {
    return "compass";
  } else if (
    category.includes("water") ||
    category.includes("hydration") ||
    category.includes("drinking") ||
    category.includes("purification") ||
    category.includes("purifier") ||
    category.includes("filter") ||
    category.includes("filtration")
  ) {
    return "water";
  } else if (
    category.includes("food") ||
    category.includes("dehydrated") ||
    category.includes("meal") ||
    category.includes("snack") ||
    category.includes("breakfast") ||
    category.includes("lunch") ||
    category.includes("dinner") ||
    category.includes("eating") ||
    category.includes("calories") ||
    category.includes("kitchen") ||
    category.includes("utensils") ||
    category.includes("fuel") ||
    category.includes("stove") ||
    category.includes("jetboil") ||
    category.includes("silverware")
  ) {
    return "food";
  } else if (
    category.includes("medical") ||
    category.includes("first-aid") ||
    category.includes("first aid")
  ) {
    return "medical";
  } else if (category.includes("photography") || category.includes("camera")) {
    return "camera";
  } else if (
    category.includes("tool") ||
    category.includes("poles") ||
    category.includes("knife") ||
    category.includes("axe") ||
    category.includes("multi-tool") ||
    category.includes("multitool") ||
    category.includes("paddle") ||
    category.includes("boat") ||
    category.includes("binoculars") ||
    category.includes("kayak")
  ) {
    return "tools";
  } else if (
    category.includes("light") ||
    category.includes("lamp") ||
    category.includes("lantern")
  ) {
    return "light";
  } else if (category.includes("fire") || category.includes("matches")) {
    return "fire";
  } else if (category.includes("dental") || category.includes("toothbrush")) {
    return "dental";
  } else if (
    category.includes("hygiene") ||
    category.includes("bathroom") ||
    category.includes("pee") ||
    category.includes("poop") ||
    category.includes("wag bag") ||
    category.includes("toilet")
  ) {
    return "toiletpaper";
  } else if (category.includes("book") || category.includes("kindle")) {
    return "book";
  } else if (category.includes("bug")) {
    return "bug";
  } else if (
    category.includes("electronics") ||
    category.includes("phone") ||
    category.includes("batteries") ||
    category.includes("charger") ||
    category.includes("iphone") ||
    category.includes("watch") ||
    category.includes("monitor") ||
    category.includes("speakers") ||
    category.includes("headphones") ||
    category.includes("airpods") ||
    category.includes("computer") ||
    category.includes("tablet") ||
    category.includes("power") ||
    category.includes("radio")
  ) {
    return "electronics";
  } else if (
    category.includes("sunscreen") ||
    category.includes("upf") ||
    category.includes("spf")
  ) {
    return "sun";
  } else if (
    category.includes("crampons") ||
    category.includes("traction") ||
    category.includes("microspikes") ||
    category.includes("snow") ||
    category.includes("ski") ||
    category.includes("splitboard") ||
    category.includes("avalanche")
  ) {
    return "snow";
  } else if (
    category.includes("identification") ||
    category.includes("wallet") ||
    category.includes("money") ||
    category.includes("permit") ||
    category.includes("receipt") ||
    category.includes("reservation")
  ) {
    return "wallet";
  } else if (
    category.includes("climbing") ||
    category.includes("helmet") ||
    category.includes("carabiners") ||
    category.includes("ice pick") ||
    category.includes("ascend") ||
    category.includes("descend") ||
    category.includes("ropes") ||
    category.includes("belay") ||
    category.includes("rappel") ||
    category.includes("webbing") ||
    category.includes("bouldering") ||
    category.includes("slacklines") ||
    category.includes("chalk")
  ) {
    return "helmet";
  } else {
    return "folder";
  }
};

/// Converts a given weight value into ounces.
const convertWeight = function (value, unit) {
  if (
    unit === "pounds" ||
    unit === "pound" ||
    unit === "lb" ||
    unit === "lbs"
  ) {
    return Math.round((value * 16 + Number.EPSILON) * 100) / 100;
  }

  if (unit === "grams" || unit === "gram" || unit === "g") {
    return Math.round((value / 28.35 + Number.EPSILON) * 100) / 100;
  }

  return convertNum(value);
};

// Returns a list of the applications common categories.
const getCategoryList = () => [
  { title: "Bear Aware", icon: "bear" },
  { title: "Books & Guides", icon: "book" },
  { title: "Bug Protection", icon: "bug" },
  { title: "Clothing", icon: "clothing" },
  { title: "Dental", icon: "dental" },
  { title: "Electronics", icon: "electronics" },
  { title: "Fire Starting", icon: "fire" },
  { title: "Food", icon: "food" },
  { title: "Hydration", icon: "water" },
  { title: "Hygiene", icon: "toiletpaper" },
  { title: "Light", icon: "light" },
  { title: "Medical", icon: "medical" },
  { title: "Mountaineering", icon: "mountain" },
  { title: "Navigation", icon: "compass" },
  { title: "Storage", icon: "storage" },
  { title: "Photography", icon: "camera" },
  { title: "Documents & ID", icon: "wallet" },
  { title: "Shelter", icon: "tent" },
  { title: "Sleeping", icon: "sleep" },
  { title: "Snow Gear", icon: "snow" },
  { title: "Sun Safety", icon: "sun" },
  { title: "Tools", icon: "tools" },
  { title: "Other", icon: "folder" },
];

// Confirms a given string is a valid URL.
const validateURL = function (url) {
  if (url.length < 4) {
    return false;
  }
  if (url.substring(0, 4) !== "http") {
    url = "https://" + url;
  }

  return isURL(url);
};

// Remove URL Parameters
const removeURLTracking = function (url) {
  return url.replace(/\?.*/, "");
};

// Converts various units to their shorthand versions.
const weightUnitParser = function (unit) {
  if (unit === "ounce") {
    return "oz";
  } else if (unit === "gram") {
    return "g";
  } else if (unit.includes("pound")) {
    return "lbs";
  } else {
    return unit;
  }
};

// Converts various units to their shorthand versions.
const convertNum = function (num) {
  if (typeof num === "string") {
    return (Math.round(parseFloat(num) + Number.EPSILON) * 100) / 100;
  } else if (typeof num === "number") {
    return num;
  } else {
    return false;
  }
};

export {
  categoryIconParser,
  convertWeight,
  convertNum,
  getCategoryList,
  weightUnitParser,
  validateURL,
  removeURLTracking,
};
