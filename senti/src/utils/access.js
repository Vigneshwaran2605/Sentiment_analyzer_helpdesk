import axios from "axios";
import { jwtDecode } from "jwt-decode";


export async function accessTokenCheck(token) {
    var decoded = jwtDecode(token);
    console.log(decoded)
    var date = new Date(decoded.exp * 1000);
    var currentTime = new Date();
    if (date <= currentTime) {
        const user = {
            "refresh": localStorage.getItem('refresh_token')
        };

        try {
            const { data } = await axios.post(
                '/api/token/refresh/',
                user,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
            decoded = jwtDecode(data.access)
        } catch (error) {
            console.error('Login failed:', error);
        }
    }
    localStorage.setItem('username', decoded.username);
    localStorage.setItem('email', decoded.email);
    localStorage.setItem('post', decoded.post);
    localStorage.setItem('id', decoded.user_id);
}

export function logout(){
    localStorage.clear()
    console.log("hi,")
}