import { CordProvider } from "@cord-sdk/react";
import type { LoaderArgs } from "@remix-run/node";
import {
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { CORD_MISSING_ENV } from "~/utils/cord";
import { getCord } from "~/utils/cord.server";

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
      <div className="error-container">
        <div id="setup-cord">
          <p>You need your key first!</p>
          <ol>
            <li>
              Visit <a href="https://console.cord.com">the cord console</a> to
              get an API key.
            </li>
            <li>Create a .env file.</li>
            <li>Paste your Application ID and Secret in it.</li>
            <pre>{`CORD_APP_ID=<Application ID>
CORD_SECRET=<Secret>`}</pre>
            <li>Restart your remix</li>
          </ol>
        </div>
      </div>
    );
  } else {
    throw error;
  }
}
