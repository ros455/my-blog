import React from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { AddComments } from '../AddComments/AddComments';
import comment from './comments.css'
import { selectIsAuth } from "../../store/auth";
import { useSelector } from 'react-redux';
export const Comments = () => {
  const [data, setData] = React.useState();
  const [comment,setComment] = React.useState([]);
  const {id} = useParams();
  const isAuth = useSelector(selectIsAuth);
  React.useEffect(() => {
    axios
      .get(`/posts/${id}/comments`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error");
      });
  }, []);

  React.useEffect(() => {
    if(data) {
      let arr = []
      data.forEach((el) => {
        if(id == el.post) {
          arr.push(el)
        }
        setComment(arr)
      })
    }
  },[data])
  console.log('comment',comment)
  return (
    <div className='main-comments-wrapper'>
      {isAuth && <AddComments />}
      {comment &&
        comment.map((el) => (
          <div key={el._id} className="comments-wrapper">
            <div className="comment">
              <div className="comment-img-wrapper">
                <img
                  src={`http://localhost:5555${el.user.avatarUrl}`}
                  className="comment-img"
                />
              </div>
              <p className="comment-user">{el.user.fullName}</p>
              <p className='comment-date'>{el.createdAt.substring(0,10)}</p>
            </div>
            <p className="comment-text">{el.text}</p>
          </div>
        ))}
    </div>
  );
}
