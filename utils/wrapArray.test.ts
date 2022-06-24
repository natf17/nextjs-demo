import wrapArray from "./wrapArray";

describe("wrapArray util function", () => {
  const sampleArray = ["a", "b", "c", "d", "e", "f"];

  it("returns the wrapped array value", () => {
    expect(wrapArray(sampleArray, 15)).toEqual(sampleArray[3]);
  });

  it("throws if it receives a negative integer", () => {
    expect(() => {
      wrapArray(sampleArray, -1);
    }).toThrow();
  });
});
