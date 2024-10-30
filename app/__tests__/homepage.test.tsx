// app/page.test.tsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import Page from "../page";

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("HomePage", () => {
  it("renders homepage text", () => {
    render(
      <MantineProvider>
        <Page />
      </MantineProvider>,
    );
    const text = screen.getByText("Task Management App");
    expect(text).toBeInTheDocument();
  });
});
