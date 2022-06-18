import React, { useContext } from "react";
import PostForm from "../components/PostForm";
import Posts from "../components/Posts";
import { AuthContext } from "../context/auth";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <PostForm />}
      <Posts />
    </>
  );
};

export default Home;
