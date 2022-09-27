import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { Comments } from '../Comments/Comments';
import { Post } from '../Post/Post';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import fullPost from './fullPost.css'
export const FullPost = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const {id} = useParams();

    const url = useSelector((state) => state.url.url)

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
        <div className='full-post-wrapper'>
        {data ? <Post
        title={data.title}
        createdAt={data.createdAt.substring(0,10)}
        viewsCount={data.viewsCount}
        user={data.user}
        imageUrl={data.imageUrl ? `${url}${data.imageUrl}` : ''}
        isFullPost={true}
        >
        <ReactMarkdown children={data.text}/> 
        </Post> : <Post/>}
    </div>
    <Comments/>
    </>
  )
}
