import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import stylesUrl from "~/styles/root.css";
import { CordProvider } from "@cord-sdk/react";
import { json } from "@remix-run/node";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesUrl },
  {
    rel: "stylesheet",
    href: "https://app.cord.com/sdk/v1/sdk.latest.css",
    id: "cord_css",
  },
];

export async function loader({ request }: LoaderArgs) {
  // @ts-ignore I need this here, so it is no included in the client bundle
  // It should not be needed because remix does Server Code Pruning.
  const { getClientAuthToken } = await import("@cord-sdk/server");

  const { CORD_SECRET, CORD_APP_ID } = process.env;
  if (!CORD_SECRET || !CORD_APP_ID) {
    console.error(
      "Missing CORD_SECRET or CORD_ORD_ID env variable. Get it on console.cord.com and add it to .env"
    );
    return json({ clientAuthToken: null, users: [], userIndex: -1 });
  }
  const url = new URL(request.url);
  let userIndex = parseInt(url.searchParams.get("userIndex") ?? "", 10);
  if (isNaN(userIndex)) {
    userIndex = Math.round(Math.random() * 3);
  }

  const users = [
    {
      // The user ID can be any identifier that makes sense to your application.
      // As long as it's unique per-user, Cord can use it to represent your user.
      user_id: "severusatreides",

      // Same as above. An organization ID can be any unique string. Organizations
      // are groups of users.
      organization_id: "starpotterdunewars",
      user_details: {
        email: "sevvy@arrakis.spice",
        name: "Severus Atreides",
      },
    },
    {
      user_id: "minervahalleck",
      organization_id: "starpotterdunewars",
      user_details: {
        email: "catlady@tattoine.gov",
        name: "Minerva Halleck",
      },
    },
    {
      user_id: "hermioneorgana",
      organization_id: "starpotterdunewars",
      user_details: {
        email: "hermi1979@starfleet.org.terra",
        name: "Hermione Organa",
      },
    },
    {
      user_id: "jarjarmarvolo",
      organization_id: "starpotterdunewars",
      user_details: {
        email: "meesa@lowkey.sith",
        name: "Jar Jar Marvolo",
      },
    },
  ];
  const safeUserIndex = userIndex % users.length;
  const user = users[safeUserIndex];

  const clientAuthToken = getClientAuthToken(CORD_APP_ID, CORD_SECRET, {
    ...user,
    // By supplying the `organization_details` object, just like the user,
    // Cord will create the organization on-the-fly.
    organization_details: {
      name: "starpotterdunewars",
    },
  });
  return json({
    clientAuthToken,
    users: users.map((user) => user.user_details.name),
    userIndex: safeUserIndex,
  });
}

export default function App() {
  const { clientAuthToken, users, userIndex } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div >
          {clientAuthToken ? (
            <CordProvider clientAuthToken={clientAuthToken}>
              <ChangeUser users={users} userIndex={userIndex} />
              <Outlet />
            </CordProvider>
          ) : (
            <div id="setup-cord">
              <p>You need your key first!</p>
              <ol>
                <li>
                  Visit <a href="https://console.cord.com">the cord console</a>{" "}
                  to get an API key.
                </li>
                <li>Create a .env file.</li>
                <li>Paste your Application ID and Secret in it.</li>
                <pre>{`CORD_APP_ID=<Application ID>
CORD_SECRET=<Secret>`}</pre>
                <li>Restart your remix</li>
              </ol>
            </div>
          )}
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function ChangeUser({
  users,
  userIndex,
}: {
  users: string[];
  userIndex: number;
}) {
  return (
    <label className="change-user">
      Change user
      <select
        value={userIndex}
        onChange={(e) => {
          const newUserIndex = e.target.value;
          const searchParams = new URLSearchParams(location.search);
          searchParams.set("userIndex", newUserIndex);
          location.search = searchParams.toString();
        }}
      >
        {users.map((user, idx) => (
          <option key={idx} value={idx}>
            {user}
          </option>
        ))}
      </select>
    </label>
  );
}
