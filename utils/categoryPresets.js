// Returns string arrays associated with the application's preset categories; each category includes an icon
// and a title/label. Each icon is associated with several keywords.

// A set of preset categories and their titles/labels.
const getPresetCategories = () => [
  { icon: "bear", title: "Bear Aware" },
  { icon: "book", title: "Books & Guides" },
  { icon: "bug", title: "Bug Protection" },
  { icon: "clothing", title: "Clothing" },
  { icon: "dental", title: "Dental" },
  { icon: "electronics", title: "Electronics" },
  { icon: "fire", title: "Fire Starting" },
  { icon: "food", title: "Food" },
  { icon: "water", title: "Hydration" },
  { icon: "toiletpaper", title: "Hygiene" },
  { icon: "light", title: "Light" },
  { icon: "medical", title: "Medical" },
  { icon: "mountain", title: "Mountaineering" },
  { icon: "compass", title: "Navigation" },
  { icon: "storage", title: "Storage" },
  { icon: "camera", title: "Photography" },
  { icon: "wallet", title: "Documents & ID" },
  { icon: "tent", title: "Shelter" },
  { icon: "sleep", title: "Sleeping" },
  { icon: "snow", title: "Snow Gear" },
  { icon: "sun", title: "Sun Safety" },
  { icon: "tools", title: "Tools" },
  { icon: "folder", title: "Other" },
];

// Keywords assigned to each category icon.
const getPresetCategoryKeywords = () => {
  return {
    bear: ["bear"],
    book: ["book", "kindle"],
    bug: [
      "bug",
      "insect",
      "mosquito",
      "deet",
      "insect repellent",
      "citronella",
      "flies",
    ],
    camera: ["photography", "camera"],
    clothing: ["clothing", "gloves", "socks", "boots", "bandanna", "gaiters"],
    compass: [
      "navigation",
      "gps",
      "map",
      "guide",
      "compass",
      "tide chart",
      "star chart",
    ],
    dental: ["dental", "floss", "retainer", "tooth", "mouthwash", "toothbrush"],
    electronics: [
      "electronics",
      "phone",
      "batteries",
      "charger",
      "iphone",
      "watch",
      "monitor",
      "speakers",
      "headphones",
      "airpods",
      "computer",
      "tablet",
      "power",
      "radio",
    ],
    fire: ["fire", "matches", "flint", "tinder"],
    folder: ["default"],
    food: [
      "food",
      "dehydrated",
      "meal",
      "snack",
      "breakfast",
      "lunch",
      "dinner",
      "eating",
      "calories",
      "kitchen",
      "utensils",
      "fuel",
      "stove",
      "jetboil",
      "silverware",
    ],
    helmet: [
      "climbing",
      "helmet",
      "carabiners",
      "ice pick",
      "ascend",
      "descend",
      "ropes",
      "belay",
      "rappel",
      "webbing",
      "bouldering",
      "slacklines",
      "chalk",
    ],
    light: ["light", "lamp", "headlamp", "flashlight", "lantern"],
    medical: ["medical", "first-aid", "first aid"],
    sleep: ["sleeping", "mattress", "sleeping pad", "foam"],
    snow: [
      "crampons",
      "traction",
      "microspikes",
      "snow",
      "ski",
      "splitboard",
      "avalanche",
    ],
    storage: ["pack", "bag", "sack"],
    sun: ["sunscreen", "upf", "spf"],
    tent: ["shelter", "tent", "hammock"],
    toiletpaper: ["hygiene", "bathroom", "pee", "poop", "wag bag", "toilet"],
    tools: [
      "tool",
      "poles",
      "knife",
      "axe",
      "multi-tool",
      "multitool",
      "paddle",
      "boat",
      "binoculars",
      "kayak",
    ],
    wallet: [
      "identification",
      "wallet",
      "money",
      "permit",
      "receipt",
      "reservation",
    ],
    water: [
      "water",
      "hydration",
      "drinking",
      "purification",
      "purifier",
      "filter",
      "filtration",
    ],
  };
};

export { getPresetCategories, getPresetCategoryKeywords };
