# Todo List Application

A modern, responsive to-do list application built with React, TypeScript, and a clean UI using Tailwind CSS and shadcn components.

![Todo App Screenshot](screenshot.png)

## Features

- ✅ Create, read, update, and delete tasks
- 🔄 Filter tasks by status (All, Active, Completed)
- 🚩 Assign priority levels to tasks (Low, Medium, High)
- 💾 Persistent storage using local storage
- 🌓 Dark/Light theme toggle
- 🔔 Toast notifications for user actions
- 📱 Fully responsive design for all devices

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **UI Components**: shadcn/ui components with Radix UI
- **State Management**: React Query for server state, React hooks for local state
- **Forms**: React Hook Form with Zod validation
- **Routing**: wouter for lightweight routing
- **Backend**: Express.js (minimal server setup)
- **Data Storage**: Local storage on the client side
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
todo-app/
├── client/             # Frontend code
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utility functions and types
│   │   ├── pages/      # Page components
│   │   ├── App.tsx     # Main application component
│   │   └── main.tsx    # Application entry point
│   └── index.html      # HTML template
├── server/             # Backend code
│   ├── index.ts        # Server entry point
│   └── routes.ts       # API routes
├── shared/             # Shared code between client and server
│   └── schema.ts       # TypeScript type definitions
└── package.json        # Project dependencies and scripts
```

## Usage

1. **Add a new task**: Click the "Add New Task" button, enter task details, and click "Add Task"
2. **Complete a task**: Click the checkbox next to a task to mark it as completed
3. **Edit a task**: Click the edit (pencil) icon on a task, make changes, and save
4. **Delete a task**: Click the delete (trash) icon on a task
5. **Filter tasks**: Use the filter tabs to view All, Active, or Completed tasks
6. **Change theme**: Click the sun/moon icon in the header to switch between light and dark modes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) for the clean and minimal icons