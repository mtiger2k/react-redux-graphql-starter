import axios from 'axios'

export const login = (username, password) => {
	return axios.post(`/signin`, {username, password})
}

export const me = () => {
	return axios.get(`/me`)
}

export const register = (username, password) => {
	return axios.post(`/signup`, {username, password})
}