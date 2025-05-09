import React, { useState, useEffect } from "react";
import "./Blogsfilter.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Navbar/Navbar";
import FooterForAllPage from "../../../FooterForAllPage/FooterForAllPage";

import blog1 from "../../../assest/all1.jpeg";
import blog2 from "../../../assest/all2.jpeg";
import blog3 from "../../../assest/all3.jpeg";
import blog4 from "../../../assest/all4.jpeg";
import blog5 from "../../../assest/all5.jpeg";
import blog6 from "../../../assest/all6.jpeg";
import { API_BASE_URL } from "../../../config";
import ClipLoader from "react-spinners/ClipLoader";

const override={
  display: "block",
  textAlign: "center"
}

const BlogFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAuthor, setSelectedAuthor] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Latest");
  const [activeTab, setActiveTab] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("Latest");
  const [category, setCategory] = useState("All");
  const [author, setAuthor] = useState("All");
  const navigate = useNavigate();
  const categories = [
    "All", "Trending", "Stock Market",
    "Commodity", "Equity", "Gold", "PMS",
  ];
  const authors = ["Author 1","Author 2"];
  const sortOptions = ["Latest", "Old"];
  const blogImages = {
    1: blog1,
    2: blog2,
    3: blog3,
    4: blog4,
    5: blog5,
    6: blog6,
  };

 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/blogs`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const blogsWithImages = result.data.map((blog, index) => ({
          ...blog,
          image: blogImages[index + 1] || blog1,
        }));
        setBlogs(blogsWithImages);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blogpmscard/${id}`);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const filteredBlogs = blogs.filter((blog) => {
    return (
      (category === "All" || blog.category === category) &&
      (author === "All" || blog.author === author)
    );
  });

  const sortedBlogs = filteredBlogs.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return sortBy === "Latest" ? dateB - dateA : dateA - dateB;
  });

  if (loading) return <div className="loader-cont">
        <ClipLoader
          cssOverride={override}
          size={35}
          data-testid="loader"
          loading={loading}
          speedMultiplier={1}
          color="green"
        />
      </div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <div className="blogFilterContainer">
        <h3 className="blogFilterTitle">Blogs / {category}</h3>

        <div className="filterDropdowns flex flex-col gap-2 md:flex-row">
  <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="blogfdropdoenn w-40 md:w-60">
    <option value="Latest">Sort By: Latest</option>
    <option value="Oldest">Sort By: Oldest</option>
  </select>

  <select onChange={(e) => setCategory(e.target.value)} value={category} className="blogfdropdoenn w-40 md:w-60">
    <option value="All">Category: All</option>
    <option value="PMS">PMS</option>
    <option value="Trending">Trending</option>
    <option value="Equity">Equity</option>
    <option value="Commodity">Commodity</option>
    <option value="Stock Market">Stock Market</option>
    <option value="Gold">Gold</option>
  </select>

  <select onChange={(e) => setAuthor(e.target.value)} value={author} className="blogfdropdoenn w-40 md:w-60">
    <option value="All">Author: All</option>
    <option value="Author1">Author 1</option>
    <option value="Author2">Author 2</option>
  </select>
</div>

        <div className="blogListall">
          {sortedBlogs.map(({ id, image, title, category, created_at }) => (
            <div
              key={id}
              className="blogCardall"
              onClick={() => handleBlogClick(id)}
              style={{ cursor: "pointer" }}
            >
              <div className="blogContentssall">
                <div className="blogCategoryall">
                 {category}
                </div>
                <div className="blogTitleall">{title}</div>
                <div className="blogDateall">{formatDate(created_at)}</div>
              </div>
              <div className="blogImageContainerall">
                <img src={image} alt={title} className="blogImageall" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>
  );
};

export default BlogFilter;