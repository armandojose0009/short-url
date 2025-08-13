"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [urls, setUrls] = useState([]);

  const fetchUrls = async () => {
    const res = await axios.get("http://localhost:3001/");
    setUrls(res.data);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/", { originalUrl: url });
    setUrl("");
    fetchUrls();
  };

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="flex flex-col items-center min-h-screen gap-6 bg-gray-50 p-6 w-full">
      <div className="bg-white rounded-lg shadow-md p-7 w-96">
        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
          URL Shortener
          <span>🔗</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="text-gray-700">Enter the URL to shorten</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-2 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="URL"
            required
          />
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white rounded px-3 py-2 hover:bg-blue-600"
          >
            Shorten
          </button>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow-md p-7 w-96">
        <h3 className="font-semibold text-lg mb-4">All Shortened URLs</h3>
        <ul className="space-y-2">
          {urls.map((item: any) => {
            const fullUrl = `http://localhost:3001/${item.slug}`;
            return (
              <li key={item.id} className="flex items-center justify-between">
                <a
                  href={fullUrl}
                  target="_blank"
                  className="text-blue-600 underline truncate max-w-[200px]"
                >
                  {fullUrl}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(fullUrl)}
                  className="bg-gray-100 px-2 py-1 rounded shadow hover:bg-gray-200"
                >
                  📋
                </button>
              </li>
            );
          })}
        </ul>
        {copied && <div className="mt-2 text-xs text-green-500">Copied!</div>}
      </div>
    </div>
  );
}
