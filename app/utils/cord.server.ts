import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { CORD_MISSING_ENV, USERS } from "./cord";
import { getClientAuthToken, getServerAuthToken } from "@cord-sdk/server";
import { GROUP_ID } from "~/consts";

/**
 * Creates a group and adds all users to it.
 *
 * In a real app, you would do this only once.
 **/
export async function createAndPopulateGroup() {
  const { CORD_SECRET, CORD_APP_ID } = process.env;
  if (!CORD_SECRET || !CORD_APP_ID) {
    console.error(
      "Missing CORD_SECRET or CORD_APP_ID env variable. Get it on console.cord.com and add it to .env"
    );
    return;
  }
  const serverAuthToken = getServerAuthToken(CORD_APP_ID, CORD_SECRET);

  const groupBody = JSON.stringify({ name: GROUP_ID });
  await fetch(`https://api.cord.com/v1/groups/${GROUP_ID}`, {
    method: "PUT",
    body: groupBody,
    headers: {
      Authorization: `Bearer ${serverAuthToken}`,
      "Content-Type": "application/json",
    },
  });
  // assign user to group
  const memberBody = JSON.stringify({ add: USERS.map((user) => user.user_id) });
  await fetch(`https://api.cord.com/v1/groups/${GROUP_ID}/members`, {
    method: "POST",
    body: memberBody,
    headers: {
      Authorization: `Bearer ${serverAuthToken}`,
      "Content-Type": "application/json",
    },
  });
}
export async function getCord(request: LoaderFunctionArgs["request"]) {
  const { CORD_SECRET, CORD_APP_ID } = process.env;
  if (!CORD_SECRET || !CORD_APP_ID) {
    throw new Response(
      "Missing CORD_SECRET or CORD_APP_ID env variable. Get it on console.cord.com and add it to .env",
      { status: 500, statusText: CORD_MISSING_ENV }
    );
  }

  await createAndPopulateGroup();

  const { user } = getUser(request);
  const clientAuthToken = getClientAuthToken(CORD_APP_ID, CORD_SECRET, user);
  return json({
    clientAuthToken,
  });
}

/**
 * You should change that to your own user management system.
 */
export function getUser(request: Request) {
  const url = new URL(request.url);
  let userIndex = parseInt(url.searchParams.get("userIndex") ?? "", 10);
  if (isNaN(userIndex)) {
    userIndex = 0;
  }

  const safeUserIndex = userIndex % USERS.length;
  const user = USERS[safeUserIndex];
  return {
    user,
    users: USERS.map((user) => user.user_details.name),
    userIndex: safeUserIndex,
  };
}
