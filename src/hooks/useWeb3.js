import { useState, useEffect } from "react";
import { Web3Provider, Contract } from "zksync-web3";
import {
  GREETER_CONTRACT_ADDRESS,
  GREETER_CONTRACT_ABI,
  INFINITY_CONTRACT_ADDRESS,
  INFINITY_CONTRACT_ABI,
} from "../constants/consts";
import { ethers } from "ethers";

const useWeb3 = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [NFTcontractInstance, setNFTContractInstance] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new Web3Provider(window.ethereum);
      setProvider(provider);

      const signerInstance = provider.getSigner();
      setSigner(signerInstance);

      const contract = new Contract(
        GREETER_CONTRACT_ADDRESS,
        GREETER_CONTRACT_ABI,
        signerInstance,
      );
      setContractInstance(contract);

      const NFT_contract = new Contract(
        INFINITY_CONTRACT_ADDRESS,
        INFINITY_CONTRACT_ABI,
        signerInstance,
      );
      setNFTContractInstance(NFT_contract);
    }
  }, []);

  return { provider, signer, contractInstance, NFTcontractInstance };
};

export default useWeb3;
