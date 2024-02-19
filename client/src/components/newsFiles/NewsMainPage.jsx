import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NewsMainPage() {
  const [currentNews, setCurrentNews] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=276cc42f53d4445c8693ca2fcb872dd2"
      )
      .then((response) => {
        console.log(response.data);
        const latestNews = response.data["articles"].slice(0, 5);
        setCurrentNews([...latestNews]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {/* news container */}
      <div className="bg-slate-900 rounded-xl min-h-max flex flex-col space-y-8 h-3/4">
        {/* heading */}
        <div className="text-2xl font-semibold text-center pt-4">
          Current News
        </div>

        {currentNews.map((news) => {
          return (
            <>
              {/* news card */}
              <div className="bg-slate-800 m-4 p-4 space-y-4 rounded-xl hover:md:scale-105 hover:-translate-y-1 transition duration-300 hover:shadow-slate-300 shadow-sm">
                <img
                  src={news.urlToImage}
                  alt="news-img"
                  className="rounded-lg object-cover shadow-lg"
                />
                <div className="opacity-50 font-light text-sm">
                  {news.title}
                </div>
                <div className="opacity-80 font-light text-xs">
                  {news.author}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
