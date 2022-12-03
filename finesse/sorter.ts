export const isMobile = (key: string) => {
  const isMobileKey = key === "mobile";

  const pattern = /^@media (screen|print)*/g;
  const tester = new RegExp(pattern, "g");

  const isMobileQueryDeclaration = tester.test(key);

  return isMobileKey || isMobileQueryDeclaration;
};
