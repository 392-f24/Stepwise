// @ts-check

import { useUser } from '@/contexts/UserContext'
import { addGoal, addMicrogoal, addTask } from './addOperations'
import { deleteItem } from './deleteOperations'
import { toggleExpansion, toggleTaskCompletion } from './toggleOperations'

const useGoalsUpdater = () => {
  const { user, updateProfile } = useUser()
  const userContext = { user, updateProfile } // UserContext object

  return {
    /**
     * Adds a new goal to the user's profile.
     * @param {string} goalName - The name of the goal.
     * @param {string} category - HEX color code for the goal category.
     * @returns {Promise<void>}
     */
    addGoal: (goalName, category) => addGoal(userContext, goalName, category),

    /**
     * Adds a new microgoal under a specified goal.
     * @param {number} goalIndex - Index of the goal to add the microgoal to.
     * @param {string} microGoalName - Name of the microgoal.
     * @returns {Promise<void>}
     */
    addMicrogoal: (goalIndex, microGoalName) =>
      addMicrogoal(userContext, goalIndex, microGoalName),

    /**
     * Adds a new task under a specified microgoal.
     * @param {number} goalIndex - Index of the goal.
     * @param {number} microGoalIndex - Index of the microgoal.
     * @param {string} taskName - Name of the task.
     * @param {Date} dueDate - Due date for the task.
     * @returns {Promise<void>}
     */
    addTask: (goalIndex, microGoalIndex, taskName, dueDate) =>
      addTask(userContext, goalIndex, microGoalIndex, taskName, dueDate),

    /**
     * Deletes a specified goal, microgoal, or task.
     * @param {{ goalIndex: number, microGoalIndex?: number, taskIndex?: number }} indices - Indices of items to delete.
     * @returns {Promise<void>}
     */
    deleteItem: (indices) => deleteItem(userContext, indices),

    /**
     * Toggles the completion status of a specified task.
     * @param {number} goalIndex - Index of the goal.
     * @param {number} microGoalIndex - Index of the microgoal.
     * @param {number} taskIndex - Index of the task.
     * @returns {Promise<void>}
     */
    toggleTaskCompletion: (goalIndex, microGoalIndex, taskIndex) =>
      toggleTaskCompletion(userContext, goalIndex, microGoalIndex, taskIndex),

    /**
     * Toggles the expansion status of a specified goal.
     * @param {number} goalIndex - Index of the goal.
     * @returns {Promise<void>}
     */
    toggleGoalExpansion: (goalIndex) => toggleExpansion(userContext, goalIndex),

    /**
     * Toggles the expansion status of a specified microgoal.
     * @param {number} goalIndex - Index of the goal.
     * @param {number} microGoalIndex - Index of the microgoal.
     * @returns {Promise<void>}
     */
    toggleMicroGoalExpansion: (goalIndex, microGoalIndex) =>
      toggleExpansion(userContext, goalIndex, microGoalIndex),

    // Gets list of goals for current user
    goals: user.goals,
  }
}

export default useGoalsUpdater
