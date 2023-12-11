// const getStats = function () {
//     const itemCategoryCount = {};
//     const result = [];
//     let total = 0;
//     if (data) {
//         for (let i = 0; i < data.items.length; i++) {
//             if (itemCategoryCount[data.items[i].category]) {
//                 itemCategoryCount[data.items[i].category]++;
//             } else {
//                 itemCategoryCount[data.items[i].category] = 1;
//             }
//             total++;
//         }
//         const keys = Object.keys(itemCategoryCount);
//         for (let i = 0; i < keys.length; i++) {
//             result.push({
//                 value: keys[i],
//                 percentageOfTotal: Math.floor(
//                     (itemCategoryCount[keys[i]] / total) * 100,
//                 ),
//                 count: itemCategoryCount[keys[i]],
//             });
//         }
//         return { categories: result, totalItems: total };
//     }
//     return false;
// };
