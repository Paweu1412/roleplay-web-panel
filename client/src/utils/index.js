export const getGlobalStyle = (variableName) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName);
};
