import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios"
interface IForm {
    phoneNumber: string,
    password: string,
}
const LoginPageAdmin = () => {

    const { register, handleSubmit } = useForm<any>();

    const onLoginFormSubmit = (data: any) => {
        console.log(data);


    }
    return (
        <div>
            <h2>Admin</h2>
            <form onSubmit={handleSubmit(onLoginFormSubmit)}>
                <input type="text" {...register("phoneNumber")} />
                <br />
                <input type="password" {...register("password")} />
                <button type="submit">Login</button>
            </form>

        </div>
    );
}

export default LoginPageAdmin;
