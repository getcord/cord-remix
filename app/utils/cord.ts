export const CORD_MISSING_ENV = "MISSING CORD ENV VARIABLES";

export const USERS = [
  {
    // The user ID can be any identifier that makes sense to your application.
    // As long as it's unique per-user, Cord can use it to represent your user.
    user_id: "tom",

    // By supplying the  `user_details` object, you can create the user in
    // Cord's backend on-the-fly. No need to pre-sync your users.
    user_details: {
      email: `sample-template-user1@cord.com`,
      name: "Tom",
      profilePictureURL: "https://app.cord.com/static/Tom.png",
    },
  },
  {
    user_id: "myhoa",
    user_details: {
      email: `sample-template-user2@cord.com`,
      name: "My Hoa",
      profilePictureURL: "https://app.cord.com/static/MyHoa.png",
    },
  },
  {
    user_id: "khadija",
    user_details: {
      email: `sample-template-user3@cord.com`,
      name: "Khadija",
      profilePictureURL: "https://app.cord.com/static/Khadija.png",
    },
  },
  {
    user_id: "Jack",
    user_details: {
      email: `sample-template-user4@cord.com`,
      name: "Jack",
      profilePictureURL: "https://app.cord.com/static/Jackson.png",
    },
  },
];
