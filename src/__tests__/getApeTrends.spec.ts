import getApeTrends from "..";
import { listAllCrypto } from "../crypto";
import { getAllRedditIndicators } from "../social";

jest.mock("../crypto");
jest.mock("../social");

const listAllCryptoMock = listAllCrypto as jest.MockedFunction<
  typeof listAllCrypto
>;
const getAllRedditIndicatorsMock =
  getAllRedditIndicators as jest.MockedFunction<typeof getAllRedditIndicators>;

describe("getApeTrends", () => {
  it("should get indicators from Reddit by default for all Coingecko cryptos", async () => {
    listAllCryptoMock.mockResolvedValueOnce([
      { symbol: "DOGE", name: "Dogecoin" },
    ]);
    getAllRedditIndicatorsMock.mockResolvedValueOnce([
      {
        symbol: "DOGE",
        name: "Dogecoin",
        mentions: 9000,
        buy: 69,
        sell: 0,
        hold: 420,
      },
    ]);
    const result = await getApeTrends();

    expect(result).toEqual({
      Dogecoin: {
        symbol: "DOGE",
        name: "Dogecoin",
        mentions: 9000,
        buy: 69,
        sell: 0,
        hold: 420,
      },
    });

    expect(getAllRedditIndicatorsMock).toHaveBeenCalledWith([
      { symbol: "DOGE", name: "Dogecoin" },
    ]);
  });
});
