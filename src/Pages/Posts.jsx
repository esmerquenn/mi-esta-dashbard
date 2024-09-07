import React from "react";
import { ShowPosts } from "../components/Posts/ShowPosts";
import { Link } from "react-router-dom";
import { Button } from "antd";

function Posts() {
  return (
    <div>
      <div className="flex items-center  my-5 gap-4 justify-end">
        <Link to="/posts/add">
          <Button variant="gradient">Post əlavə et</Button>
        </Link>
      </div>
      <ShowPosts />
    </div>
  );
}

export default Posts;
