import React from "react";
import { AiFillEye } from "react-icons/ai";
import { Loading } from "../Loading/Loading";
import { Link } from "react-router-dom";
import { BsPencilFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { fetchRemovePost } from "../../store/posts";
import { useDispatch } from "react-redux";
import post from './post.css';
import { User } from "../User/User";

export const Post = ({ id, title, createdAt, viewsCount, text, isFullPost,isPostsLoading, user,isEditable, imageUrl, children }) => {
  const dispatch = useDispatch();
    
    const onClickRemove = () => {
      if(window.confirm('Вы действительно хотите удалить статью?')) {
        dispatch(fetchRemovePost(id));
      }
    };
  return (
    <>
      <div>
        <div className="title-wrapper">
          {isFullPost ? (
            <h1>{title}</h1>
          ) : (
            <Link to={`/posts/${id}`} className="post-link-title">
              <h1 className="post-title">{title}</h1>
            </Link>
          )}
        </div>
        <div className="edit-avatar-wrapper">
          {user ? (
            <User
              image={user.avatarUrl}
              fullName={user.fullName}
              email={user.email}
            />
          ) : (
            ""
          )}
          {isEditable && (
            <div className="change-delete">
              <button onClick={onClickRemove}>
                <AiFillDelete className="AiFillDelete" />
              </button>
              <Link to={`/posts/${id}/edit`}>
                <p>
                  <BsPencilFill className="BsPencilFill" />
                </p>
              </Link>
            </div>
          )}
        </div>
        {isFullPost ? (
          <div className="post-image">
            {imageUrl ? (
              <img src={imageUrl} />
            ) : (
              <img className="non-image" src="/img/not-image.png"></img>
            )}
          </div>
        ) : (
          <Link to={`/posts/${id}`}>
            <div className="post-image">
              {imageUrl ? (
                <img src={imageUrl} />
              ) : (
                <img className="non-image" src="/img/not-image.png"></img>
              )}
            </div>
          </Link>
        )}
        {isFullPost ? (
          <div>{children && <>{children}</>}</div>
        ) : (
          <div className="text-wrapper">{children && <>{children}</>}</div>
        )}
        <div>Дата створення: {createdAt}</div>
        <p>
          <AiFillEye /> {viewsCount}
        </p>
      </div>
    </>
  );
};

