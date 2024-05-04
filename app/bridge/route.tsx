import { Button } from "frames.js/next";
import { frames } from "../frames/frames";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div tw='flex items-center text-6xl justify-center w-full h-full bg-gray-100'>
        Bridge USDC to Base using CCIP
      </div>
    ),
    buttons: [
      <Button
        action='post'
        target={{
          query: { chain: "base" },
          pathname: `${process.env.HOST_URL}/bridge`,
        }}
      >
        Bridge USDC to Base from OP
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
