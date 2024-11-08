// @ts-check

import { useUser } from '@/contexts/UserContext'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import useGoalsUpdater from './useGoalsUpdater'

// Mock only `useUser`
vi.mock('@/contexts/UserContext', () => ({
  useUser: vi.fn(),
}))

describe('useGoalsUpdater', () => {
  let user
  let updateProfile
  let goalsUpdater

  beforeEach(() => {
    // Mock user context data with correct structure
    user = {
      uid: 'test-user-id',
      profilePic: 'test-pic-url',
      name: 'Test User',
      goals: [], // Start with an empty goals array
      streak: [],
    }

    updateProfile = vi.fn(async (updates) => {
      // Merge updates into the mock user object
      Object.assign(user, updates)
    })

    // @ts-ignore
    useUser.mockReturnValue({
      user,
      updateProfile,
    })

    goalsUpdater = useGoalsUpdater() // Initialize the hook instance
  })

  it('should add a new goal', async () => {
    const goalName = 'New Goal'
    const category = '#FFFFFF'
    await goalsUpdater.addGoal(goalName, category)

    // Check if the goal was added to the user's goals array
    expect(user.goals).toContainEqual({
      name: goalName,
      category,
      microgoals: [],
    })

    // Verify that updateProfile was called with updated user data
    expect(updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        goals: user.goals,
      })
    )
  })

  it('should add a new task with the correct due date format', async () => {
    const goalIndex = 0
    const microGoalIndex = 0
    const taskName = 'New Task'
    const dueDate = new Date()

    // Add initial goal and microgoal to user data
    user.goals.push({
      name: 'Goal 1',
      category: '#000000',
      expanded: false,
      microgoals: [{ name: 'MicroGoal 1', expanded: false, tasks: [] }],
    })

    await goalsUpdater.addTask(goalIndex, microGoalIndex, taskName, dueDate)

    const addedTask = user.goals[goalIndex].microgoals[microGoalIndex].tasks[0]
    expect(addedTask.name).toBe(taskName)
    expect(addedTask.completed).toBe(false)
    expect(addedTask.due.toDate()).toEqual(dueDate) // Convert Timestamp to Date for comparison

    expect(updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        goals: user.goals,
      })
    )
  })

  it('should toggle task completion status and update streak', async () => {
    const goalIndex = 0
    const microGoalIndex = 0
    const taskIndex = 0

    // Add initial goal, microgoal, and task to user data
    user.goals.push({
      name: 'Goal 1',
      category: '#000000',
      expanded: false,
      microgoals: [
        {
          name: 'MicroGoal 1',
          expanded: false,
          tasks: [{ name: 'Task 1', completed: false }],
        },
      ],
    })

    await goalsUpdater.toggleTaskCompletion(
      goalIndex,
      microGoalIndex,
      taskIndex
    )

    const task =
      user.goals[goalIndex].microgoals[microGoalIndex].tasks[taskIndex]
    expect(task.completed).toBe(true)

    // Check user.streak.completedDays length is 1
    expect(Object.keys(user.streak.completedDays)).toHaveLength(1)
  })

  it('should delete a specified task', async () => {
    const goalIndex = 0
    const microGoalIndex = 0
    const taskIndex = 0

    // Add initial goal, microgoal, and task to user data
    user.goals.push({
      name: 'Goal 1',
      category: '#000000',
      expanded: false,
      microgoals: [
        {
          name: 'MicroGoal 1',
          expanded: false,
          tasks: [{ name: 'Task 1', completed: false }],
        },
      ],
    })

    await goalsUpdater.deleteItem({ goalIndex, microGoalIndex, taskIndex })

    expect(user.goals[goalIndex].microgoals[microGoalIndex].tasks).toHaveLength(
      0
    )
    expect(updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        goals: user.goals,
      })
    )
  })

  it('should delete a specified microgoal', async () => {
    const goalIndex = 0
    const microGoalIndex = 0

    // Add initial goal and microgoal to user data
    user.goals.push({
      name: 'Goal 1',
      category: '#000000',
      expanded: false,
      microgoals: [{ name: 'MicroGoal 1', expanded: false, tasks: [] }],
    })

    await goalsUpdater.deleteItem({ goalIndex, microGoalIndex })

    expect(user.goals[goalIndex].microgoals).toHaveLength(0)
    expect(updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        goals: user.goals,
      })
    )
  })

  it('should delete a specified goal', async () => {
    const goalIndex = 0

    // Add initial goal to user data
    user.goals.push({
      name: 'Goal 1',
      category: '#000000',
      expanded: false,
      microgoals: [],
    })

    await goalsUpdater.deleteItem({ goalIndex })

    expect(user.goals).toHaveLength(0)
    expect(updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        goals: user.goals,
      })
    )
  })
})
