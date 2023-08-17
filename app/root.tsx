import type { PropsWithChildren } from "react";
import { cssBundleHref } from "@remix-run/css-bundle";
import { json, type LinksFunction, type LoaderArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getUser } from "./utils/cord.server";
import stylesUrl from "~/styles/cord.css";

export async function loader({ request }: LoaderArgs) {
  return json(getUser(request));
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesUrl },
];

function Document({
  children,
  title = "Remix+Cord",
}: PropsWithChildren<{ title?: string }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        {title ? <title>{title}</title> : null}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  const { users, userIndex } = useLoaderData<typeof loader>();
  return (
    <Document>
      <div>
        <ChangeUser users={users} userIndex={userIndex} />
        <Outlet />
      </div>
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document title={`${error.status} ${error.statusText}`}>
        <div className="error-container">
          <h1>
            {error.status} {error.statusText}
          </h1>
        </div>
      </Document>
    );
  }

  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  return (
    <Document title="Uh-oh!">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{errorMessage}</pre>
      </div>
    </Document>
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
