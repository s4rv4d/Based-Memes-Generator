import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { RewardsAbi, getContractFromChainId } from "@/abi/zoraEdition";
import { Address } from "viem";
import { ethers } from "ethers";

export default function Header() {
  const [formattedBalance, setFormattedBalance] = useState("0 ETH");
  const [unformattedBal, setUnformattedBal] = useState<BigInt>(BigInt(0));
  const { address, isConnected } = useAccount();
  const { rewards_contract, explorer } = getContractFromChainId(
    Number(process.env.NEXT_PUBLIC_CHAIN_ID)
  );

  const { isLoading, status, data, error, refetch } = useReadContract({
    abi: RewardsAbi,
    address: rewards_contract as Address,
    functionName: "balanceOf",
    args: [address as Address],
  });

  const { data: hash, isPending, writeContract, isError } = useWriteContract();

  useEffect(() => {
    console.log(data);
    console.log(isLoading);
    console.log(status);

    if (data != undefined && status === "success") {
      const formatted = ethers.utils.formatEther(data);
      setUnformattedBal(BigInt(data));
      setFormattedBalance(formatted + " ETH");
    }
  }, [status === "success"]);

  const handleClick = () => {
    writeContract({
      address: rewards_contract as Address,
      abi: RewardsAbi,
      functionName: "withdraw",
      args: [address as Address, unformattedBal],
    });
  };

  return (
    <header className="text-black bg-transparent body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <a className="flex font-medium items-center text-white mb-4 md:mb-0">
          <span className="text-xl">Based Memes</span>
        </a>
        <div className="inline-flex items-center text-base mt-4 md:mt-0">
          <w3m-button />
          <button
            onClick={handleClick}
            className="flex items-center ml-4 text-white bg-[#0252FF] rounded-full p-1 px-2"
          >
            <span className="m-1">Rewards: {formattedBalance}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
