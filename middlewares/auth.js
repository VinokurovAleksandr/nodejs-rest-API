const jwt = require("jsonwebtoken");

const {basedir} = global;

const {User} = require(`${basedir}/models/user`);
const {createError} = require(`${basedir}/helpers`);

const {SECRET_KEY} = process.env;


const auth = async (req, _, next) => {
    // Отримуємо заголовок 'authorization' з запиту
    const {authorization = ""} = req.headers;
    // Розділяємо значення заголовка 'authorization' на 'bearer' та 'token'
    const  [bearer, token] = authorization.split(" ");
    // Перевіряємо, чи тип авторизації 'Bearer'
    if(bearer !== 'Bearer') {
        // Якщо тип не 'Bearer', відповідаємо помилкою 401 Unauthorized
        next(createError(401, 'Invalid token'));
    } 
    try {
        // Перевіряємо JWT токен за допомогою SECRET_KEY та отримуємо 'id' користувача
        const {id} = jwt.verify(token, SECRET_KEY);
        // Знаходимо користувача в базі даних за 'id'
        const user = await User.findById(id);
        // Якщо користувач не знайдений або токен не дійсний, відповідаємо помилкою 401 Unauthorized
        if(!user || !user.token) {
            next(createError(401));
        }
         // Прикріплюємо об'єкт 'user' до запиту для подальшої обробки
        req.user = user;
        // Передаємо управління наступному середовищному обробнику
        next();
    } catch (error) {
        // Якщо під час перевірки токена сталася помилка, відповідаємо помилкою 401 Unauthorized
        next(createError(401, error.message));
    }
}



module.exports = auth;