import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("HomePage", () => {
  it("renders homepage text", () => {
    render(<Page />);
    const text = screen.getByText("Home page");
    expect(text).toBeInTheDocument();
  });
});
