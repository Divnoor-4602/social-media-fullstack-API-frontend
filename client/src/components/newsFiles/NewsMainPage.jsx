import React, { useEffect } from "react";
import axios from "axios";

const newsEndpoint = "https://newsapi.org/v2/top-headlines";

export default function NewsMainPage() {
  useEffect(() => {
    axios.get(newsEndpoint, {
      params: {
        country: "in",
        page: 1,
      },
    });
  });

  return <div>NewsMainPage</div>;
}
