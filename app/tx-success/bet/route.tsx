import { Button } from "frames.js/next";
import { frames } from "../../frames/frames";
import { baseSepolia } from "viem/chains";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div
        tw='flex items-center text-6xl justify-center w-full h-full text-lime-200'
        style={{
          backgroundImage: `url('${process.env.HOST_URL}/frame.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        Your bet has been placed successfully
      </div>
    ),
    buttons: [
      <Button
        action='link'
        target={`https://opinion-swap.vercel.app/trade?chainId=${baseSepolia.id}`}
      >
        Check more bets
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
