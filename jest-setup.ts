import "@testing-library/jest-dom";

if (!(SVGElement.prototype as any).getTotalLength) {
  (SVGElement.prototype as any).getTotalLength = () => 1;
}
