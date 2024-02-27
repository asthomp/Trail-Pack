import { Redirect } from "expo-router";
import { getAuth } from "firebase/auth";

import Landing from "../../screens/Landing";
import { useDataContext } from "../../utils/DataProvider";
import { randomFromArray } from "../../utils/helpers";

export default function HomeRoute() {
  const viewModel = useLandingViewModel();

  if (getAuth().currentUser) {
    return (
      <Landing
        createPackOnPress={viewModel.createPackOnPress}
        name={viewModel.name}
      />
    );
  } else {
    return <Redirect href="/login" />;
  }
}

export function useLandingViewModel() {
  const { addItemToPack, user } = useDataContext();
  let name;
  if (user?.trailNames.length > 0) {
    name = randomFromArray(user.trailNames);
  } else {
    name = randomFromArray(["hiker", "friend"]);
  }

  const createPackOnPress = function () {
    const itemID = "qQjrNLSDVBhdc7oaR9VZ";
    const packID = "xy0ElMCg2rbX8OV41B5p";
    addItemToPack(itemID, packID);
  };

  return {
    createPackOnPress,
    name,
    user,
  };
}
