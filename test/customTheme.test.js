// These tests evaluate the theme-related functions found in customTheme.js
import { customTheme, convertTheme } from "../utils/customTheme";

describe("convertTheme function", () => {
  test("Returns a converted theme when provided with a valid paperTheme object", () => {
    const validPaperTheme = {
      colors: {
        background: "#ffffff",
        elevation: {
          level2: "#dddddd",
        },
        error: "#ff0000",
        onSurface: "#333333",
        outline: "#999999",
        primary: "#ff0000",
      },
    };

    const result = convertTheme(validPaperTheme);

    expect(result).toEqual({
      ...validPaperTheme,
      colors: {
        ...validPaperTheme.colors,
        border: validPaperTheme.colors.outline,
        card: validPaperTheme.colors.elevation.level2,
        notification: validPaperTheme.colors.error,
        text: validPaperTheme.colors.onSurface,
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
