import Cookies from 'js-cookie';
import axios from 'axios';
import { logout } from '../freatuers/auth/authSlice';
import { store } from '../app/store';

const apiClient = axios.create({
  baseURL: 'https://ai-agent-bnc7ddgffch9a6hw.canadacentral-01.azurewebsites.net',
});

apiClient.interceptors.request.use(config => {
  const token = Cookies.get('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

  
apiClient.interceptors.response.use(
  (response)=>response,
  async (error)=>{
    if(error.response?.status===401){
        // Use store.dispatch instead of useDispatch hook
      store.dispatch(logout());
        return Promise.reject(error);
  }
}
)

export default apiClient;
