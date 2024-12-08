import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const RedditSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRedditPosts = async () => {
      try {
        const response = await fetch(
          "https://www.reddit.com/r/visitingmallorca/new.json"
        );

        if (!response.ok) {
          throw new Error("Error fetching Reddit posts.");
        }

        const data = await response.json();
        // Extraemos los posts
        const redditPosts = data.data.children.map((child) => child.data);
        setPosts(redditPosts);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRedditPosts();
  }, []);

  return (
    <section className="p-4 mb-16">
      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No posts available.</p>
      ) : (
        <div
          className="space-y-4 h-96 overflow-y-scroll p-4 rounded-lg shadow bg-blue-200 bg-opacity-40"
        >
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 border rounded-lg shadow hover:shadow-md transition bg-blue-300 bg-opacity-45"
            >
              <a
                href={`https://www.reddit.com${post.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold hover:underline"
              >
                {post.title}
              </a>
              <p className="text-sm">
                Posted by <span className="font-medium">{post.author}</span> on{" "}
                {new Date(post.created_utc * 1000).toLocaleDateString()}
              </p>
              <p className="text-sm ">
                {post.num_comments} comments
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

RedditSection.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
};

export default RedditSection;
