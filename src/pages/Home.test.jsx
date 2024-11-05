import { UserProvider } from '@/contexts/UserContext'
import Home from '@/pages/Home'
import { act, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

// Mock `@contexts/UserContext` to control user profile and updates
vi.mock('@/contexts/UserContext', async () => {
  const actual = await vi.importActual('@/contexts/UserContext')
  let mockUserProfile = {
    uid: '123',
    profilePic: '',
    name: 'Test User',
    goals: [],
    streak: [],
  }

  return {
    ...actual,
    useUser: () => ({
      user: mockUserProfile,
      loading: false,
      updateProfile: vi.fn((updates) => {
        mockUserProfile = { ...mockUserProfile, ...updates }
      }),
    }),
  }
})

describe('Home Screen - No Goals', () => {
  beforeEach(() => {
    // Reset mockUserProfile for each test
    vi.clearAllMocks()
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
    const newGoalInput = screen.getByLabelText('New Goal')
    expect(newGoalInput).not.to.be.null

    // Ensure "New Microgoal" and "New Task" fields are not present initially
    expect(screen.queryByLabelText('New Microgoal')).to.be.null
    expect(screen.queryByLabelText('New Task')).to.be.null
  })
})
