import { Button } from "frames.js/next";
import { frames } from "../frames/frames";

const handleRequest = frames(async (ctx) => {
  const { searchParams } = new URL(ctx.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");

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
