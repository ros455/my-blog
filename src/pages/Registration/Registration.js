import React from 'react';
import registration from './registration.css';
import { useDispatch, useSelector } from 'react-redux';
import {selectIsAuth, fetchRegister} from '../../store/auth.js'
import {useForm} from 'react-hook-form';
import { Navigate } from "react-router-dom";
import { fetchAuthAll } from '../../store/auth.js';
import { Button } from 'react-bootstrap';
import axios from '../../axios';
export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthAll())
  },[])


  const userData = useSelector(state => state.auth.resoult);


  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      // avatarUrl: '',
    },
    mode: 'onBlur'
  })

  const onSubmit = async (values) => {
    // debugger
    let data = {};
    let bool = true;
    userData.map((el) => {
      if(el.email == values.email) {
        bool = false;
        return alert("email уже существует")
      }
  })
  // debugger
   if(bool) {
    data = await dispatch(fetchRegister(values))
  }

    if(!data.payload) {
      return alert("Не удалось зарегистрироваться")
    }
    // debugger
    if('token' in data.payload && bool) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if(isAuth) {
    return <Navigate to='/'/>
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
        >
          <h3>Повне імя:</h3>
          <input 
                    {...register("fullName", 
                    { required: true,
                      minLength: {
                        value: 3,
                      }
                    })}/>
        </label>
        <div className="lebel-error">
          {errors?.fullName && <p>Мінімум 3 символа!</p>}
        </div>
        <label
        >
          <h3>Емаіл:</h3>
          <input type='email'
                    {...register("email", 
                    { required: true,
                       })}/>
        </label>
        <div className="lebel-error">
          {errors?.email && <p>Вкажіть емаіл</p>}
        </div>
        <label
        >
          <h3>Пароль:</h3>
          <input type='password'
                    {...register("password", 
                    { required: true,
                      minLength: {
                        value: 3,
                      }})}/>
        </label>
        <div className="lebel-error">
        {errors?.password && <p>Мінімум 3 символа!</p>}
        </div>

        <Button type="submit" variant="secondary">Зареєструватися</Button>
      </form>
    </div>
  );
}
