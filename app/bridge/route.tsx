import { Button } from "frames.js/next";
import { frames } from "../frames/frames";
import { ccipBridgeBaseSepolia } from "@/utils/constants";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div tw='flex flex-col items-center justify-center w-full h-full bg-[#ffe1b1] text-violet-800'>
        <span tw='text-6xl'>Bridge USDC to Avalanche Fuji</span>
        <span tw='text-2xl mt-4'>Powered by CCIP</span>
      </div>
    ),
    buttons: [
      <Button
        action='tx'
        target={`${process.env.HOST_URL}/tx/bridge`}
        post_url={`${process.env.HOST_URL}/tx-success/bridge`}
      >
        Bridge USDC
      </Button>,
      <Button
        action='tx'
        target={`${process.env.HOST_URL}/tx/approve?address=${ccipBridgeBaseSepolia}`}
        post_url={`${process.env.HOST_URL}/bridge`}
      >
        Approve USDC
      </Button>,
    ],
    textInput: "Enter amount in USDC",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
