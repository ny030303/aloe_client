// const {
//     contextBridge,
//     ipcRenderer, remote
// } = require("electron");
const {contextBridge, ipcRenderer, remote} = require("electron");
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
            data.callback({result:'성공'});
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
        send: (cannel, data) => {
            remote.getCurrentWindow().close();
            console.log(channel, data);
            data.callback({result:'성공'});
        },
        resize: (cannel, data) => {
            remote.getCurrentWindow().setContentSize(data.width, data.height);
            data.callback({result:'성공'});
        }
        
    }
);