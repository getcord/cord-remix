import { CordProvider } from "@cord-sdk/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { CORD_MISSING_ENV } from "~/utils/cord";
import { getCord } from "~/utils/cord.server";
import cordStylesUrl from "~/styles/cord.css";
import stylesUrl from "~/styles/cord-app.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: cordStylesUrl },
  { rel: "stylesheet", href: stylesUrl },
  {
    rel: "stylesheet",
    // We need that for the cord component to be styled properly.
    href: "https://app.cord.com/sdk/v1/sdk.latest.css",
    id: "cord_css",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  return getCord(request);
}

export default function Cord() {
  const { clientAuthToken } = useLoaderData<typeof loader>();

  return (
    <CordProvider clientAuthToken={clientAuthToken}>
      <Outlet />
    </CordProvider>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.statusText === CORD_MISSING_ENV) {
    return (
      <section className="cord-setup">
        <p>Welcome to Cord's remix starter template</p>
        <h1>Time to get your API key</h1>
        <ol>
          <li>
            <a href="https://console.cord.com">Create a free Cord account</a> to get
            your API key.
          </li>
          <li>Create a .env file.</li>
          <li>Paste your Cord Application ID and Secret in your .env file</li>
          <pre>{`CORD_APP_ID=<Application ID>
CORD_SECRET=<Secret>`}</pre>
          <li>
            Restart your remix <pre>npm run dev</pre>
          </li>
        </ol>
      </section>
    );
  } else {
    throw error;
  }
}
