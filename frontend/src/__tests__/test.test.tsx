import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("test", () => {
  it("should render", () => {
    render(<main>test</main>);

    const $main = screen.getByRole("main");

    expect($main).toBeDefined();
    screen.debug();
  });
});
