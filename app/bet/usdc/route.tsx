import { Button } from "frames.js/next";
import { frames } from "@/app/frames/frames";
import { createPublicClient, getContract, http } from "viem";
import { baseSepolia } from "viem/chains";
import { opinionTradingContractAddress } from "@/utils/constants";
import { opinionTradingABI } from "@/utils/abi";

const handleRequest = frames(async (ctx) => {
  const { searchParams } = new URL(ctx.url);
  const id = searchParams.get("id");

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  const opinionTradingContract = getContract({
    address: opinionTradingContractAddress,
    abi: opinionTradingABI,
    client: publicClient,
  });

  const proposalData = (await opinionTradingContract.read.proposals([
    id,
  ])) as string[];

  const proposal = {
    description: proposalData[0],
    option1: proposalData[1],
    option2: proposalData[2],
    deadline: proposalData[3],
    option1Votes: proposalData[4],
    option2Votes: proposalData[5],
    option1PoolUSDC: proposalData[6],
    option2PoolUSDC: proposalData[7],
    option1PoolETH: proposalData[8],
    option2PoolETH: proposalData[9],
    isFinalized: proposalData[10],
    winningOption: proposalData[11],
  };

  return {
    image: (
      <div tw='flex items-center text-6xl justify-center w-full h-full text-[#efffb7] bg-[#141414]'>
        {proposal.description}
      </div>
    ),
    buttons: [
      <Button
        action='tx'
        target={`${process.env.HOST_URL}/tx/bet?option=1&id=${id}`}
        post_url={`${process.env.HOST_URL}/tx-success/bet?option=1`}
      >
        {`Bet on ${proposal.option1}`}
      </Button>,
      <Button
        action='tx'
        target={`${process.env.HOST_URL}/tx/bet?option=2&id=${id}`}
        post_url={`${process.env.HOST_URL}/tx-success/bet?option=2`}
      >
        {`Bet on ${proposal.option2}`}
      </Button>,
      <Button
        action='tx'
        target={`${process.env.HOST_URL}/tx/approve`}
        post_url={`${process.env.HOST_URL}/tx-success/approve`}
      >
        Bet USDC
      </Button>,
    ],
    textInput: "Enter your bet in ETH",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
