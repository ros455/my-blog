import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { Comments } from '../Comments/Comments';
import { Post } from '../Post/Post';
import ReactMarkdown from 'react-markdown';
import fullPost from './fullPost.css'
export const FullPost = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const {id} = useParams();

    React.useEffect(() => {
        axios
          .get(`/posts/${id}`)
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.warn(err);
            alert("Error");
          });
      }, []);
      
  return (
    <>
        <div className='full-wrapper'>
        <div className='full-post-wrapper'>
        {data ? <Post
        title={data.title}
        // text={data.text}
        createdAt={data.createdAt.substring(0,10)}
        viewsCount={data.viewsCount}
        user={data.user}
        imageUrl={data.imageUrl ? `http://localhost:5555${data.imageUrl}` : ''}
        isFullPost={true}
        >
        <ReactMarkdown children={data.text}/> 
        </Post> : <Post/>}
    </div>
    </div>
    <Comments/>
    </>
  )
}
