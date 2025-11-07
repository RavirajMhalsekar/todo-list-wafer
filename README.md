# Todo List App with Next.js and Firebase

A modern, responsive Todo List application built with Next.js 13+ (App Router), TypeScript, and Firebase. Features include user authentication, real-time updates, and a clean, intuitive interface.

## Features

- 🔐 User Authentication with Firebase
- ✨ Modern UI with a dark theme
- 📱 Fully Responsive Design
- ✅ Create, Read, Update, and Delete Todos
- 🔍 Search and Filter Todos
- 🔄 Real-time Updates
- 📝 Rich Text Description
- 🎯 Mark Todos as Complete/Incomplete

## Tech Stack

- **Frontend Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Styling**: CSS Modules
- **Hosting**: Vercel (recommended)

## Getting Started

Before you begin, ensure you have the following installed:
- Node.js (v16.x or higher)
- npm or yarn
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/RavirajMhalsekar/todo-list-wafer.git
cd todo-list-wafer
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password and Google Sign-in)
4. Create a Firestore database
5. Get your Firebase configuration:
   - Go to Project Settings
   - Scroll down to "Your apps"
   - Click on the Web icon (</>)
   - Register your app
   - Copy the Firebase configuration object

### 4. Environment Variables

1. Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in your Firebase configuration values in `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
todo-list-wafer/
├── app/                    # Next.js app directory
│   ├── components/        # Reusable components
│   ├── contexts/         # React contexts
│   ├── add-todo/        # Add todo page
│   ├── auth/            # Authentication page
│   ├── todo/            # Individual todo page
│   └── page.tsx         # Home page
├── firebase/             # Firebase configuration and utilities
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

## Core Features

### Authentication
- Email/Password authentication
- Google Sign-in
- Protected routes
- Persistent authentication state

### Todo Management
- Create new todos with title and description
- Mark todos as complete/incomplete
- Delete todos
- View detailed todo information
- Search and filter todos
- Sort by date or title

### Real-time Updates
- Changes are reflected immediately
- Firestore real-time listeners
- Optimistic UI updates

## Deployment

### Deploy to Vercel

The easiest way to deploy this app is to use [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Import your project to Vercel
3. Add your environment variables in the Vercel project settings
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you have any questions or need help, please open an issue in the repository.
