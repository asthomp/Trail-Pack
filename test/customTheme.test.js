// These tests evaluate the theme-related functions found in customTheme.js
import { customTheme, convertTheme } from "../utils/customTheme";

describe("convertTheme function", () => {
  test("Returns a converted theme when provided with a valid paperTheme object", () => {
    const validPaperTheme = {
      colors: {
        primary: "#ff0000",
        background: "#ffffff",
        elevation: {
          level2: "#dddddd",
        },
        onSurface: "#333333",
        outline: "#999999",
        error: "#ff0000",
      },
    };

    const result = convertTheme(validPaperTheme);

    expect(result).toEqual({
      ...validPaperTheme,
      colors: {
        ...validPaperTheme.colors,
        card: validPaperTheme.colors.elevation.level2,
        text: validPaperTheme.colors.onSurface,
        border: validPaperTheme.colors.outline,
        notification: validPaperTheme.colors.error,
      },
    });
  });

  test("Throws an error when provided with an invalid paperTheme object", () => {
    const invalidPaperTheme = { dummyKey: "#c0c0c0" };

    expect(() => convertTheme(invalidPaperTheme)).toThrowError(
      "Attempted to access data in a Paper-Theme object with missing keys",
    );
  });
});

describe("customTheme object", () => {
  test("Light theme has expected properties and values", () => {
    const lightTheme = customTheme.light;
    expect(lightTheme).toBeDefined();
    expect(lightTheme.dark).toBe(false);
    expect(lightTheme.colors).toBeDefined();
    expect(lightTheme.colors.primary).toEqual("rgb(0, 104, 116)");
    // Add other color assertions as needed
  });

  test("Dark theme has expected properties and values", () => {
    const darkTheme = customTheme.dark;
    expect(darkTheme).toBeDefined();
    expect(darkTheme.dark).toBe(true);
    expect(darkTheme.colors).toBeDefined();
    expect(darkTheme.colors.primary).toEqual("rgb(79, 216, 235)");
  });
});
