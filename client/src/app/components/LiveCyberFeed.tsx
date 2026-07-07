"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import {
  ShieldAlert,
  ExternalLink,
  Loader2,
  Newspaper,
} from "lucide-react";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image?: string;
  source: string;
  publishedAt: string;
}

export default function LiveCyberFeed() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchNews() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/news`
      );

      const data = await res.json();

      setNews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews();

    const interval = setInterval(fetchNews, 1000 * 60 * 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">

      <div className="text-center mb-12">

        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">

          <ShieldAlert className="h-4 w-4 text-blue-400" />

          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Live Cyber Threat Feed
          </span>

        </div>

        <h2 className="mt-5 text-4xl font-bold text-white">
          Latest Cybersecurity News
        </h2>

        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
          Stay updated with the latest cyber attacks, phishing campaigns,
          ransomware incidents, vulnerabilities and security advisories.
        </p>

      </div>

      {loading ? (
        <div className="flex justify-center py-16">

          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />

        </div>
      ) : (
        <Marquee
          speed={45}
          pauseOnHover
          gradient={false}
        >
          {news.map((article, index) => (
            <div
              key={index}
              className="mx-4 w-[380px] rounded-2xl border border-gray-800 bg-[#111827] overflow-hidden shadow-xl hover:border-blue-500/40 transition-all duration-300"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-52 w-full object-cover"
                />
              )}

              <div className="p-6">

                <div className="flex justify-between items-center mb-4">

                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                    {article.source}
                  </span>

                  <Newspaper className="h-5 w-5 text-blue-400" />

                </div>

                <h3 className="text-lg font-bold text-white line-clamp-2">

                  {article.title}

                </h3>

                <p className="mt-4 text-sm text-gray-400 line-clamp-3">

                  {article.description}

                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span className="text-xs text-gray-500">

                    {new Date(article.publishedAt).toLocaleDateString()}

                  </span>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition"
                  >
                    Read
                    <ExternalLink className="h-4 w-4" />
                  </a>

                </div>

              </div>
            </div>
          ))}
        </Marquee>
      )}
    </section>
  );
}