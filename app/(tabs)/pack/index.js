import React from "react";

import Packlist from "../../../screens/Packlist";
import { useDataContext } from "../../../utils/DataProvider";

export default function PackRoute() {
  const packsViewModel = usePacksViewModel();

  return <Packlist packs={packsViewModel.packs} />;
}

export function usePacksViewModel() {
  const { getPacks } = useDataContext();
  const packs = getPacks();
  return {
    packs,
  };
}
