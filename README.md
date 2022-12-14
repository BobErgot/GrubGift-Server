# GrubGift Node.js Server Documentation

## Overview
This document provides a detailed overview of the Node.js server setup, including its structure, functionalities, middleware usage, routes, and models. The server is designed to manage various aspects such as authentication, user interactions, posts, comments, and messaging.

## Project Structure
The server's codebase is divided into several directories: `controllers`, `middleware`, `routes`, `utils`, and `models`, each with a specific purpose.

---
### Utility Functions (`utils`)
- **paginate.js**: Function for array pagination.
- **filter.js**: Functionality to filter out inappropriate words from strings.
---
### Middleware (`middleware`)
- **auth.js**: Middleware for verifying authentication tokens with `verifyToken` and `optionallyVerifyToken` for optional verification.
---
### Routes
#### Comments (`routes/comments.js`)
- Manages CRUD operations for comments.

#### Messages (`routes/messages.js`)
- Handles sending messages and fetching conversations.

#### Posts (`routes/posts.js`)
- Operations related to posts, including CRUD, liking, and fetching posts.

#### Users (`routes/users.js`)
- User-related functionalities like registration, login, updating user details, and managing followers/following.
---
### Models
#### Comment (`models/Comment.js`)
- Represents comments on posts, including references to the commenter, post, and any parent/child comments.

#### Conversation (`models/Conversation.js`)
- Manages conversations between users, tracking participants and the last message timestamp.

#### Follow (`models/Follow.js`)
- Tracks user follow relationships, including who is following whom.

#### Message (`models/Message.js`)
- Represents messages sent between users in a conversation.

#### Post (`models/Post.js`)
- Describes posts made by users, including content, like counts, and comment counts.

#### PostLike (`models/PostLike.js`)
- Tracks likes on posts, including which user liked which post.

#### User (`models/User.js`)
- Manages user information, including username, email, password, biography, and roles.
---
### Controllers
Controllers handle the business logic for requests coming into the server, interacting with the database as needed to fetch, create, update, or delete data.

#### Comment Controllers (`controllers/commentControllers.js`)
- Manage operations related to comments, including creating, deleting, and fetching comments based on user or post.

#### Like Controllers (`controllers/likeControllers.js`)
- Handle liking and unliking posts, as well as fetching posts liked by a specific user.

#### Login Controllers
- Handle user authentication processes including user registration and login. Ensures that user credentials are validated, and secure tokens are generated for session management.

#### Message Controllers (`controllers/messageControllers.js`)
- Facilitate sending messages between users and fetching message histories.

#### Post Controllers (`controllers/postControllers.js`)
- Oversee the creation, update, and deletion of posts, as well as fetching posts based on various criteria.

#### User Controllers (`controllers/userControllers.js`)
- Deal with user-related requests such as fetching user profiles, following/unfollowing users, and updating user information.
---

## Authentication
Authentication is handled through JSON Web Tokens (JWT), with middleware ensuring protected routes require a valid token.

## Architecture and Design Pattern
The GrubGift server employs a **Model-View-Controller (MVC)** design pattern, though, in the context of a RESTful API server, it's more accurate to describe it as Model-Controller-Pattern. This structure separates concerns, allowing for independent development, testing, and maintenance of each component:
- **Models** define the data structure and interact directly with the database.
- **Controllers** contain the business logic to manipulate data (models) and return responses.
- **Routes** act as the entry points for the API, directing requests to the appropriate controller actions.
This separation enhances the modularity and scalability of the application, making it easier to extend and maintain.

## Environment Variables
To configure the GrubGift server, set up the following environment variables in your `.env` file:

- `TOKEN_KEY`: Your secret key used for signing and verifying JWT tokens. This is crucial for the authentication process.
- `MONGO_URI`: The MongoDB connection URI string. This is necessary for connecting your server to the MongoDB database.
- `PORT`: The port number on which your Node.js server will run. If not specified, the application should default to a standard port like `3000` for development purposes.

Example `.env` file:

```plaintext
TOKEN_KEY=your_secret_key
MONGO_URI=mongodb://localhost:27017/yourdbname
PORT=3000
```

## Usage
Follow these steps to get the GrubGift server up and running:
1. **Install Node.js**: Ensure that Node.js is installed on your system. You can download it from [the official Node.js website](https://nodejs.org/).
2. **Clone the repository**: Use Git to clone the GrubGift server's repository to your local machine.
3. **Install dependencies**: Navigate to the root directory of the cloned repository and run `npm install` to install all required dependencies.
    ```bash
      npm install
    ```
4. **Set up environment variables**: Create a `.env` file in the root directory of the project. Populate it with the necessary environment variables as described in the Environment Variables section.
5. **Start the server**: Run `npm start` to start the server. If everything is set up correctly, you should see a message indicating that the server is running and listening for requests on the specified port.
    ```bash
      npm start
    ```
6. **Access the server**: With the server running, you can now make requests to the defined 
   routes using a tool like [Insomnia](https://insomnia.rest/) or through your application's frontend.

## Contributors

This project exists thanks to all the people who contribute.

- Abdul Haseeb Hussain Mohammed [@haseeb8888](https://github.com/haseeb8888)
- Satvik Khetan [@satvikkhetan33](https://github.com/satvikkhetan33)
- Sristika Bora [@sristika](https://github.com/sristika)

## Contributing
Contributions are welcome! Fork the repository, make changes, and submit a pull request.

## License
This project is licensed under the MIT License.
