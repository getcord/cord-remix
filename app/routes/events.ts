import { json, type ActionArgs } from "@remix-run/node";
import { createHmac } from "crypto";

const { CORD_SECRET } = process.env;

export const action = async ({ request }: ActionArgs) => {
  if (!CORD_SECRET) {
    throw new Error(
      "Missing CORD_SECRET env variable. Get it on console.cord.com and add it to .env"
    );
  }
  const cordTimestamp = request.headers.get("X-Cord-Timestamp");
  const cordSignature = request.headers.get("X-Cord-Signature");

  const payload = await request.json();
  const bodyString = JSON.stringify(payload);
  const verifyStr = cordTimestamp + ":" + bodyString;
  const hmac = createHmac("sha256", CORD_SECRET);
  hmac.update(verifyStr);
  const incomingSignature = hmac.digest("base64");

  if (cordSignature !== incomingSignature) {
    throw new Error(`Unable to verify signature  ${verifyStr}`);
  } else {
    // process event
    return json({ success: true }, 200);
  }
};
