import type { V2_MetaFunction } from "@remix-run/node";

import { Thread, PagePresence } from "@cord-sdk/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

/**
 * We are adding page presence and a thread.
 * You can add more collaboration feature, see [components](https://docs.cord.com/components).
 **/
export default function Index() {
  return (
    <div style={{ margin: "30px auto", maxWidth: "500px" }}>
      <PagePresence />
      <p>Let's get Cord-y!</p>
      <Thread threadId="a-first-conversation" />
      <CordInfo />
    </div>
  );
}

function CordInfo() {
  return (
    <div className="cord-info">
      <p className="get-started">
        Edit <code>app/_cord._index.tsx</code> to get started.
      </p>
      <p className="cord-gives">Cord gives you a</p>{" "}
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
      <div className="cord-CTA">
        <a href="https://docs.cord.com">View Docs</a>
        <a className="secondary" href="https://console.cord.com">Manage your app</a>
      </div>
    </div>
  );
}
