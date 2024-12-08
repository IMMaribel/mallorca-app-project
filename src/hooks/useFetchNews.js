import { useEffect, useState } from "react";

const useFetchNews = (url) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error al obtener las noticias.");
        }

        const data = await response.json();
        setNews(data.articles || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [url]);

  return { news, loading };
};

export default useFetchNews;
