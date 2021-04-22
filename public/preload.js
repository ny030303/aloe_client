// const {
//     contextBridge,
//     ipcRenderer, remote
// } = require("electron");
const { contextBridge, ipcRenderer, remote, Notification, Tray } = require("electron");
const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object

contextBridge.exposeInMainWorld(
    "main", {
        send: (channel, data) => {
            remote.getCurrentWindow().close();
            console.log(channel, data);
            data.callback({ result: '성공' });
        },
        resize: (channel, data) => {
            remote.getCurrentWindow().setContentSize(data.width, data.height);
            data.callback({ result: '성공' });
        },
        toast: (channel, data) => {
            // const notification = {
            //     title: 'Basic Notification',
            //     body: 'Notification from the Main process'
            //   }
            //   new Notification(notification).show();


            // tray
        }
    }
);

// const options = { headers: { 'Content-Type': 'multipart/form-data'}};
contextBridge.exposeInMainWorld(
    "db", {
        checkIsLogin:(channel, param) => {
            // console.log(param);
            axios.get(`http://localhost:54000/`, { withCredentials : true }).then(res => {
                // console.log('checkIsLogin:', res.data);
                if (param.callback) param.callback(res.data);
            });
        },
        login: (channel, param) => {
            // console.log(param);
            axios.post(`http://localhost:54000/auth/local`, {id: param.id, pwd: param.pwd}, { withCredentials : true }).then(res => {
                // console.log('login:', res.data);
                if (param.callback) param.callback(res.data);
            });
        },
        signup: (channel, data) => {
            axios.post(`http://localhost:54000/user/signup`, data.userData).then(res => {
                // console.log('signup:', res.data);
                if (data.callback) data.callback(res.data);
            });
        },
        logout:(channel, param) => {
            console.log(param);
            axios.get(`http://localhost:54000/auth/logout`, { withCredentials : true }).then(res => {
                // console.log('logout:', res.data);
                if (param.callback) param.callback(res.data);
            });
        },

        fileUpload: (channel, param) => {
            const data = { img: param.img };
            console.log(data);
            axios.post('http://localhost:54000/user/upload', data).then(res => {
                // console.log('fileUpload:', res.data);
                if (param.callback) param.callback(res.data);
            });
        },
        // getFileURL: (channel, param) => {
        //     console.log(param);
        //     axios.get('http://localhost:54000/images/'+ param.fileName).then(res => {
        //         console.log('getFileURL:', res.data);
        //         if (param.callback) param.callback(res.data);
        //     });
        // }
    }
);