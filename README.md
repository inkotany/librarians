# Librarians Panel – Library Management System

This project is a **Library Management System** designed for librarians to efficiently manage books, students, and borrowing activities. Built with [Next.js](https://nextjs.org), it provides a modern, responsive interface for daily library operations.

## Features

- 📚 **Book Management:** Add, edit, and remove books from the library catalog.
- 👩‍🎓 **Student Management:** Register students and manage their borrowing history.
- 🔄 **Borrowing & Returns:** Track which students have borrowed or returned books, with due dates and overdue alerts.
- 📊 **Analytics Dashboard:** Visualize top borrowed books and borrowing trends.
- 🔍 **Search & Filter:** Quickly find books or students using advanced search and filtering.
- 🛡️ **Authentication:** Secure login for librarians.

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the panel.

## Project Structure

- `app/` – Main Next.js application code
- `components/` – Reusable UI components
- `lib/` – Utility functions and helpers
- `prisma/` – Database schema and queries
- `public/` – Static assets

## Technologies Used

- **Next.js** – React framework for server-side rendering and routing
- **TypeScript** – Type safety across the codebase
- **Prisma** – ORM for database management
- **Tailwind CSS** – Utility-first CSS framework
- **React Query** – Data fetching and caching
- **Recharts** – Data visualization

## Environment Variables

Create a `.env` file in the root directory and configure your database and other secrets as needed.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

*Built for librarians to make library management
