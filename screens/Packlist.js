import { router } from "expo-router";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, List, Divider, FAB } from "react-native-paper";

export default function Packlist({ packs }) {
  return (
    <View style={style.lockerContainer}>
      <ScrollView>
        <List.Section
          style={{
            alignItems: "stretch",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
        >
          {packs && packs.length > 0 ? (
            packs.map((x) => {
              return (
                <View key={"PackID#" + x.packID + "-pack-listing"}>
                  <List.Item
                    onPress={() =>
                      router.push({
                        params: {
                          packID: x.packID,
                        },
                        pathname: "pack/[packID]",
                      })
                    }
                    title={x.name}
                    description={x.description}
                    left={(props) => (
                      <List.Icon {...props} icon="bag-personal-outline" />
                    )}
                    right={() => (
                      <Text>
                        {x.weight} {x.weightUnit}
                      </Text>
                    )}
                  />
                  <Divider />
                </View>
              );
            })
          ) : (
            <Text>No Packs Found</Text>
          )}
        </List.Section>
      </ScrollView>
      <View style={style.addFAB}>
        <FAB
          icon="plus"
          size={20}
          accessibilityLabel="New Test"
          onPress={() => {
            router.push("pack/add");
          }}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  addFAB: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    margin: 40,
    position: "absolute",
    right: 0,
  },
  lockerContainer: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "flex-start",
  },

  lockerHeader: {
    display: "flex",
    flexDirection: "row",
  },
  lockerSortingChip: {
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  rightHelpButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
