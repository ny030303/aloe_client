const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {  //이름은 api입니닷
    request : (channel, data) => {
        console.log(channel, data);//html에서 넘기는 값, channel로 구분하면 됩니다.
        data.calback({result:'성공'});
    }
});