import {
  init,
  TokenBlockchain,
  getFarcasterUserNFTBalances,
  NFTType,
} from "../";
import { config } from "dotenv";

config();
(async () => {
  init(process.env.AIRSTACK_API_KEY ?? "");
  const { data } = await getFarcasterUserNFTBalances({
    fid: 602,
    chains: [TokenBlockchain.Base],
    tokenType: [NFTType.ERC721],
    limit: 10,
  });
  console.log(data);
})();
