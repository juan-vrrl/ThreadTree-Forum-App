import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import CommentInput from './CommentInput';

expect.extend(matchers);

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle content type correctly', async () => {
    // Arrange
    render(<CommentInput onComment={() => {}} />);
    const textarea = await screen.getByPlaceholderText('Write comment here ...');
    const commentLengthElement = screen.getByText((content, element) => element.className.includes('comment-length'));

    // Action
    await userEvent.type(textarea, 'This is a test comment');

    // Assert
    expect(textarea).toHaveValue('This is a test comment');
    expect(commentLengthElement).toHaveTextContent('22');
  });

  it('should call onComment function with content when reply button is clicked', async () => {
    // Arrange
    const mockOnComment = vi.fn();
    render(<CommentInput onComment={mockOnComment} />);
    const textarea = await screen.getByPlaceholderText('Write comment here ...');

    // Action
    await userEvent.type(textarea, 'This is a test comment');
    const replyButton = await screen.getByRole('button', { name: 'Reply' });
    await userEvent.click(replyButton);

    // Assert
    expect(mockOnComment).toHaveBeenCalledWith('This is a test comment');
  });

  it('should not allow typing more than 500 characters', async () => {
    // Arrange
    render(<CommentInput onComment={() => {}} />);
    const textarea = await screen.getByPlaceholderText('Write comment here ...');

    // Action
    await userEvent.type(textarea, 'a'.repeat(501));

    // Assert
    // Testing membutuhkan waktu sekitar 10 detik di PC saya
    expect(textarea).toHaveValue('a'.repeat(500));
  }, 10000);
});
