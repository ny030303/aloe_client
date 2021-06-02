
import { serverLink } from "./SocketService";
const axios = require('axios');
// axios.defaults.baseURL = 'localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
export const clientMode = "web"; // electron or web

// const options = { headers: { 'Content-Type': 'multipart/form-data'}};
export const serviceDB = {
  checkIsLogin:(channel, param) => {
      // console.log(param);
      axios.get(`${serverLink}`, { withCredentials : true }).then(res => {
          // console.log('checkIsLogin:', res.data);
          if (param.callback) param.callback(res.data);
      });
  },
  login: (channel, param) => {
      // console.log(param);
      axios.post(`${serverLink}auth/local`, {id: param.id, pwd: param.pwd}, { withCredentials : true }).then(res => {
          // console.log('login:', res.data);
          if (param.callback) param.callback(res.data);
      });
  },
  signup: (channel, data) => {
      axios.post(`${serverLink}user/signup`, data.userData).then(res => {
          // console.log('signup:', res.data);
          if (data.callback) data.callback(res.data);
      });
  },
  logout:(channel, param) => {
      console.log(param);
      axios.get(`${serverLink}auth/logout`, { withCredentials : true }).then(res => {
          // console.log('logout:', res.data);
          if (param.callback) param.callback(res.data);
      });
  },

  fileUpload: (channel, param) => {
      const data = { img: param.img };
      console.log(data);
      axios.post(`${serverLink}user/upload`, data).then(res => {
          // console.log('fileUpload:', res.data);
          if (param.callback) param.callback(res.data);
      });
  },
    getAGroup: (channel, param) => {
    // console.log(param);
        axios.get(`${serverLink}group/${param.g_id}`).then(res => {
            if (param.callback) param.callback(res.data);
        });
    },
    inviteUserToGroup: (channel, param) => {
    // console.log(param);
        axios.post(`${serverLink}group/invite`, param.data).then(res => {
            if (param.callback) param.callback(res.data);
        });
    },
};