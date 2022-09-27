import React from 'react'
import { useSelector } from 'react-redux'
import user from './user.css'
export const User = ({image, fullName, email}) => {
  const url = useSelector((state) => state.url.url)

  return (
    <div className="user">
    <div className='user-img-wrapper'>
    <img src={image ? `${url}${image}` : "/img/noavatar.png"} alt="no-avatar" className="user-img"/>
    </div>
    <p>{fullName}</p> 
    <div>
    </div>
  </div>
  )
}