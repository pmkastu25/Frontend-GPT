# SigmaGPT 🤖

**An AI-powered conversational chatbot built using the MERN stack and OpenAI API.**

SigmaGPT is a full-stack AI chatbot application inspired by ChatGPT. It allows users to interact with an AI model, receive responses with a word-by-word typing effect, manage multiple conversations, and revisit previous chats through persistent chat history.

The application integrates the OpenAI API using the **GPT-4o mini** model and stores conversation threads in MongoDB, providing a seamless conversational experience.

## ✨ Features

- **AI-Powered Conversations:** Interact with OpenAI's GPT-4o mini model to generate intelligent responses.
- **Word-by-Word Response Streaming Effect:** Display the latest AI response with a typing animation.
- **Chat History:** View previous conversations in the sidebar.
- **Persistent Conversations:** Store chat messages and thread details in MongoDB.
- **Start a New Chat:** Create a new conversation whenever needed.
- **Conversation Management:** Retrieve and delete individual chat threads.
- **Markdown Rendering:** Format AI responses using React Markdown.
- **Syntax Highlighting:** Display code snippets with syntax highlighting using `rehype-highlight`.
- **Automatic Chat Titles:** Organize conversations by title.
- **Recently Updated Chats:** Sort conversation history by the latest activity.
- **Logout:** Provide a logout option through the navigation bar.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| MongoDB | Store chat threads and messages |
| Express.js | Build backend REST APIs |
| React.js | Create the interactive user interface |
| Node.js | Backend runtime environment |
| OpenAI API | Generate AI responses |
| GPT-4o mini | Language model used for conversations |
| Mongoose | MongoDB schema modeling and database operations |
| React Markdown | Render Markdown-formatted AI responses |
| rehype-highlight | Syntax highlighting for code blocks |
| CSS | Styling and responsive UI |

## 🏗️ Application Architecture

The application follows a client-server architecture using the MERN stack.

```text
                    SigmaGPT
                        |
          +-------------+-------------+
          |                           |
     React Frontend              Express Backend
          |                           |
   +------+------+             +------+------+
   |             |             |             |
 Sidebar     Chat Window     Routes        Utils
   |             |             |             |
History      Chat Input     Controllers   OpenAI API
                  |             |
             Chat Messages   MongoDB
                  |             |
             Markdown &      Threads and
             Highlighting     Messages
```

### Frontend Components

- **Sidebar:** Displays chat history and provides access to previous conversations.
- **ChatWindow:** Main container for the chat interface.
- **Chat Navbar:** Contains navigation and logout functionality.
- **Chat Component:** Displays user prompts and AI-generated responses.
- **Chat Input:** Accepts prompts and submits messages to the backend.

## 🔄 How It Works

### Chat Request and Response Flow

1. The user enters a prompt in the chat input.
2. The frontend sends a `POST /api/chat` request containing the `threadId` and `message`.
3. The backend validates the request data.
4. If the thread exists, the message is added to the existing conversation. Otherwise, a new thread is created.
5. The user's message is saved in MongoDB.
6. The backend sends the appropriate conversation context to the OpenAI API.
7. OpenAI generates a response using GPT-4o mini.
8. The assistant's response is saved in MongoDB.
9. The backend returns the response to the frontend.
10. The frontend displays the response with Markdown formatting, code syntax highlighting, and a typing effect.

### Chat Thread Management

Each conversation is represented by a thread.

- **Existing `threadId`:** Continue the selected conversation.
- **Missing or new `threadId`:** Create a new conversation.
- **Chat history:** Fetch threads sorted by their most recent activity.
- **Delete chat:** Remove a selected conversation from history.

## 🗄️ Database Design

MongoDB stores conversations as thread documents containing message arrays.

### 1. Thread Schema

The `ThreadSchema` represents an individual conversation.

| Field | Description |
|---|---|
| `threadId` | Unique identifier for the conversation |
| `title` | Title used to identify the conversation |
| `messages` | Array of messages exchanged in the thread |
| `createdAt` | Timestamp when the thread was created |
| `updatedAt` | Timestamp of the most recent update |

The `updatedAt` field helps sort recently active conversations at the top of the sidebar.

### 2. Message Schema

Each message represents a single user prompt or assistant response.

| Field | Description |
|---|---|
| `content` | Text content of the message |
| `role` | Message sender: `user` or `assistant` |
| `timestamp` | Time when the message was created |

A thread contains multiple user-assistant message pairs, preserving the sequence of a conversation.

Example:

```json
{
  "threadId": "thread_123",
  "title": "Understanding React Hooks",
  "messages": [
    {
      "role": "user",
      "content": "What are React Hooks?"
    },
    {
      "role": "assistant",
      "content": "React Hooks let functional components use state and other React features."
    }
  ],
  "createdAt": "2026-10-11T10:00:00.000Z",
  "updatedAt": "2026-10-11T10:00:05.000Z"
}
```

