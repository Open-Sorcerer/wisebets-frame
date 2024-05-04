import { ccipBridgeABI, opinionTradingABI } from "@/utils/abi";
import {
  baseUSDC,
  ccipBridgeBaseSepolia,
  opinionTradingContractAddress,
} from "@/utils/constants";
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

  console.log("id", id);
  console.log("option", option);

  const amt = parseEther(frameMessage.inputText?.toString() ?? "0.0001");

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

  const { result } = await publicClient.simulateContract({
    address: opinionTradingContractAddress,
    abi: opinionTradingABI,
    functionName: "vote",
    args: [Number(id), Number(option), 0, amt],
    account,
  });

  console.log("result", result);

  const calldata = encodeFunctionData({
    abi: opinionTradingABI,
    functionName: "vote",
    args: [Number(id), Number(option), 0, amt],
  });

  return NextResponse.json({
    chainId: `eip155:${baseSepolia.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: opinionTradingABI as Abi,
      to: opinionTradingContractAddress,
      data: calldata,
    },
  });
}
