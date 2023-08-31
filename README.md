![OG-Remix](https://github.com/getcord/cord-remix/assets/529333/c7d0b55f-9b95-4f38-a784-8f3f69171540)

# Welcome to Remix + Cord!

[Cord](https://www.cord.com) adds collaboration to your product in under an hour. Our SDK helps you re-imagine your app with a rich, real-time collaboration experience - in minutes, not months.

This starter templates helps integrates Cord into a remix app. 💽
- [Cord Docs](https://docs.cord.com)
- [Remix Docs](https://remix.run/docs)

This template follows [the cord integration guide](https://docs.cord.com/get-started/integration-guide) and adds page presence and a thread.
You can add more [components](https://docs.cord.com/components).

## Install
From your terminal, create a remix + cord app:
```sh
npx create-remix@latest --typescript --install --template getcord/cord-remix
```
Then `cd` in the newly created folder.
## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over relevant code/assets from your current app to the new project that's pre-configured for your target server.

Most importantly, this means everything in the `app/` directory, but if you've further customized your current application outside of there it may also include:

- Any assets you've added/updated in `public/`
- Any updated versions of root files such as `.eslintrc.js`, etc.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```


### Differences with normal remix starter template

1. We've added a nested layout route (`_cord.ts`) and moved the index route under it (`_cord._index.tsx`): That layout route sets up collaboration for all nested routes.
2. The index route shows the [page presence](https://docs.cord.com/components/cord-page-presence) and a [thread](https://docs.cord.com/components/cord-thread): two very common collaboration features.
3. We've added an [API route](https://remix.run/docs/en/1.19.3/guides/api-routes#api-routes) for handling our [events webhooks](https://docs.cord.com/reference/events-webhook). You want to run our own code when a message is added or a notification is added? This is where you can do it.
4. In the `Root.tsx` we've added a dropdown to let you select a user; having more than one user is necessary to truly showcase collaboration. You will want to replace this with your own authentication.

### Getting a Cord key
Cord requires a key to operate.
You can get a sample application key easily via the [console](https://console.cord.com) in the Getting Started section.
