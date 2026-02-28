## 🚀 Project Overview

This dashboard serves as a central hub for academic data, featuring:

- **Analytics Hub**: Visual summaries of student GPA and course enrollments using ApexCharts.
- **Student & Course Management**: Full CRUD capabilities with search, filtering, and pagination.
- **Faculty Panel**: Tools for bulk assignments and grade updates.
- **Dynamic Forms**: Repeatable input fields for complex data entry using a "+" action.

## 🛠 Architecture & Technical Decisions

This project follows a professional and modular structure to ensure the code is clean, scalable, and easy to maintain.

### 1. Modular Folder Structure

All components are stored in a central `components` folder, subdivided by domain to prevent a messy root directory:

- **Dashboard**: Components for charts and analytics summaries.
- **Forms**: Reusable and dynamic form components.
- **Pages**: Specific layouts for the Student, Course, and Analytics views.
- **Providers**: Context and state providers (TanStack Query, Zustand).
- **Shared**: Common UI elements like buttons, inputs, and tables.
- **Barrel Exports**: I use `index.ts` files in each folder to manage imports/exports, keeping the code clean when importing multiple components.

### 2. State Management & Data Fetching

- **Zustand**: A lightweight global state manager used as an "in-memory" database. This allows CRUD actions to reflect immediately in the UI without waiting for a permanent database write.
- **TanStack Query**: Used for optimized data fetching, caching, and managing loading/error states.
- **Custom Hooks**: All CRUD logic (Create, Update, Delete, Fetch) is extracted into custom hooks, making the data logic portable and easy to use in any component.

### 3. Forms and Validation

- **React Hook Form & Zod**: Used together to handle complex, strictly validated forms. This setup supports **dynamic, repeatable fields** (e.g., adding multiple grades) using the `+` action effortlessly.

### 4. UI Components

- **Headless UI**: Used for accessible, unstyled Modals and Sidebars, allowing for full styling control via **Tailwind CSS**.
- **Lucide React**: Integrated for consistent academic iconography.

## Installation

Install Dependencies Download all required packages:

### Prerequisite: Install pnpm

Before installing the project, ensure you have **pnpm** installed globally:

```bash
npm install -g pnpm@latest-10
```

Install Dependencies

```bash
pnpm install
```

Run Mock API Start the JSON server to handle the initial data hydration:

```bash
pnpx json-server -p 5000 -w database/db.json
```

Development Mode Start the Next.js development server with Hot Module Replacement:

```bash
pnpm dev
```

### Build and Production

Build the Project Create an optimized production build:

```bash
pnpm build
```

Start Production Server Run the compiled application:

```bash
pnpm start
```

Once started, you can access the local dashboard at:
[http://localhost:3000](http://localhost:3000)

Live Demo: [https://gain-solution-ltd-task.vercel.app](https://gain-solution-ltd-task.vercel.app)

> ### ⚠️ For the Best Experience: Run Locally
>
> While a live demo is available, the **JSON Server** (Mock API) is required for full data hydration and CRUD functionality. For the most accurate experience including initial data loading from `db.json`, please follow the **Installation & Setup** steps below to run the project on your machine.
