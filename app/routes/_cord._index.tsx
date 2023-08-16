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
      <p>Edit <code>app/_cord._index.tsx</code> to get started.</p>
    </div>
  );
}
