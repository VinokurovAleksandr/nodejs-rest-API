const multer = require("multer"); 
const path = require("path"); 

const {basedir} = global;

// Визначаємо тимчасову директорію для збереження завантажених файлів
const tmpDir = path.join(basedir, "tmp");

const multerConfig = multer.diskStorage({
  // Встановлюємо директорію, куди будуть зберігатися файли
  destination: tmpDir,
  // Встановлюємо ім'я файлу під час збереження
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Зберігаємо файл під його оригінальною назвою
  }
});

// Налаштовуємо multer з використанням вказаної конфігурації збереження файлів
const upload = multer({
  storage: multerConfig
});

// Експортуємо конфігурацію для використання в інших модулях
module.exports = upload;
