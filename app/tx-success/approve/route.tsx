import { Button } from "frames.js/next";
import { frames } from "../../frames/frames";

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
        USDC is approved successfully
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
    ],
    textInput: "Enter amount in USDC",
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
