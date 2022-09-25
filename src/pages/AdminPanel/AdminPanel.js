import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPencilFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import adminpanel from './adminpanel.css'
import axios from '../../axios'
import { Button } from "react-bootstrap";
export const AdminPanel = () => {

    const {id} = useParams();
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const isEditing = Boolean(id);
    const [avatarUrl, setAvatarUrl] = React.useState('');
    const inputFileRef = React.useRef(null);

    const handleChangeFile = async (event) => {
      try{
        const formData = new FormData();
        const file = event.target.files[0];
        formData.append('image',file);
        const {data} = await axios.post('/upload',formData)
        setAvatarUrl(data.url)
      } catch(err) {
        console.warn(err)
        alert('Ошибка при загрузке файла!')
      }
    };

    const onClickRemoveImage = (event) => {
    event.preventDefault();
    setAvatarUrl('')
    };

    const onSubmit = async () => {
      // debugger
        try{
          const fields = {
            fullName,
            email,
            avatarUrl
          }

          const {data} = await axios.patch(`/adminPanel/${id}`, fields);
          // const {data} = isEditing ? await axios.patch(`/adminPanel/${id}`, fields) : await axios.post('/adminPanel', fields);
          window.location.reload()
        } catch(err) {
          console.warn(err)
          alert('Ошибка при редактиронии аккаунта!')
        }
      }


  const userData = useSelector((state) => state.auth.data);

  React.useEffect(() => {
    if(id) {
      axios.get(`/auth/me`)
      .then(({data}) => {
          console.log('user data promise',data)
        setFullName(data.fullName);
        setEmail(data.email);
        setAvatarUrl(data.avatarUrl)
      })
      .catch((err) => {
        console.log(err)
        alert('Ошибка при получении статьи!')
      })
    }
  },[isEditing])
  
  if (userData) {
    return (
      <div className="admin-panel-wrapper">
        {id && (
          <div className="admin-wrapper">
            <Button
              variant="outline-primary"
              onClick={() => inputFileRef.current.click()}
              className="download-avatar"
            >
              Завантажити аватар
            </Button>
            <input
              ref={inputFileRef}
              onChange={handleChangeFile}
              type="file"
              hidden
            />
            {avatarUrl ? (
              <div className="admin-img-wrapper">
                <img
                  src={`http://localhost:5555${avatarUrl}`}
                  className="admin-img"
                />
              </div>
            ) : (
              <div className="admin-img-wrapper">
                <img src={`/img/noavatar.png`} className="admin-img" />
              </div>
            )}
            <Link to={`/adminPanel/${userData._id}/edit`}>
              {avatarUrl && (
                <Button variant="danger" onClick={onClickRemoveImage}>
                  Видалити
                </Button>
              )}
            </Link>
            <p>
              Дата створення аккаунта: {userData.createdAt.substring(0, 10)}
            </p>
            <p>Ваше імя: {userData.fullName}</p>
            <p>Ваш емаіл: {userData.email}</p>
            <p>Ваш ID: {userData._id}</p>
            <form className="admin-panel-form">
              <input
                className="input-title"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                className="input-title"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </form>
            <div>
              <Link to="/">
                <Button
                  variant="primary"
                  onClick={onSubmit}
                  className="admin-button-save"
                >
                  Зберегти
                </Button>
              </Link>
              <Link to="/">
                <Button variant="danger" className="admin-button-exit">
                  Вийти
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return <h1>LOADING...</h1>;
  }
};