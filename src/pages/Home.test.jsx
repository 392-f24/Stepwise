import { UserProvider } from '@/contexts/UserContext'
import Home from '@/pages/Home'
import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, test, vi } from 'vitest'

// Define mock data and functions directly
let mockUserProfile = {
  uid: '123',
  profilePic: '',
  name: 'Test User',
  goals: [],
  streak: { completedDays: {}, count: 0 },
}

const mockUpdateProfile = vi.fn((updates) => {
  mockUserProfile = { ...mockUserProfile, ...updates }
})

// Mock `@contexts/UserContext` to control user profile and updates
vi.mock('@/contexts/UserContext', () => ({
  UserProvider: ({ children }) => <>{children}</>,
  useUser: () => ({
    user: mockUserProfile,
    loading: false,
    updateProfile: mockUpdateProfile,
  }),
}))

describe('Home Screen - No Goals', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset mockUserProfile to its initial state before each test
    mockUserProfile = {
      uid: '123',
      profilePic: '',
      name: 'Test User',
      goals: [],
      streak: { completedDays: {}, count: 0 },
    }
  })

  test('Displays only "New Goal" field when there are no goals', async () => {
    await act(async () => {
      render(
        <UserProvider>
          <Home />
        </UserProvider>
      )
    })

    // Check if "New Goal" text field is present
    expect(screen.getByLabelText('New Goal')).toBeTruthy()

    // Ensure "New Microgoal" and "New Task" fields are not present initially
    expect(screen.queryByLabelText('New Microgoal')).toBeNull()
    expect(screen.queryByLabelText('New Task')).toBeNull()
  })
})
