import { frames } from "@/app/frames/frames";
import { Button } from "frames.js/next";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div
        tw='flex items-center px-8 text-6xl justify-center w-full h-full text-lime-200'
        style={{
          backgroundImage: `url('${process.env.HOST_URL}/frame.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        Your USDC is bridged to OP
      </div>
    ),
    buttons: [
      <Button action='post' target={`${process.env.HOST_URL}/bridge`}>
        Bridge again
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
