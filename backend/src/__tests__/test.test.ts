const sum = (a: number, b: number) => a + b;

describe("Función sum", () => {
  it("Debe sumar dos números correctamente", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
