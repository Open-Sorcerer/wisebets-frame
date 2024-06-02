import { Button } from "frames.js/next";
import { frames } from "../frames/frames";

const handleRequest = frames(async (ctx) => {
  const { searchParams } = new URL(ctx.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  return {
    image: (
      <div tw='flex items-center text-6xl justify-center w-full h-full bg-[#ffe1b1] text-violet-800'>
        {type === "bet" ? "Approve USDC to Bet" : "Approve USDC to Bridge"}
      </div>
    ),
    buttons: [
      <Button
        action='tx'
        target={`${process.env.HOST_URL}/tx/approve`}
        post_url={`${process.env.HOST_URL}/${
          type === "bet" ? `bet/usdc?id=${id}` : "bridge"
        }`}
      >
        Approve USDC
      </Button>,
    ],
    textInput: "Enter amount in USDC",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
