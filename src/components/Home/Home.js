import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/posts";
import { Loading } from "../Loading/Loading";
import { Post } from "../Post/Post";
import home from "./home.css";

export const Home = () => {
  const [number, setNumber] = React.useState(10);
  const [slicePost, setSlicePost] = React.useState([]);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const post = [...posts.items];
  post.reverse();

  const url = useSelector((state) => state.url.url);

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  React.useEffect(
    (e) => {
      document.addEventListener("scroll", scrollHandller);

      return function () {
        document.removeEventListener("scroll", scrollHandller);
      };
    },
    [number]
  );

  React.useEffect(() => {
    let bool = number > post.length;

    let difference = 0;
    let res = 0;

    if (bool && number != 0 && post.length != 0) {
      difference = number - post.length;
      res = number - difference;
      setNumber(res);
    }

    if (
      slicePost.length == post.length &&
      slicePost.length != 0 &&
      post.length != 0
    ) {
      return;
    } else {
      let arr = [];

      for (let i = 0; i < number; i++) {
        if (post[i] != undefined) {
          arr.push(post[i]);
        }
      }

      setSlicePost([...arr]);
    }
  }, [posts, number]);

  const scrollHandller = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      addToArray();
    }
  };

  const addToArray = () => {
    if (
      slicePost.length == post.length &&
      slicePost.length != 0 &&
      post.length != 0
    ) {
      return;
    } else {
      setNumber(number + 10);
    }
  };

  if (slicePost[0] != undefined && slicePost.length <= post.length) {
    return (
      <>
        {slicePost.map((el, index) => (
          <div key={index} className="home-post-wrapper">
            <div className="post-wrapper">
              <Post
                key={index}
                id={el._id}
                title={el.title}
                createdAt={el.createdAt.substring(0, 10)}
                viewsCount={el.viewsCount}
                user={el.user}
                imageUrl={el.imageUrl ? `${url}${el.imageUrl}` : ""}
              />
            </div>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <Loading/>
    )
  }
};
