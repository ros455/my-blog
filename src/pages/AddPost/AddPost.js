import React from 'react'
import addpost from './addpost.css'
import { useSelector } from 'react-redux';
import { useNavigate, Navigate, useParams, Redirect, Link} from 'react-router-dom';
import { selectIsAuth } from '../../store/auth';
import axios from '../../axios';
import { Home } from '../../components/Home/Home';
import { Button } from 'react-bootstrap';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
export const AddPost = () => {
    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const {id} = useParams();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth)
    const isEditing = Boolean(id);
    const inputFileRef = React.useRef(null);

    const handleChangeFile = async (event) => {
      try{
        const formData = new FormData();
        const file = event.target.files[0];
        formData.append('image',file);
        const {data} = await axios.post('/upload',formData)
        setImageUrl(data.url)
      } catch(err) {
        console.warn(err)
        alert('Ошибка при загрузке файла!')
      }
    };

    const onClickRemoveImage = (event) => {
    event.preventDefault();
    setImageUrl('')
    
    };

      const onSubmit = async () => {
        try{
          const fields = {
            title,
            text,
            imageUrl
          }

          const {data} = isEditing ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields);

          // const _id = isEditing ? id : data._id;
          // navigate(`/posts/${_id}`)
        } catch(err) {
          console.warn(err)
          alert('Ошибка при создание статьи!')
        }
      }

  React.useEffect(() => {
    if(id) {
      axios.get(`/posts/${id}`)
      .then(({data}) => {
        console.log('post data promise',data)
        setTitle(data.title);
        setText(data.text);
        setImageUrl(data.imageUrl)
      })
      .catch((err) => {
        console.log(err)
        alert('Ошибка при получении статьи!')
      })
    }
  },[])

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  return (
    <form >
      <Button variant="outline-primary" onClick={() => inputFileRef.current.click()} className='add-post-button'>Завантажити аватар</Button>
      <input ref={inputFileRef} onChange={handleChangeFile} type='file' hidden/>

        <Button variant='danger' onClick={onClickRemoveImage} className='add-post-button'>
          Удалить
        </Button>
        {imageUrl && <img src={`${process.env.REACT_APP_URL}${imageUrl}`}/>}
      <input
        placeholder="Заголовок статьи..."
        className='input-title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
        <SimpleMDE className='textarea' value={text} onChange={onChange} options={options} />
      <div>

        {isEditing ? <Link to={`/myPosts/${id}`} className='link-change'>
        <Button variant='primary' type='submit' onClick={onSubmit} className='addpost-button-save'>Редагувати</Button>
        </Link> : <Link to={`/myPosts`} className='link-change'>
          <Button variant='primary' type='submit' onClick={onSubmit} className='addpost-button-save'>Опубликовать</Button>
        </Link>}


        <a href="/">
          <Button variant='danger' className='addpost-button-exit'>Відміна</Button>
        </a>
      </div>
    </form>
  )
}
