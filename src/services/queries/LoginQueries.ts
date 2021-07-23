import axios from "axios"
import { URL } from "../constants/config"

export const signIn = async (role: number, phoneNumber: string) => {
    console.log("hereIam!");

    const response = await axios.post(`${URL}/auth/signup`, {
        telNumber: phoneNumber,
        userType: role
    }, {
        headers: {
            langId: 1,
            vers: "0.0.1"
        }
    });
    return response;
}

export const logIn = async (role: number, phoneNumber: string, smsCode: string) => {
    const response = await axios.post(`${URL}/auth/login`, {
        smsCode: smsCode,
        telNumber: phoneNumber,
        userType: role
    },
        {
            headers: {
                langId: 1,
                vers: "0.0.1"
            }
        }
    )
    return response;
}