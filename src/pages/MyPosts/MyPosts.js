import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../store/posts';
import { addMyPosts } from '../../store/myPosts';
import { myPostsReducerSelect } from '../../store/myPosts';
import { Post } from '../../components/Post/Post';
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

      if(post.length != 0) {
        return (
          <>
            {post.map((el) => (
              <div key={el._id} className='home-post-wrapper'>
                <div className='post-wrapper'>
                <Post
                  id={el._id}
                  title={el.title}
                  createdAt={el.createdAt.substring(0,10)}
                  viewsCount={el.viewsCount}
                  imageUrl={el.imageUrl ? `${url}${el.imageUrl}` : ""}
                  user={el.user}
                  isEditable={userData?._id == el.user._id}
                />
                </div>
              </div>
            ))}
          </>
        );
      } else {
        return (
          <>
          <h3>У вас ще немає власних постів.</h3>
          <h3>Ви можите створити свій власний пост і він тут зявиться</h3>
          </>
        )
      }
}
