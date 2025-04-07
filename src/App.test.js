import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import * as service from "../api/nationalityService";

vi.mock("../api/nationalityService");

describe("App Integration", () => {
  it("renders input and result label", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/enter a name/i)).toBeInTheDocument();
    expect(screen.getByText(/nationality result/i)).toBeInTheDocument();
  });

  it("shows loading state after typing", async () => {
    service.fetchNationality.mockResolvedValueOnce({
      country: [{ country_id: "US", probability: 0.9 }],
    });

    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/enter a name/i), {
      target: { value: "john" },
    });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("displays nationality result on successful fetch", async () => {
    service.fetchNationality.mockResolvedValueOnce({
      country: [{ country_id: "US", probability: 0.9 }],
    });

    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/enter a name/i), {
      target: { value: "john" },
    });

    await waitFor(() => {
      expect(screen.getByText(/US/i)).toBeInTheDocument();
    });
  });

  it("shows error message on fetch failure", async () => {
    service.fetchNationality.mockRejectedValueOnce(new Error("API error"));

    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/enter a name/i), {
      target: { value: "john" },
    });

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
