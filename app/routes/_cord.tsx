import { CordProvider } from "@cord-sdk/react";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import {
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { CORD_MISSING_ENV } from "~/utils/cord";
import { getCord } from "~/utils/cord.server";
import stylesUrl from "~/styles/cord.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
  {
    rel: "stylesheet",
    // We need that for the cord component to be styled properly.
    href: "https://app.cord.com/sdk/v1/sdk.latest.css",
    id: "cord_css",
  },
];

export async function loader({ request }: LoaderArgs) {
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
      <section id="setup-cord">
        <h1>You need your sample key first!</h1>
        <ol>
          <li>
            Visit <a href="https://console.cord.com">the cord console</a> to get
            an API key.
          </li>
          <li>Create a .env file.</li>
          <li>Paste your Application ID and Secret in it.</li>
          <pre>{`CORD_APP_ID=<Application ID>
CORD_SECRET=<Secret>`}</pre>
          <li>
            Terminate and then restart your remix <pre>npm run dev</pre>
          </li>
        </ol>
      </section>
    );
  } else {
    throw error;
  }
}
