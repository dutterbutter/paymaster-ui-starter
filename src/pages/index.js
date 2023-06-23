import React, { useState } from "react";
import { ethers } from "ethers";
import useWeb3 from "../hooks/useWeb3";
import useGreeting from "../hooks/useGreeting";
import useNFTBalance from "../hooks/useNFTBalance";
import useAccountChanges from "../hooks/useAccountChanges";
import { formatAddress, updateGreeting, updateNFTBalance } from "../utils";
import Greeting from "../components/Greeting";
import Input from "../components/Input";
import Loading from "../components/Spinner";

const Home = () => {
  const {
    provider,
    signer,
    contractInstance,
    NFTcontractInstance,
    setProvider,
    setSigner,
    setContractInstance,
    setNFTContractInstance,
  } = useWeb3();
  const [newGreeting, setNewGreeting] = useState("");
  // const [loading, setLoading] = useState(true);

  const { greeting, loading } = useGreeting(contractInstance);
  const nftBalance = useNFTBalance(NFTcontractInstance, signer);
  useAccountChanges(
    setProvider,
    setSigner,
    setContractInstance,
    setNFTContractInstance,
    () => setGreeting(updateGreeting(contractInstance)),
    () => setNFTBalance(updateNFTBalance(NFTcontractInstance, signer)),
  );

  const payForGreetingChange = async () => {
    setLoading(true);

    if (NFTcontractInstance) {
      try {
        const signerAddress = await signer.getAddress();

        // Query for the balance of the current user
        const nftBalance = await NFTcontractInstance.balanceOf(signerAddress);

        if (nftBalance > 0) {
          const txHandle = await contractInstance.setGreeting(
            newGreeting,
            await payWithPayMaster(),
          );
          // Wait until the transaction is committed
          const receipt = await txHandle.wait();
          // Update greeting
          const greeting = await contractInstance.greet();
          setGreeting(greeting);
          setNewGreeting("");
          setLoading(false);
        } else {
          const txHandle = await contractInstance.setGreeting(newGreeting);
          const receipt = await txHandle.wait();
          const greeting = await contractInstance.greet();
          setGreeting(greeting);
          setNewGreeting("");
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const payWithPayMaster = async () => {
    let paymasterBalance = await provider.getBalance(
      PAYMASTER_CONTRACT_ADDRESS,
    );
    const gasPrice = await provider.getGasPrice();

    // estimate gasLimit via paymaster
    const paramsForFeeEstimation = utils.getPaymasterParams(
      PAYMASTER_CONTRACT_ADDRESS,
      {
        type: "General",
        innerInput: new Uint8Array(),
      },
    );

    // estimate gasLimit via paymaster
    const gasLimit = await contractInstance.estimateGas.setGreeting(
      newGreeting,
      {
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams: paramsForFeeEstimation,
        },
      },
    );
    // const fee = gasPrice.mul(gasLimit.toString());
    const paymasterParams = utils.getPaymasterParams(
      PAYMASTER_CONTRACT_ADDRESS,
      {
        type: "General",
        // empty bytes as testnet paymaster does not use innerInput
        innerInput: new Uint8Array(),
      },
    );

    return {
      maxFeePerGas: gasPrice,
      maxPriorityFeePerGas: ethers.BigNumber.from(0),
      gasLimit,
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams,
      },
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Greeting greeting={greeting} nftBalance={nftBalance} />
          <Input
            newGreeting={newGreeting}
            setNewGreeting={setNewGreeting}
            payForGreetingChange={payForGreetingChange}
          />
        </>
      )}
    </div>
  );
};

export default Home;
