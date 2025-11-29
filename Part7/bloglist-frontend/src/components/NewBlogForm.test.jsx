import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import NewBlogForm from "./NewBlogForm";

describe("NewBlogForm", async () => {
  test("calls event handler with the right details when a new blog is created", async () => {
    const mockCreateBlog = vi.fn();
    const user = userEvent.setup();

    render(<NewBlogForm createBlog={mockCreateBlog} />);

    const inputTitle = screen.getByPlaceholderText("A catchy title...");
    const inputAuthor = screen.getByPlaceholderText("Author name...");
    const inputUrl = screen.getByPlaceholderText("http://...");
    const sendButton = screen.getByText("create");

    await user.type(inputTitle, "test title");
    await user.type(inputAuthor, "test author");
    await user.type(inputUrl, "test url");

    await user.click(sendButton);

    expect(mockCreateBlog.mock.calls).toHaveLength(1);
    expect(mockCreateBlog.mock.calls[0][0]).toEqual({
      title: "test title",
      author: "test author",
      url: "test url",
    });
  });
});
