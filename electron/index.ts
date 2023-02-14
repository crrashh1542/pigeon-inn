import { app, BrowserWindow } from "electron";
import path from "path";

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      // 允许渲染进程使用node
      contextIsolation: false,
      nodeIntegration: true,
    },
  });
  // app.isPackaged 字段存在bug，即使正常打包后，仍然为false，所以不能用来判断项目是否经过打包
  if (process.env.NODE_ENV === 'development') {
    // 开发环境
    // process.env.VITE_DEV_SERVER_URL获取开发服务器的url
    // vite版本不同，VITE_DEV_SERVER_URL字段也有所变化，打印process.env查找具体的名称
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // 生产环境
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
};

app.whenReady().then(createWindow)
