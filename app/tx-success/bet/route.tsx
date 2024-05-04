import { Button } from "frames.js/next";
import { frames } from "../../frames/frames";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div tw='flex items-center text-6xl justify-center w-full h-full text-[#efffb7] bg-[#141414]'>
        Your bet has been placed successfully
      </div>
    ),
    buttons: [
      <Button action='tx' target={`${process.env.HOST_URL}`}>
        Bet Again
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
