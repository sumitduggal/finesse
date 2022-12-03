import { describe, test, expect } from "vitest";
import { isMobile } from "./sorter";

// The two tests marked with concurrent will be run in parallel
describe("isMobile()", () => {
  const testCases = [
    ["media", false],
    ["@media", false],
    ["@media ", true],
    ["@media screen", true],
    ["@media print", true],
  ];
  test.each(testCases)(
    'should return key: "%s" as %s for a mobile declaration',
    (key, expected) => {
      expect(isMobile(key as string)).toEqual(expected);
    }
  );
});
