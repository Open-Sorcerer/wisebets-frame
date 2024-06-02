import { ccipBridgeABI } from "@/utils/abi";
import { baseUSDC, ccipBridgeBaseSepolia } from "@/utils/constants";
import { TransactionTargetResponse, getFrameMessage } from "frames.js";
import { NextRequest, NextResponse } from "next/server";
import { Abi, encodeFunctionData, parseUnits } from "viem";
import { baseSepolia } from "viem/chains";

export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }

  const amt = parseUnits(frameMessage.inputText?.toString() ?? "1", 6);

  const calldata = encodeFunctionData({
    abi: ccipBridgeABI,
    functionName: "sendMessagePayLINK",
    args: [
      BigInt("14767482510784806043"),
      frameMessage.connectedAddress ??
        "0x1c4C98d2EAd474876a9E84e2Ba8ff226cc9a161c",
      "Sending USDC",
      baseUSDC,
      amt,
    ],
  });

  return NextResponse.json({
    chainId: `eip155:${baseSepolia.id}`,
    method: "eth_sendTransaction",
    params: {
      abi: ccipBridgeABI as Abi,
      to: ccipBridgeBaseSepolia,
      data: calldata,
    },
  });
}
