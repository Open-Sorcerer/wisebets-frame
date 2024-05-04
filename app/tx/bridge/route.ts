import { ccipBridgeABI } from "@/utils/abi";
import { baseUSDC, ccipBridgeBaseSepolia } from "@/utils/constants";
import { TransactionTargetResponse, getFrameMessage } from "frames.js";
import { NextRequest, NextResponse } from "next/server";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  http,
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

  const amt = parseUnits(frameMessage.inputText?.toString() ?? "1", 6);

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  const account = privateKeyToAccount(
    "0x72f9a9bffa100bd7566b75b49bbd2bd240aaea57830e7751cf868ef187ca027f"
  );

  const { result } = await publicClient.simulateContract({
    address: ccipBridgeBaseSepolia,
    abi: ccipBridgeABI,
    functionName: "sendMessagePayLINK",
    args: [
      BigInt("5224473277236331295"),
      frameMessage.connectedAddress ??
        "0x1c4C98d2EAd474876a9E84e2Ba8ff226cc9a161c",
      "Sending USDC",
      baseUSDC,
      amt,
    ],
    account,
  });

  console.log("result", result);

  const calldata = encodeFunctionData({
    abi: ccipBridgeABI,
    functionName: "sendMessagePayLINK",
    args: [
      BigInt("5224473277236331295"),
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