*Note: The timestamps and IDs above are illustrative.*

## 🔌 REST API Endpoints

Base URL: `/api`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/thread` | Retrieve all conversation threads |
| `GET` | `/thread/:threadId` | Retrieve a specific thread and its messages |
| `DELETE` | `/thread/:threadId` | Delete a conversation from chat history |
| `POST` | `/chat` | Process a prompt, generate an AI response, and persist the conversation |

### `GET /api/thread`

Fetch all threads, sorted by `updatedAt` in descending order.

### `GET /api/thread/:threadId`

Retrieve the selected thread, including its complete message history.

### `DELETE /api/thread/:threadId`

Delete the selected thread from MongoDB.

### `POST /api/chat`

**Request body:**

```json
{
  "threadId": "thread_123",
  "message": "Explain the MERN stack."
}
```

For a new conversation, the frontend can send a missing or `null` `threadId`, according to the backend's request validation logic.

**Backend responsibilities:**

1. Validate the `threadId` and `message`.
2. Find an existing thread or create a new one.
3. Save the user's message.
4. Request an AI-generated response from OpenAI.
5. Save the assistant's response.
6. Update the thread's `updatedAt` timestamp.
7. Return the response and relevant thread information to the frontend.

## 📁 Project Structure

A suggested structure for the application is:

```text
SigmaGPT/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Sidebar.jsx
│       │   ├── ChatWindow.jsx
│       │   ├── Chat.jsx
│       │   ├── ChatInput.jsx
│       │   └── Navbar.jsx
│       ├── context/
│       ├── App.jsx
│       ├── main.jsx
│       └── Chat.css
│
├── backend/
│   ├── models/
│   │   ├── Thread.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── thread.js
│   │   └── chat.js
│   ├── utils/
│   │   └── openai.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

*The structure is illustrative; adjust the filenames and folders to match your actual repository.*

## ⚙️ Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB database, either local or MongoDB Atlas
- OpenAI API key

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd SigmaGPT
```

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

Replace the placeholder values with your actual configuration. Never commit your `.env` file or expose your API key in frontend code.

### 3. Start the Backend

```bash
npm start
```

Use `npm run dev` instead if your backend's `package.json` defines a development script.

### 4. Configure the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

**Important:** Configure the frontend's API base URL to point to the backend server, and configure CORS on the backend if the frontend and backend run on different origins.

## 🧠 OpenAI API Integration

SigmaGPT uses OpenAI's existing language model rather than training a model from scratch.

The backend sends conversation messages to the OpenAI API and returns the generated assistant response. Keeping API calls on the server protects credentials and allows the application to control request validation and error handling.

The model used is **GPT-4o mini**, a language model suited to many conversational and general-purpose tasks.

The frontend uses React Markdown to render normal text, lists, and formatted code blocks. The `rehype-highlight` plugin adds syntax highlighting to supported programming languages.

The word-by-word typing effect is a frontend presentation feature; it does not necessarily mean the response is streamed token by token from the OpenAI API.

## 🔒 Security and Error Handling

Recommended practices include:

- Store API keys and database credentials in environment variables.
- Validate incoming messages and thread identifiers.
- Handle OpenAI API errors, rate limits, and network failures.
- Prevent duplicate submissions while a response is being generated.
- Avoid logging sensitive conversation content unnecessarily.
- Restrict CORS to trusted frontend origins in production.
- Add authentication and authorization checks before allowing access to private chat history or logout-protected routes.
- Use database indexes where appropriate for thread identifiers and recent-history queries.

## 🚀 Future Enhancements

- True streaming responses using Server-Sent Events (SSE) or the Fetch API's readable streams.
- Authentication with secure session or token management.
- Automatic conversation title generation.
- Search and filter chat history.
- Copy-code and regenerate-response actions.
- Support for multiple AI models.
- Responsive mobile interface.
- Deployment with a hosted frontend, backend, and MongoDB database.

## 🎯 Learning Outcomes

This project demonstrates practical experience with:

- Full-stack development using the MERN stack.
- REST API design and backend request handling.
- MongoDB data modeling with Mongoose.
- Integration with an external AI API.
- Managing multi-turn conversations and persistent chat history.
- React state management and component-based UI design.
- Markdown rendering and code syntax highlighting.
- Asynchronous operations, loading states, and error handling.

## 👨‍💻 Author

**Prathamesh Kasture**

Computer Engineering Graduate | Full Stack Developer

- GitHub: [pmkastu25](https://github.com/pmkastu25)

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.
