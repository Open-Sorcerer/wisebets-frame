import { Button } from "frames.js/next";
import { frames } from "../../frames/frames";
import { baseSepolia } from "viem/chains";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div tw='flex items-center text-6xl justify-center w-full h-full bg-[#ffe1b1] text-violet-800'>
        Your bet has been placed successfully
      </div>
    ),
    buttons: [
      <Button
        action='link'
        target={`https://wise-bets.vercel.app/trade?chainId=${baseSepolia.id}`}
      >
        Check more bets
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
