import { frames } from "@/app/frames/frames";
import { Button } from "frames.js/next";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div tw='flex items-center px-8 text-6xl justify-center w-full h-full bg-[#ffe1b1] text-violet-800'>
        Your USDC is bridged to Avalanche Fuji
      </div>
    ),
    buttons: [
      <Button action='post' target={`${process.env.HOST_URL}/bridge`}>
        Bridge again
      </Button>,
      <Button action='link' target={`https://ccip.chain.link`}>
        Check on CCIP
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
