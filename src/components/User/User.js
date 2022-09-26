import React from 'react'
import user from './user.css'
export const User = ({image, fullName, email}) => {
  console.log('user image',image)
  return (
    <div className="user">
    <div className='user-img-wrapper'>
    <img src={image ? `${process.env.REACT_APP_URL}${image}` : "/img/noavatar.png"} alt="no-avatar" className="user-img"/>
    </div>
    <p>{fullName}</p> 
    <div>
    </div>
  </div>
  )
}
