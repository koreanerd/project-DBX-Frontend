export const goToRoute = (navigate, path, state) => {
  if (state) {
    navigate(path, { state: state });

    return;
  }

  navigate(path);
};
