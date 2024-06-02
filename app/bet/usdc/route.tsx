import { Button } from "frames.js/next";
import { frames } from "@/app/frames/frames";
import { createPublicClient, getContract, http } from "viem";
import { baseSepolia } from "viem/chains";
import { baseUSDC, opinionTradingContractAddress } from "@/utils/constants";
import { USDCABI, opinionTradingABI } from "@/utils/abi";

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
      <div tw='flex flex-col items-center justify-center w-full h-full bg-[#ffe1b1] text-violet-800'>
        <span tw='text-6xl'>{proposal.description}</span>
      </div>
    ),
    buttons: [
      <Button
        action='tx'
        target={`${process.env.HOST_URL}/tx/bet?option=1&id=${id}&currency=usdc`}
        post_url={`${process.env.HOST_URL}/tx-success/bet?option=1`}
      >
        {proposal.option1}
      </Button>,
      <Button
        action='tx'
        target={`${process.env.HOST_URL}/tx/bet?option=2&id=${id}&currency=usdc`}
        post_url={`${process.env.HOST_URL}/tx-success/bet?option=2`}
      >
        {proposal.option2}
      </Button>,
      <Button
        action='tx'
        target={`${process.env.HOST_URL}/tx/approve?address=${opinionTradingContractAddress}`}
        post_url={`${process.env.HOST_URL}/bet/usdc?id=${id}`}
      >
        Approve
      </Button>,
    ],
    textInput: "Enter your bet in USDC",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
