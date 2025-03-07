import { useEffect, useState } from 'react';
import BlogItem from '../BlogItem';
import './index.css';

const BlogList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogsData, setBlogsData] = useState([]);

  useEffect(() => {
    const getBlogsData = async () => {
      const response = await fetch('https://apis.ccbp.in/blogs');
      const data = await response.json();
      const formattedData = data.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        imageUrl: eachItem.image_url,
        avatarUrl: eachItem.avatar_url,
        author: eachItem.author,
        topic: eachItem.topic,
      }));
      setBlogsData(formattedData);
      setIsLoading(false);
    };

    getBlogsData();
  }, []);

  return (
    <div className="blogs-list-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="blogs-list">
          {blogsData.map(eachBlogItem => (
            <BlogItem key={eachBlogItem.id} blogItemDetails={eachBlogItem} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;