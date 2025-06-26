"use client";
import { formatDate } from "@/lib/utils";
import { SearchIcon, XIcon } from "lucide-react";
import { useDeferredValue, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Author = {
  _id: string;
  name: string;
  title: string;
  portrait?: {
    asset: {
      url: string;
    };
  };
  bio?: string;
};

type Blog = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt: string;
  image?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  author: Author;
  content: any[];
};

const SearchBox = ({
  setOpen,
  blogs,
}: {
  setOpen: (open: boolean) => void;
  blogs: Blog[];
}) => {
  const [search, setSearch] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  const searchTerm = useDeferredValue(search);

  useEffect(() => {
    setFilteredBlogs(
      blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="w-screen h-screen bg-background/50 backdrop-blur-lg fixed top-0 left-0 z-[9999] flex justify-center items-center gap-4 flex-col px-8">
      <div className="max-w-3xl w-full flex flex-col gap-4 mx-auto">
        <XIcon
          size={24}
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setOpen(false)}
        />
        <div className="flex items-center gap-4 border-b px-4 py-2 w-full">
          <SearchIcon size={24} />
          <input
            type="text"
            id="search"
            placeholder="Search blogs"
            className="bg-transparent outline-none text-3xl font-bold"
            value={search}
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
                setSearch("");
              }
            }}
          />
        </div>
        <div>
          {filteredBlogs.map((blog) => (
            <a
              key={`filtered-blog-${blog.slug.current}`}
              className="block py-4 hover:scale-[1.005] will-change-transform scale-100 active:scale-100"
              href={`/blog/${blog.slug.current}`}
            >
              <article>
                <h2 className="text-[28px] font-black leading-none mb-2 text-[--lightLink] dark:text-[--darkLink]">
                  {blog.title}
                </h2>
                <p className="text-[13px] text-gray-700 dark:text-gray-300">
                  {formatDate(blog.publishedAt)}
                </p>
                <p className="mt-1 text-foreground/60 text-sm">
                  {blog.excerpt}
                </p>
              </article>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const BlogSearch = ({ blogs }: { blogs: Blog[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="flex justify-center gap-2 py-2 px-4 border rounded-full absolute bottom-4 left-1/2 -translate-x-1/2 items-center bg-background/50 backdrop-blur-lg outline-none focus-visible:outline-none"
        onClick={() => setOpen(true)}
      >
        <SearchIcon size={16} />
        <span>Search Blogs</span>
      </button>
      {open &&
        createPortal(
          <SearchBox setOpen={setOpen} blogs={blogs} />,
          document.body
        )}
    </>
  );
};
