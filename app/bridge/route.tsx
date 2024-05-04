import { Button } from "frames.js/next";
import { frames } from "../frames/frames";
import { ccipBridgeBaseSepolia } from "@/utils/constants";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div
        tw='flex flex-col items-center justify-center text-lime-200 w-full h-full'
        style={{
          backgroundImage: `url('${process.env.HOST_URL}/frame.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span tw='text-6xl'>Bridge USDC to OP</span>
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
