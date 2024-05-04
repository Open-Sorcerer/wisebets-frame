import { Button } from "frames.js/next";
import { frames } from "../frames/frames";

const handleRequest = frames(async (ctx) => {
  const { searchParams } = new URL(ctx.url);
  const id = searchParams.get("id");

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
