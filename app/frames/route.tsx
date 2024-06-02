import { Button } from "frames.js/next";
import { frames } from "../frames/frames";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div tw='flex items-center text-6xl justify-center w-full h-full bg-[#ffe1b1] text-violet-800'>
        Welcome to WiseBets
      </div>
    ),
    buttons: [
      <Button action='post' target={`${process.env.HOST_URL}/bridge`}>
        Bridge USDC
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
