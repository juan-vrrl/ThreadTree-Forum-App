/**
 * skenario testing
 *
 * - ThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call addThread function when the button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import ThreadInput from './ThreadInput';

expect.extend(matchers);

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const titleInput = screen.getByPlaceholderText('Title ...');

    // Action
    await userEvent.type(titleInput, 'Test Title');

    // Assert
    expect(titleInput).toHaveValue('Test Title');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const categoryInput = screen.getByPlaceholderText('Category ...');

    // Action
    await userEvent.type(categoryInput, 'Test Category');

    // Assert
    expect(categoryInput).toHaveValue('Test Category');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const bodyTextarea = screen.getByPlaceholderText('Express your mind here ...');
    const bodyLengthElement = screen.getByText((content, element) => element.className.includes('body-length'));

    // Action
    await userEvent.type(bodyTextarea, 'Test Body');

    // Assert
    expect(bodyTextarea).toHaveValue('Test Body');
    expect(bodyLengthElement).toHaveTextContent('9');
  });

  it('should call addThread function when the button is clicked', async () => {
    // Arrange
    const mockAddThread = vi.fn();
    render(<ThreadInput addThread={mockAddThread} />);
    const titleInput = screen.getByPlaceholderText('Title ...');
    const categoryInput = screen.getByPlaceholderText('Category ...');
    const bodyTextarea = screen.getByPlaceholderText('Express your mind here ...');
    const addButton = screen.getByRole('button', { name: /Create Thread Branch/i });

    // Action
    await userEvent.type(titleInput, 'Test Title');
    await userEvent.type(categoryInput, 'Test Category');
    await userEvent.type(bodyTextarea, 'Test Body');
    await userEvent.click(addButton);

    // Assert
    expect(mockAddThread).toHaveBeenCalledWith('Test Title', 'Test Body', 'Test Category');
    expect(titleInput).toHaveValue('');
    expect(categoryInput).toHaveValue('');
    expect(bodyTextarea).toHaveValue('');
  });

  it('should not allow typing more than 1500 characters', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const bodyTextarea = screen.getByPlaceholderText('Express your mind here ...');

    // Action
    await userEvent.type(bodyTextarea, 'a'.repeat(1501));

    // Assert
    // Testing membutuhkan waktu sekitar 30 detik di PC saya
    expect(bodyTextarea).toHaveValue('a'.repeat(1500));
  }, 30000);
});
