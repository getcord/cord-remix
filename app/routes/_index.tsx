import type { V2_MetaFunction } from "@remix-run/node";

import { Thread, PagePresence } from "@cord-sdk/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ margin: "30px auto", maxWidth: "500px" }}>
      <PagePresence />
      <p>Let's get Cord-y!</p>
      <Thread threadId="a-first-conversation" />
    </div>
  );
}
