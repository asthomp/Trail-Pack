// import React, { useState } from "react";
// import { View } from "react-native";
// import { PieChart } from "react-native-gifted-charts";
// import { Text } from "react-native-paper";
//
// import { useDataContext } from "../utils/DataProvider";
//
// export default function CategoryStatsPie() {
//   const { getStats } = useDataContext();
//   const [center, setCenter] = useState(null);
//   return (
//     <PieChart
//       data={getStats().categories.map((x) => {
//         return { value: x.percentageOfTotal, category: x.value, key: { x } };
//       })}
//       innerRadius={70}
//       innerCircleColor="#232B5D"
//       centerLabelComponent={() => {
//         return (
//           <View
//             style={{
//               alignItems: "center",
//             }}
//           >
//             <Text style={{ fontSize: 22, color: "white", fontWeight: "bold" }}>
//               {center !== null ? center.value + "%" : "My Gear"}
//             </Text>
//             <Text
//               numberOfLines={1}
//               style={{
//                 justifyContent: "center",
//                 maxWidth: 90,
//                 fontSize: 16,
//                 color: "white",
//               }}
//             >
//               {center !== null && center.category}
//             </Text>
//           </View>
//         );
//       }}
//       radius={100}
//       sectionAutoFocus
//       showGradient
//       donut
//       onPress={(x) => setCenter(x)}
//     />
//   );
// }
