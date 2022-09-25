import React from "react";
import login from "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchAuth, selectIsAuth } from "../../store/auth";
import {useForm} from 'react-hook-form';
import { Button } from "react-bootstrap";
export const LogIn = () => {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if(!data.payload) {
      return alert("Не удалось авторизоваться")
    }

    if('token' in data.payload) {
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

        <Button type="submit" variant="secondary">Увійти</Button>
      </form>
    </div>
  );
};
