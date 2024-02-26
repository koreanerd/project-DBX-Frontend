import { NavigateFunction } from "react-router-dom";

type NavigateState = { currentCategoryPath?: string } | (() => void);

export const goToRoute = (
  navigate: NavigateFunction,
  path: string,
  state?: NavigateState,
) => {
  if (state) {
    navigate(path, { state: state });

    return;
  }

  navigate(path);
};
