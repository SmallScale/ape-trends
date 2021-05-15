import axios from "axios";

export type CryptoInfo = { symbol: string; name: string };

export const listAllCrypto = async (): Promise<CryptoInfo[]> => {
  const { data } = await axios.get<CryptoInfo[]>(
    "https://api.coingecko.com/api/v3/coins/list"
  );
  return data;
};
