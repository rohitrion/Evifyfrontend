import React, { useState, useEffect } from "react";
import axios from "axios";

const RandomDataComponent = () => {
  const [randomData, setRandomData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRandomData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=50");
        setRandomData(response.data);
      } catch (error) {
        console.error("Error fetching random data:", error.message);
      }
    };

    fetchRandomData();
  }, []); // Empty dependency array to ensure useEffect runs only once

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = randomData.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Random Data:</h2>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={handleSearch}
      />
      {filteredData.length > 0 ? (
        filteredData.map((post) => (
          <div key={post.id}>
            <p>Title: {post.title}</p>
            <p>Body: {post.body}</p>
          </div>
        ))
      ) : (
        <p>No matching posts found.</p>
      )}
    </div>
  );
};

export default RandomDataComponent;
