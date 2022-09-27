import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../store/posts';
import { addMyPosts } from '../../store/myPosts';
import { myPostsReducerSelect } from '../../store/myPosts';
import { Post } from '../../components/Post/Post';
import ReactMarkdown from 'react-markdown';
export const MyPosts = () => {

    const dispatch = useDispatch();

    const userData = useSelector(state => state.auth.data);

    const {posts} = useSelector((state) => state.posts);

    const myPosts = useSelector(myPostsReducerSelect);

    const url = useSelector((state) => state.url.url)
    


    React.useEffect(()=> {
        dispatch(fetchPosts())
        dispatch(addMyPosts(posts.items))
    },[])

    React.useEffect(()=> {
    addToNewArray(posts.items)
    },[posts])

    const addToNewArray = (arr) => {

        let array = [];
      
        arr.forEach((el,index) => {
          if(el.user._id == userData._id) {
            array.push(el)
          }
        })

        dispatch(addMyPosts(array))
      }

      const post = [...myPosts];
      post.reverse();

  return (
    <>
      {post.map((el) => (
        <div key={el._id} className='home-post-wrapper'>
          <div className='post-wrapper'>
          <Post
            id={el._id}
            title={el.title}
            createdAt={el.createdAt.substring(0,10)}
            // text={`${el.text.substring(0,50)}...`}
            viewsCount={el.viewsCount}
            imageUrl={el.imageUrl ? `${url}${el.imageUrl}` : ""}
            user={el.user}
            isEditable={userData?._id == el.user._id}
          >
            <ReactMarkdown children={`${el.text.substring(0,50)}...`}/> 
          </Post>
          </div>
        </div>
      ))}
    </>
  );
}
