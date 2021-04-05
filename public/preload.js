// const {
//     contextBridge,
//     ipcRenderer, remote
// } = require("electron");
const { contextBridge, ipcRenderer, remote, Notification, Tray } = require("electron");
const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // const {remote} = require("electron");
            // whitelist channels
            // let validChannels = ["toMain"];
            // if (validChannels.includes(channel)) {
            //     ipcRenderer.send(channel, data);
            // }

            console.log(remote);
            // remote.getCurrentWindow().close();
            console.log(channel, data);//html에서 넘기는 값, channel로 구분하면 됩니다.
            data.callback({ result: '성공' });
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);

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

const multipartFromDataConfig = { headers: { 'content-type': 'multipart/form-data'}};
contextBridge.exposeInMainWorld(
    "db", {
        signup: (channel, data) => {
            console.log(channel, data);
            axios.post(`http://localhost:54000/user/signup`, data.userData).then(res => {
                console.log('putUser:', res);
                // data.callback({ result: '성공' });
                if (data.callback) data.callback(res.data.result);
            });
            
        },
        fileUpload: (channel, data) => {
            const formData = new FormData();
            formData.append('profile_img',data.img);
            // formData.append('extension', data.img.type.split('/')[1]);
            
            axios.post(`http://localhost:54000/user/upload`, formData, multipartFromDataConfig).then(res => {
                console.log('fileData:', res.data);
                return res.data;
                // data.callback(res.data);
            });
        }
    }
);