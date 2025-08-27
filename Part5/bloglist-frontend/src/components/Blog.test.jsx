import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect, test } from "vitest";

test("blog renders only blog's title and author", () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 1    
  }

  render(<Blog blog={blog} />)
  expect(screen.getByText('Test Blog', { exact: false })).toBeDefined()
  expect(screen.getByText('Test Author', { exact: false })).toBeDefined()
  expect(screen.queryByText('http://test.com', { exact: false })).toBeNull()
})