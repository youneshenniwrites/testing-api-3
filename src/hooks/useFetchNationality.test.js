import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import useFetchNationality from "../hooks/useFetchNationality";

describe("useFetchNationality", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns initial state", () => {
    const { result } = renderHook(() => useFetchNationality(""));
    expect(result.current.nationality).toBe("");
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

  it("fetches nationality and updates state", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        country: [
          { country_id: "US", probability: 0.9 },
          { country_id: "FR", probability: 0.1 },
        ],
      }),
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchNationality("john")
    );

    await waitForNextUpdate();

    expect(result.current.nationality).toBe("US");
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

  it("handles API error", async () => {
    fetch.mockRejectedValueOnce(new Error("API Error"));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchNationality("john")
    );

    await waitForNextUpdate();

    expect(result.current.nationality).toBe("");
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Something went wrong.");
  });

  it("does nothing when input is empty", () => {
    const { result } = renderHook(() => useFetchNationality(""));
    expect(fetch).not.toHaveBeenCalled();
    expect(result.current.nationality).toBe("");
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });
});
