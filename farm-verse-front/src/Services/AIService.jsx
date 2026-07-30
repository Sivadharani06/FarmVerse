import axios from "axios";

const Y_URL='http://localhost:9696/farmverse/yield';

export const getExpectedYield=(id)=>{
      return axios.post(`${Y_URL}/${id}`, {
        withCredentials: true
   });
}
