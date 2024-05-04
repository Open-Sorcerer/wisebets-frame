import { Button } from "frames.js/next";
import { frames } from "../frames/frames";
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

  // const opinionTradingContract = getContract({
  //   address: opinionTradingContractAddress,
  //   abi: opinionTradingABI,
  //   client: publicClient,
  // });

  // const proposalData = (await opinionTradingContract.read.proposals([
  //   id,
  // ])) as string[];

  const usdcContract = getContract({
    address: baseUSDC,
    abi: USDCABI,
    client: publicClient,
  });

  // const allowance = await usdcContract.read.allowance([

  return {
    image: (
      <div
        tw='flex items-center text-6xl justify-center text-lime-200 w-full h-full'
        style={{
          backgroundImage: `url('${process.env.HOST_URL}/frame.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        Welcome to Opinion Swap 👋
      </div>
    ),
    buttons: [
      <Button action='post' target={`${process.env.HOST_URL}/bet/eth?id=${id}`}>
        Bet using ETH
      </Button>,
      <Button
        action='post'
        target={`${process.env.HOST_URL}/bet/usdc?id=${id}`}
      >
        Bet using USDC
      </Button>,
      <Button action='post' target={`${process.env.HOST_URL}/bridge`}>
        Bridge USDC
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
