import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchNationality } from "../api/nationalityService";

describe("fetchNationality API Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches data successfully when the API call is successful", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        country: [
          { country_id: "US", probability: 0.9 },
          { country_id: "FR", probability: 0.1 },
        ],
      }),
    });

    const data = await fetchNationality("john");

    expect(data.country[0].country_id).toBe("US");
    expect(data.country[0].probability).toBe(0.9);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("throws an error when the API call fails", async () => {
    fetch.mockRejectedValueOnce(new Error("API Error"));

    await expect(fetchNationality("john")).rejects.toThrow(
      "Something went wrong."
    );

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("throws an error when the response is not ok", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Error" }),
    });

    await expect(fetchNationality("john")).rejects.toThrow(
      "Failed to fetch data"
    );

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
