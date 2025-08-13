"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [list, setList] = useState<
    { id: number; original: string; slug: string }[]
  >([]);
  const [shortUrl, setShortUrl] = useState("");

  const fetchUrls = async () => {
    try {
      const res = await axios.get("http://localhost:3001/urls");
      setList(res.data);
    } catch (error) {
      console.error("Error fetching URLs", error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/urls", {
        originalUrl: url,
      });
      setShortUrl(`http://localhost:3001/urls/${res.data.slug}`);
      setUrl("");
      fetchUrls();
    } catch (error) {
      console.error("Error creating short URL", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">URL Shortener</h1>

      <form onSubmit={submit} className="flex w-full max-w-md space-x-2 mb-6">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL"
          required
          className="flex-grow rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
        >
          Shorten
        </button>
      </form>

      {shortUrl && (
        <div className="mb-6 text-green-700">
          Short URL:{" "}
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {shortUrl}
          </a>
        </div>
      )}

      <section className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3">All URLs</h2>
        <ul className="space-y-2">
          {list.map(({ id, original, slug }) => (
            <li
              key={id}
              className="bg-white rounded p-3 shadow-sm hover:shadow-md transition"
            >
              <div className="truncate">
                <span className="font-medium text-gray-800">{original}</span>
              </div>
              <a
                href={`http://localhost:3001/urls/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                http://localhost:3001/urls/{slug}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
