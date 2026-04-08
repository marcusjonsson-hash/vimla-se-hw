import { describe, expect, it, vi, afterEach } from "vitest";
import {
  DECLINED_PERSONNUMMER,
  ERROR_PERSONNUMMER,
} from "@/data/testPersonnummer";
import { performCreditCheck } from "./creditCheck";

afterEach(() => {
  vi.useRealTimers();
});

describe("performCreditCheck", () => {
  it("returns approved for regular personnummer", async () => {
    const result = await performCreditCheck("19900101-1234");
    expect(result.status).toBe("approved");
  });

  it("returns declined for declined test personnummer", async () => {
    const result = await performCreditCheck(DECLINED_PERSONNUMMER);
    expect(result.status).toBe("declined");
  });

  it("returns error for error test personnummer", async () => {
    const result = await performCreditCheck(ERROR_PERSONNUMMER);
    expect(result.status).toBe("error");
  });

  it("resolves after the simulated delay", async () => {
    vi.useFakeTimers();

    const promise = performCreditCheck("199001011234");
    let settled = false;
    void promise.then(() => {
      settled = true;
    });

    await vi.advanceTimersByTimeAsync(1999);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    await promise;
    expect(settled).toBe(true);
  });
});
