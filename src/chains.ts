import { IChainData } from "./types";
import { ETH, SOLAR } from "./assets";

const supportedChains: IChainData[] = [
  {
    name: "Solar Network Test",
    short_name: "solar",
    chain: "Solar",
    network: "Test",
    chain_id: 65534,
    network_id: 65534,
    rpc_url: "https://test-sct.netwarps.com/",
    native_currency: ETH,
  },
];

export default supportedChains;
