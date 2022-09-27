import React from "react";
import addcomments from "./addcomments.css";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
export const AddComments = () => {
  const { id } = useParams();
  const [text, setText] = React.useState("");

  const onSubmit = async () => {
    try {
      const fields = {
        text,
      };
      const data = await axios.post(`/posts/${id}`, fields);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создание статьи!");
    }
  };

  return (
    <>
      <form className="add-comments-form">
        <label className="comment-wrapper">
          <textarea
            className="add-comments-input"
            placeholder="Ваш коментар..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
        <Button type="submit" onClick={onSubmit}>
          Відправити
        </Button>
      </form>
    </>
  );
};
