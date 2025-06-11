const rgbStringToComponents = (rgbString: string): string => {
  const match = rgbString.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+\.?\d*)?\)$/i);

  if (match && match.length >= 4) {
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);

    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      return `${r} ${g} ${b}`;
    }
  }

  console.warn(`Invalid RGB string format or components out of range: ${rgbString}. Returning default components.`);
  return "0 0 0";
};

export default rgbStringToComponents;