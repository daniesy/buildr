export const toCamelCase = (str: string): string =>
    str.replace(/[- ]([a-z])/g, (g) => g[1].toUpperCase());

export const ucFirst = (str: string): string =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  