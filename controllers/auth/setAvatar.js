const {basedir} = global;
const path = require("path");
const fs = require("fs/promises");

const Jimp = require("jimp");

const {User} = require(`${basedir}/models/user`);

const avatarsDir = path.join(basedir, "public", "avatars");



const setAvatar = async (req, res) => {
    try {
        // Отримуємо ID користувача з запиту
        const {_id} = req.user;

        // Отримуємо шлях до тимчасового файлу та оригінальне ім'я файлу
        const {path: tmpPath, originalname} = req.file;
        // Розділяємо ім'я файлу на розширення
        const [extension] = originalname.split(".").reverse();
        // Формуємо нове ім'я файлу з додаванням розширення
        const newName = `${_id}.${extension}`;

        // Визначаємо шлях для завантаження аватара в постійну директорію
        const uploadPath = path.join(avatarsDir, newName);

        // Переміщуємо файл з тимчасової директорії до постійної
        await fs.rename(tmpPath, uploadPath);

        // Завантажуємо зображення з використанням jimp
        const avatar = await Jimp.read(uploadPath);

        // Змінюємо розмір зображення до 250x250
        await avatar.resize(250, 250);
        
        // Перезаписуємо зображення з новими розмірами
        await avatar.writeAsync(uploadPath);

        // Формуємо URL для збереження в базі даних
        const avatarUrl = path.join("avatars", newName);

        // Оновлюємо запис користувача в базі даних з новим URL аватара
        await User.findByIdAndUpdate(_id, {avatarURL: avatarUrl});

        // Відправляємо відповідь з URL аватара
        res.json({avatarUrl});  
    } catch (error) {
        // У разі помилки видаляємо тимчасовий файл
        await fs.unlink(tmpPath);

        // Передаємо помилку для подальшої обробки
        throw error; 
    } 
};
 

module.exports = setAvatar;