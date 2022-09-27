import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {Routes, Route} from 'react-router-dom'
import { Home } from "./components/Home/Home";
import { Header } from "./components/Header/Header";
import { CooperationPolicy } from "./pages/CooperationPolicy/CooperationPolicy";
import { PopularPosts } from "./pages/PopularPosts/PopularPosts";
import { Registration } from "./pages/Registration/Registration";
import {LogIn} from './pages/LogIn/LogIn'
import { AddPost } from "./pages/AddPost/AddPost";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./store/auth";
import { FullPost } from "./components/FullPost/FullPost";
import { MyPosts } from "./pages/MyPosts/MyPosts";
import { AdminPanel } from "./pages/AdminPanel/AdminPanel";
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth)

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <div className="App">
      <Header/>
      <div className='all-wrapper'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/CooperationPolicy" element={<CooperationPolicy/>}/>
        <Route path="/PopularPosts" element={<PopularPosts/>}/>
        <Route path="/auth/login" element={<LogIn/>}/>
        <Route path="/auth/register" element={<Registration/>}/>
        <Route path="/add-post" element={<AddPost/>}/>
        <Route path="/posts/:id" element={<FullPost/>}/>
        <Route path="/myPosts/:id" element={<FullPost/>}/>
        <Route path="/posts/:id/edit" element={<AddPost/>}/>
        <Route path="/myPosts" element={<MyPosts/>}/>
        <Route path="/adminPanel/:id" element={<AdminPanel/>}/>
        <Route path="/adminPanel/:id/edit" element={<AdminPanel/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
