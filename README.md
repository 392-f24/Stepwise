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
3. [useGoalsUpdater](#3-usegoalsupdater-hook)
   - [Overview](#overview)
   - [Dependencies](#dependencies)
   - [Functions](#functions)
     - [Adding items](#adding-items)
     - [Deleting items](#deleting-items)
     - [Toggle Task Completion](#toggle-task-completion)
     - [Expanding/collapsing items](#expandingcollapsing-items)

## 1. File Structure and Logic

This project uses a component-based structure with a focus on clear separation of concerns. Key files and folders:

```plaintext
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

## 3. useGoalsUpdater Hook

### Overview

The `useGoalsUpdater` custom hook provides functions to manage user goals, microgoals, and tasks by:

1. updating the user's profile, including both goals and (optionally) the streak,
2. adding items (goal, microgoal, task),
3. deleting items (goal, microgoal, task),
4. toggling completion status for tasks with streak updates, and
5. expanding or collapsing goals and microgoals.

This hook enables efficient management of goal-related actions across components, reducing repetitive code and ensuring consistent updates.

### Dependencies

- `useUser`: A custom context hook for accessing and updating the user's profile information, including user goals.

### Functions

#### Adding items

- **addGoal**: Adds a new goal with a specified name.

```jsx
addGoal("New Goal Name");
```
  
- **addMicrogoal**: Adds a new microgoal within a specified goal.

```jsx
addMicrogoal(goalIndex, "New Microgoal Name");
```
  
- **addTask**: Adds a new task within a specified microgoal.  

```jsx
addTask(goalIndex, microGoalIndex, "New Task Name");
```

#### Deleting items

- **deleteGoal**: Deletes a goal.  

```jsx
deleteGoal(goalIndex);
```
  
- **deleteMicrogoal**: Deletes a microgoal within a specified goal.

```jsx
deleteMicrogoal(goalIndex, microGoalIndex);
```
  
- **deleteTask**: Deletes a task within a specified microgoal.

```jsx
deleteTask(goalIndex, microGoalIndex, taskIndex);
```

#### Toggle Task Completion

- **toggleTaskCompletion**: Toggles the completion status of a task and updates the streak accordingly.

```jsx
toggleTaskCompletion(goalIndex, microGoalIndex, taskIndex);
```

#### Expanding/collapsing items

- **toggleGoalExpansion**: Toggles the expansion state of a goal.

```jsx
toggleGoalExpansion(goalIndex);
```
  
- **toggleMicroGoalExpansion**: Toggles the expanded/collapsed state of a microgoal within a specified goal.

```jsx
toggleMicroGoalExpansion(goalIndex, microGoalIndex);
```

These functions directly update the `UserContext`, ensuring consistent data and logging status messages for clear feedback on each action performed.
