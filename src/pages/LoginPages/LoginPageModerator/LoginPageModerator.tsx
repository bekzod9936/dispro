import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { readBuilderProgram } from 'typescript';
import { URL } from "../../../services/constants/config"
import { IAdminLogin } from '../../../services/Types/api';
type IForm = {
    phoneNumber: string,
    password: string,
}
const LoginPageModerator = () => {

    const { register, handleSubmit, formState: errors, watch } = useForm<IForm>({
        mode: "onSubmit",

    });
    const history = useHistory();
    console.log(watch("password"));
    console.log(watch("phoneNumber"));
    const onLoginFormSubmit: SubmitHandler<IForm> = (data: IForm) => {
        console.log("Data" + data.password);
        const response = axios.post(`${URL}/auth/login`, {
            smsCode: "1234",
            telNumber: data.phoneNumber,
            userType: 2
        }, {
            headers: {
                "Content-Type": " application/json",
                "langId": 1

            }
        }).then((response) => {
            return response.data
        }).then((data: IAdminLogin) => {
            console.log(data);
            if (data.data?.accessToken && data.data.refreshToken) {
                localStorage.setItem("moderator_access_token", data.data?.accessToken);
                localStorage.setItem("moderator_refresh_token", data.data?.refreshToken);
            }
            return data;
        }
        ).then((data) => {
            // let access = localStorage.getItem("moderator_access_token");
            // let refresh = localStorage.getItem("moderator_refresh_token");
            // if (access && refresh) {
            let moderatorToken = localStorage.getItem("moderator_access_token");
            if (moderatorToken) {
                history.push("/admin/companies");
                console.log("fixed");
            }
            //}
        });




    }

    return (
        <>
            <h2>Moderator</h2>
            <form onSubmit={handleSubmit(onLoginFormSubmit)}>
                <input {...register("phoneNumber", { required: "true", valueAsNumber: false })} />
                <br />
                <input type="password" {...register("password", { required: "true", valueAsNumber: false })} />
                <br />
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default LoginPageModerator;
