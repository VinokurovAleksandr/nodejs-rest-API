const {basedir} = global;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const {User, schemas} = require(`${basedir}/models/user`);
const {createError} = require(`${basedir}/helpers`);

const {SECRET_KEY} = process.env;


const login = async (req, res) => {
    // Валідація тіла запиту з використанням схеми 'login'
    const {error} = schemas.login.validate(req.body);
    if(error){
        // Якщо валідація не пройшла, кидаємо помилку 400 Bad Request з повідомленням про помилку
        throw createError(400, error.message);
    }
    // Отримання 'email' та 'password' з тіла запиту
    const {email, password } = req.body;
     // Знаходження користувача за email
    const user = await User.findOne({ email });
    if(!user) {
        // Якщо користувач не знайдений, кидаємо помилку 401 Unauthorized
        throw createError(401, `${email} not found`);
    }
    // Перевірка правильності пароля
    const comparePassword = await bcrypt.compare(password, user.password);
    // Якщо пароль неправильний, кидаємо помилку 401 Unauthorized
    if(!comparePassword) {
        throw createError(401, 'Invalid password');
    }

    // Створення payload для JWT з id користувача
    const payload = {
        id: user._id,
    };

    // Генерація JWT з payload та SECRET_KEY, з терміном дії 24 години
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"});

    // Оновлення токена в базі даних для користувача
    await User.findByIdAndUpdate(user._id, {token})

    // Відправлення токена у відповідь у форматі JSON
    res.json({
        token,
    })
};


module.exports = login; 