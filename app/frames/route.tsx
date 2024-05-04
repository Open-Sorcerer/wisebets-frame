import { Button } from "frames.js/next";
import { frames } from "../frames/frames";

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
        Select your chain
      </div>
    ),
    buttons: [
      <Button action='post' target={`${process.env.HOST_URL}/bridge`}>
        Bridge
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
