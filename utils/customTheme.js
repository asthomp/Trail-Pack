// Builds a theme object that has keys for both Expo and React-Native Paper theming.
// They have a similar structure but some keys differ.
const convertTheme = function (paperTheme) {
  if (
    !paperTheme ||
    !paperTheme.colors ||
    !paperTheme.colors.primary ||
    !paperTheme.colors.background ||
    !paperTheme.colors.elevation.level2 ||
    !paperTheme.colors.onSurface ||
    !paperTheme.colors.outline ||
    !paperTheme.colors.error
  ) {
    throw Error(
      "Attempted to access data in a Paper-Theme object with missing keys",
    );
  }
  return {
    ...paperTheme,
    colors: {
      ...paperTheme.colors,
      background: paperTheme.colors.background,
      border: paperTheme.colors.outline,
      card: paperTheme.colors.elevation.level2,
      notification: paperTheme.colors.error,
      primary: paperTheme.colors.primary,
      text: paperTheme.colors.onSurface,
    },
  };
};

// This is the custom theme for the entire application.
const customTheme = {
  dark: {
    colors: {
      backdrop: "rgba(41, 50, 52, 0.4)",
      background: "rgb(25, 28, 29)",
      elevation: {
        level0: "transparent",
        level1: "rgb(28, 37, 39)",
        level2: "rgb(29, 43, 46)",
        level3: "rgb(31, 49, 52)",
        level4: "rgb(32, 51, 54)",
        level5: "rgb(33, 54, 58)",
      },
      error: "rgb(255, 180, 171)",
      errorContainer: "rgb(147, 0, 10)",
      inverseOnSurface: "rgb(46, 49, 50)",
      inversePrimary: "rgb(0, 104, 116)",
      inverseSurface: "rgb(225, 227, 227)",
      onBackground: "rgb(225, 227, 227)",
      onError: "rgb(105, 0, 5)",
      onErrorContainer: "rgb(255, 180, 171)",
      onPrimary: "rgb(0, 54, 61)",
      onPrimaryContainer: "rgb(151, 240, 255)",
      onSecondary: "rgb(28, 52, 56)",
      onSecondaryContainer: "rgb(205, 231, 236)",
      onSurface: "rgb(225, 227, 227)",
      onSurfaceDisabled: "rgba(225, 227, 227, 0.38)",
      onSurfaceVariant: "rgb(191, 200, 202)",
      onTertiary: "rgb(36, 48, 77)",
      onTertiaryContainer: "rgb(218, 226, 255)",
      outline: "rgb(137, 146, 148)",
      outlineVariant: "rgb(63, 72, 74)",
      primary: "rgb(79, 216, 235)",
      primaryContainer: "rgb(0, 79, 88)",
      scrim: "rgb(0, 0, 0)",
      secondary: "rgb(177, 203, 208)",
      secondaryContainer: "rgb(51, 75, 79)",
      shadow: "rgb(0, 0, 0)",
      surface: "rgb(25, 28, 29)",
      surfaceDisabled: "rgba(225, 227, 227, 0.12)",
      surfaceVariant: "rgb(63, 72, 74)",
      tertiary: "rgb(186, 198, 234)",
      tertiaryContainer: "rgb(59, 70, 100)",
    },
    dark: true,
  },
  light: {
    colors: {
      backdrop: "rgba(41, 50, 52, 0.4)",
      background: "rgb(250, 253, 253)",
      elevation: {
        level0: "transparent",
        level1: "rgb(238, 246, 246)",
        level2: "rgb(230, 241, 242)",
        level3: "rgb(223, 237, 238)",
        level4: "rgb(220, 235, 237)",
        level5: "rgb(215, 232, 234)",
      },
      error: "rgb(186, 26, 26)",
      errorContainer: "rgb(255, 218, 214)",
      inverseOnSurface: "rgb(239, 241, 241)",
      inversePrimary: "rgb(79, 216, 235)",
      inverseSurface: "rgb(46, 49, 50)",
      onBackground: "rgb(25, 28, 29)",
      onError: "rgb(255, 255, 255)",
      onErrorContainer: "rgb(65, 0, 2)",
      onPrimary: "rgb(255, 255, 255)",
      onPrimaryContainer: "rgb(0, 31, 36)",
      onSecondary: "rgb(255, 255, 255)",
      onSecondaryContainer: "rgb(5, 31, 35)",
      onSurface: "rgb(25, 28, 29)",
      onSurfaceDisabled: "rgba(25, 28, 29, 0.38)",
      onSurfaceVariant: "rgb(63, 72, 74)",
      onTertiary: "rgb(255, 255, 255)",
      onTertiaryContainer: "rgb(14, 27, 55)",
      outline: "rgb(111, 121, 122)",
      outlineVariant: "rgb(191, 200, 202)",
      primary: "rgb(0, 104, 116)",
      primaryContainer: "rgb(151, 240, 255)",
      scrim: "rgb(0, 0, 0)",
      secondary: "rgb(74, 98, 103)",
      secondaryContainer: "rgb(205, 231, 236)",
      shadow: "rgb(0, 0, 0)",
      surface: "rgb(250, 253, 253)",
      surfaceDisabled: "rgba(25, 28, 29, 0.12)",
      surfaceVariant: "rgb(219, 228, 230)",
      tertiary: "rgb(82, 94, 125)",
      tertiaryContainer: "rgb(218, 226, 255)",
    },
    dark: false,
  },
};

export { customTheme, convertTheme };
