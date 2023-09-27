import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";

import { LiveCursors, PagePresence, Thread } from "@cord-sdk/react";
import { getUser } from "~/utils/cord.server";
import { useLoaderData, useLocation } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return json(getUser(request));
}

/**
 * We are adding page presence and a thread.
 * You can add more collaboration feature, see [components](https://docs.cord.com/components).
 **/
export default function Index() {
  const { users, userIndex } = useLoaderData<typeof loader>();
  const location = useLocation();
  return (
    <div className="cord-app">
      <LiveCursors location={{ location: location.pathname }} />
      <div className="row">
        <ChangeUser users={users} userIndex={userIndex} />
        {/*  By default cord uses window.location, that includes search parameters.
         *  And we do we use search params for setting users (?user-index=x).
         *  This would cause different users to never be on the same page:
         *  we do not want that, we are all about collaboration.
         *  So we only take the pathname. */}
        <PagePresence location={{ location: location.pathname }} />
      </div>
      <h1>Let's get Cordy!</h1>
      {/* A thread is automatically created if not existing. You can try changing it, or adding another one!*/}
      <Thread threadId="a-first-conversation" />
      <CordInfo />
    </div>
  );
}

function CordInfo() {
  return (
    <div className="cord-info">
      <p className="get-started">
        Edit <code>app/_cord._index.tsx</code>
      </p>
      <div className="cord-CTA">
        <a href="https://docs.cord.com">View our docs</a> or{" "}
        <a className="secondary" href="https://console.cord.com">
          manage your app
        </a>
      </div>
      <div className="cord-gives">
        <span>Cord gives you a</span>{" "}
        <ul>
          <li>
            <a href="https://docs.cord.com/components">
              rich UI Component Library
            </a>
            ,&nbsp;
          </li>
          <li>
            <a href="https://docs.cord.com/js-apis-and-hooks">
              a client-side SDK for real-time features
            </a>
            ,&nbsp;
          </li>
          <li>
            <a href="https://docs.cord.com/rest-apis">REST APIs</a>, and{" "}
            <a href="https://docs.cord.com/reference/events-webhook">
              webhook events
            </a>
            .
          </li>
        </ul>
      </div>
    </div>
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
