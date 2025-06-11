const applyOpacity = (rgbColor: string, alpha: number): string => {
  const rgbMatch = rgbColor.match(/\d+/g);
  if (!rgbMatch || rgbMatch.length < 3) return rgbColor;

  const [r, g, b] = rgbMatch.map(Number);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default applyOpacity;