import { config } from "../../config";
import axiosClient from "../../api/axiosClient";
import Cookies from 'universal-cookie';



const cookies = new Cookies();

export interface LoginUserState {
	email: string;
	password: string;
}

export interface RegisterUserState {
	email: string;
	password: string;
}
export const loginRequest = async (user: LoginUserState) => {
	try {
		const res = await axiosClient.post(`/login`, user,{
			headers: config.headers,
		});
		cookies.set('token', res.data.access_token, { path: '/', expires: new Date(res.data.expires_at) });
		return res.data;
	} catch (err: any) {
		console.log("Error fetching login: ", err.response);
	}
};

export const registerRequest = async (user: RegisterUserState) => {
	try {
		const res = await axiosClient.post(`/register`, user, {
			headers: config.headers,
		});
		cookies.set('token', res.data.access_token, { path: '/', expires: new Date(res.data.expires_at) });
		return res.data;
	} catch (err: any) {
		console.log("Error fetching register: ", err.response);
	}
};

export const isAuthenticated = async (token: string) => {
	try {
		const res = await axiosClient.get(`/isLogged`, {
			headers: config.headersWithAuth(token),
		});
		console.log(res);
		return res.statusText === "OK";
	} catch (err: any) {
		console.log("Error fetching isAuthenticated: ", err.response);
		return false;
	}
};

export const logoutRequest = async (token: string) => {
	try {
		await axiosClient.get(`/logout`, {
			headers: config.headersWithAuth(token),
		});
	} catch (err: any) {
		console.log("Error fetching logout: ", err.response);
		return false;
	}
}
