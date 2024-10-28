# Stepwise - Red Team

> COMP_SCI 392 - Fall 2024 - Northwestern University

## Table of Contents

1. [File Structure and Logic](#1-file-structure-and-logic)
2. [Context](#2-context)
   - [What is Context?](#1-what-is-context)
   - [Why Use Context Instead of Hooks?](#2-why-use-context-instead-of-hooks)
   - [How to Use UserContext](#3-how-to-use-usercontext)
     - [Accessing User Data](#accessing-user-data)
     - [Updating User Data](#updating-user-data)

## 1. File Structure and Logic

This project uses a component-based structure with a focus on clear separation of concerns. Key files and folders:

```
.
├── LICENSE
├── README.md                  # Project documentation and usage guide
├── eslint.config.mjs
├── firebase.json              # Firebase configuration for hosting
├── package.json               # Dependencies
├── src                        # Source code
│   ├── components             # Shared components and features
│   │   └── common             # Common components used across the app
|   |   └── Home               # Home page components
|   |   └── Streak             # Streak page components
│   ├── contexts               # Contexts for managing global app state
│   │   └── UserContext.jsx    # Provides user authentication data globally
│   ├── hooks                  # Custom hooks for specialized logic
│   ├── pages                  # Application pages
│   └── utils                  # Utility functions and Firebase configurations
└── vite.config.js             # Vite configuration for project bundling (shortcuts)
```

The main components and utilities are organized under `src/components` and `src/utils`, while `UserContext` manages user state globally to avoid redundant data fetching.

## 2. Context

### 1. What is Context?

Context is a React feature that enables data sharing across multiple components without needing to pass props manually at every level. It's especially useful for managing global states, like user authentication data, that are needed by many components.

### 2. Why Use Context Instead of Hooks?

In our previous `StudyBuddy` project, we relied on hooks to fetch user data directly from Firebase. This led to extremely high read counts (thousands of reads per second) whenever users navigated across components, quickly exceeding Firebase’s free limits and degrading performance. By centralizing user data with `UserContext`, data is fetched only once per session and remains available globally, reducing Firebase reads and data-fetching costs.

### 3. How to Use UserContext

#### Accessing User Data

1. **Enable Global UserContext**: `UserProvider` has already been implemented to wrap the main application in `App.jsx`. This enables `UserContext` throughout the app.

   ```jsx
   import { UserProvider } from '@contexts/UserContext';

   const App = () => (
     <UserProvider>
       {/* App Components */}
     </UserProvider>
   );
   ```

2. **Access User Data in Components**: Use the `useUser` hook to access user data (anything inside their profile you can all access just by e.g. `user.goals`) and authentication functions in any component:

   ```jsx
   import { useUser } from '@contexts/UserContext';
   
   const MyComponent = () => {
     {/* You can decide what to use from `useUser` */}
     const { user, loading, handleSignIn, handleSignOut } = useUser();
   
     return user ? (
       <div>
         <h1>Welcome, {user.displayName}</h1>
         <button onClick={handleSignOut}>Sign Out</button>
       </div>
     ) : (
       <button onClick={handleSignIn}>Sign In</button>
     );
   };
   ```

#### Updating User Data

Use the `updateProfile` function to update user profile information:

   ```jsx
   const { updateProfile } = useUser();
   updateProfile({ displayName: 'New Name' });
   ```

The `updateProfile` function accepts an object with updated user fields and syncs them with both the context and Firebase, ensuring efficient data sharing across components and reducing the need for direct database access.
