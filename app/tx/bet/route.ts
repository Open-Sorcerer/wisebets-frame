import { opinionTradingABI } from "@/utils/abi";
import { opinionTradingContractAddress } from "@/utils/constants";
import { TransactionTargetResponse, getFrameMessage } from "frames.js";
import { NextRequest, NextResponse } from "next/server";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  http,
  parseEther,
  parseUnits,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const option = searchParams.get("option");
  const currency = searchParams.get("currency");

  console.log("currency", currency);

  const amt =
    currency === "eth"
      ? parseEther(frameMessage.inputText?.toString() ?? "0.0001")
      : parseUnits(frameMessage.inputText?.toString() ?? "1", 6);

  const calldata = encodeFunctionData({
    abi: opinionTradingABI,
    functionName: "vote",
    args: [
      Number(id),
      Number(option),
      currency === "usdc" ? amt : 0,
      currency === "eth" ? amt : 0,
    ],
  });

  return NextResponse.json({
    chainId: `eip155:${baseSepolia.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: opinionTradingABI as Abi,
      to: opinionTradingContractAddress,
      data: calldata,
      value: currency === "eth" ? amt.toString() : "0",
    },
  });
}
