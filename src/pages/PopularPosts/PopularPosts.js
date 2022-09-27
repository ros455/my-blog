import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Post } from '../../components/Post/Post';
import { fetchPosts } from '../../store/posts';
export const PopularPosts = () => {

  const dispatch = useDispatch();
  const [number, setNumber] = React.useState(10);
  const [slicePost, setSlicePost] = React.useState([]);
  const {posts} = useSelector((state) => state.posts);

  const url = useSelector((state) => state.url.url)

  React.useEffect(()=> {
    dispatch(fetchPosts())
},[])

const post = [...posts.items];


post.sort((x,y) => {
  return x.viewsCount - y.viewsCount
}).reverse();
//-------------------

React.useEffect((e) => {
  document.addEventListener('scroll',scrollHandller)

  return function () {
    document.removeEventListener('scroll',scrollHandller)
  }
},[number])

React.useEffect(() => {
  let bool = number > post.length;

  let difference = 0;
  let res = 0;

  if(bool && number != 0 && post.length != 0) {
    difference = number - post.length;
    res = number - difference;
    setNumber(res)
  }

  if(slicePost.length == post.length && slicePost.length != 0 && post.length != 0) {
    return
  } else {

    let arr =[];

    for(let i = 0; i < number; i++) {
      if(post[i] != undefined) {
        arr.push(post[i])
      } 
    }

    setSlicePost([...arr])
  }

},[posts,number])

const scrollHandller = (e) => {
  if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
    addToArray()
  }
}

const addToArray  = () =>  {
  if(slicePost.length == post.length && slicePost.length != 0 && post.length != 0) {
    return
  } else {
    setNumber(number + 10)
  }
}

  if(slicePost[0] != undefined && slicePost.length <= post.length) {
    return (
      <>
        {slicePost.map((el, index) => (
          <div key={index} className='home-post-wrapper'>
            <div className='post-wrapper'>
            <Post
          id={el._id}
          title={el.title}
          createdAt={el.createdAt.substring(0,10)}
          viewsCount={el.viewsCount}
          imageUrl={el.imageUrl ? `${url}${el.imageUrl}` : ""}
          user={el.user}/>
            </div>
          </div>
        ))}
      </>
    )
  } else(
    <h1>Loading...</h1>
  )
}