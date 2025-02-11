import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import connectDB from './db'

async function getPartners() {
  try {
    const response = await global.dbclient.query(`
        SELECT 
          partners.*,
          CASE
            WHEN sum(sales.production_quantity) > 300000 THEN 15
            WHEN sum(sales.production_quantity) > 50000 THEN 10
            WHEN sum(sales.production_quantity) > 10000 THEN 5
            ELSE 0
          END AS discount
        FROM partners
        LEFT JOIN sales
          ON sales.partner_id = partners.name
        GROUP BY partners.id
      `);
    
    return response.rows;
  } catch (e) {
    console.log(e);
  }
}

async function createPartner(event, data) {
  const { type, name, ceo, email, phone, address, inn, rating } = data;

  try {
    await global.dbclient.query(
      `INSERT INTO partners (type, name, director, email, phone, adresse, inn, rating) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [type, name, ceo, email, phone, address, inn, rating]
    );
    dialog.showMessageBox({ message: 'Успех! Партнер создан' });
  } catch (e) {
    console.error(e);
    dialog.showErrorBox('Ошибка', "Партнер с таким именем уже есть или другая ошибка при добавлении");
  }
}

async function updatePartner(event, partner) {
  const { id, type, name, director, email, phone, adresse, rating } = partner;

  try {
      await global.dbclient.query(
          `UPDATE partners
          SET name = $1, type = $2, director = $3, email = $4, phone = $5, adresse = $6, rating = $7
          WHERE partners.id = $8;`,
          [name, type, director, email, phone, adresse, rating, id]
      );
      dialog.showMessageBox({ message: 'Успех! Данные обновлены' });
  } catch (e) {
      dialog.showErrorBox('Ошибка', 'Произошла ошибка при обновлении данных');
      console.error(e);
      return 'error';
  }
}


function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')

  global.dbclient = await connectDB();

  ipcMain.handle('getPartners', getPartners);
  ipcMain.handle('createPartner', createPartner);
  ipcMain.handle('updatePartner', updatePartner);

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
