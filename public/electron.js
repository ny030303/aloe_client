const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
let mainWindow;
 
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
        // 2.
        // 웹 애플리케이션을 데스크탑으로 모양만 바꾸려면 안 해도 되지만,
        // Node 환경처럼 사용하려면 (Node에서 제공되는 빌트인 패키지 사용 포함)
        // nodeIntegration 는 true 해야 합니다.
        resizable: false,
        nodeIntegration: true,
        contextIsolation: true, 
        enableRemoteModule: false, 
        preload: path.join(__dirname, "preload.js")
    }
});
//   mainWindow.loadURL('file://' + __dirname + '/index.html');
  
  if (isDev) {
    // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드
    mainWindow.loadURL('http://localhost:3000');
    // mainWindow.webContents.openDevTools();
  } else {
    // 프로덕션 환경에서는 패키지 내부 리소스에 접근    
    mainWindow.loadFile('./public/index.html');
  }
  mainWindow.on('closed', function () {
    mainWindow = null;
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});


// --------electron---------

