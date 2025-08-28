import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import Blog from "./Blog";

describe('Blog', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 1    
  }

  test("renders only blog's title and author", () => {
    render(<Blog blog={blog} />)

    expect(screen.getByText('Test Blog', { exact: false })).toBeDefined()
    expect(screen.getByText('Test Author', { exact: false })).toBeDefined()
    expect(screen.queryByText('http://test.com', { exact: false })).toBeNull()
  })

  test("renders url and likes after clicking button", async () => {
    const user = userEvent.setup()

    render(<Blog blog={blog} />)
    
    const button = screen.getByText('show more')
    await user.click(button)

    expect(screen.getByText('http://test.com', { exact: false })).toBeDefined()
    expect(screen.getByText('likes 1', { exact: false })).toBeDefined()
  })

  test("clicking like twice calls event handler twice", async () => {
    const mockLikeHandler = vi.fn()
    const user = userEvent.setup()

    render(<Blog blog={blog} likeBlog={mockLikeHandler} />)

    const buttonShow = screen.getByText('show more')
    await user.click(buttonShow)

    const buttonLike = screen.getByText('like')
    await user.click(buttonLike)
    await user.click(buttonLike)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})
