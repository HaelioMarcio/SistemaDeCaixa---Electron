// Modules to control application life and create native browser window
const {app, Menu, BrowserWindow, dialog} = require('electron')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
const template = [
    {
      label: 'Arquivo',
      submenu: [
        { 
          label: 'Sair',
          role: 'close'
        },
      ]
    },
    {
      label: 'Caixa',
      submenu: [
        { 
          label: 'Caixa',
          click(){
            mainWindow.loadFile('pages/caixa/caixa.html')
          }
        },
        { 
          label: 'Abertura de Caixa',
          click(){
            mainWindow.loadFile('pages/caixa/abertura.html')
          }
        },
        { 
          label: 'Fechamento de Caixa',
          click(){
            mainWindow.loadFile('pages/caixa/fechamento.html')
          }
        },
      ]
    },
    {
      label: 'Estoque',
      submenu: [
      { label: 'Listar Produtos',
          click(){mainWindow.loadFile('pages/estoque/lista.html')}
        },
        { label: 'Cadastrar Produto',
          click(){mainWindow.loadFile('pages/estoque/adicionar.html')}
        },
        { label: 'Consultar',
          click(){
              modal = new BrowserWindow({
                parent: mainWindow,
                modal: true,
                width: 700,
                height: 500
              });

          }
        },
        { label: 'Balanço',
          click(){dialog.showMessageBox({
            type: 'info',
            title: 'Titulo',
            message: 'mensagem',
          })}
        },

      ]
    },
    {
      label: 'Ajuda',
      submenu: [
        { 
          label: 'Atualizar',
          role: 'reload'
        },
      ]
    }
];


const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    icon: 'images/icon.png',
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  //mainWindow.openDevTools() exibe o console na tela
  mainWindow.openDevTools()
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

