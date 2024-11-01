import { UserProvider } from '@contexts/UserContext';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import App from './App';

describe('Check data before user logged in', () => {
  test('Should show message when user is not logged in', async () => {
    render(
      <UserProvider>
        <App />
      </UserProvider>,
    );

    // Use `waitFor` to ensure the message appears after any async updates.
    await waitFor(() => {
      const message = screen.getByText('Please sign in to view this page');
      expect(message).toBeTruthy();
    });
  });

  test('Should redirect to Streak page when clicked on Streak tab', async () => {
    render(
      <UserProvider>
        <App />
      </UserProvider>,
    );

    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    // Click the "Streak" tab
    await act(async () => {
      fireEvent.click(screen.getByText(/streak/i));
    });

    // Verify that the URL has changed to "/streak"
    await waitFor(() => {
      expect(window.location.pathname).to.equal('/streak');
    });
  });

  test('Should able to redirect back to Home page from Streak page', async () => {
    render(
      <UserProvider>
        <App />
      </UserProvider>,
    );

    // Wait for the loading spinner to disappear
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).toBeNull();
    });

    // Click the "Streak" tab
    await act(async () => {
      fireEvent.click(screen.getByText(/streak/i));
    });

    // Verify that the URL has changed to "/streak"
    await waitFor(() => {
      expect(window.location.pathname).to.equal('/streak');
    });

    // Click the "Home" tab
    await act(async () => {
      fireEvent.click(screen.getByText(/home/i));
    });

    // Verify that the URL has changed to "/"
    await waitFor(() => {
      expect(window.location.pathname).to.equal('/');
    });
  });
});
