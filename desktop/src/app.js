process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let url

if (process.env.NODE_ENV === 'DEV') {
  url = 'http://localhost:8080/#/home'
} else {
  url = `file://${process.cwd()}/dist/index.html`
}

app.on('ready', () => {
  let window = new BrowserWindow({ width: 800, height: 600 })
  if (process.env.NODE_ENV !== 'production') {
    require('vue-devtools').install()
    window.webContents.openDevTools()
  }
  window.loadURL(url)
})
