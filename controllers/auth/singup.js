const bcrypt = require("bcryptjs");


const {basedir} = global;

const {User, schemas} = require(`${basedir}/models/user`);
const {createError} = require(`${basedir}/helpers`);



// 1. передаємо тіло  
// 2. якщо є то передаємо в логи , пмилка 409
// 3. якщо боіді пройшов валідацію , збергіаємо в базі  за допомогою User.create()
// 4. відповідь зберігаємо в  result 
// 5. відправляємо відповідь 
// 6.

const singup = async (req, res) => {

     // перевіряємо тіло на валідацію
     const {error} = schemas.register.validate(req.body);
     if(error){
         throw createError(400, error.message);
     }
     // перевіряємо чи є вже такий користувач
     const {email, password} = req.body;
     const user = await User.findOne({ email });
     // якщо  є то викидаємо помилку
     if(user) {
         throw createError(409, `${email} in use`);
     }
     const hashPassword = await bcrypt.hash(password, 10);
     
      // Створюємо нового користувача
      const result = await User.create({...req.body, password: hashPassword})

     // Відправляємо успішний результат
     res.status(201).json({
         email: result.email,
         subscription: result.subscription,
     });

};

module.exports = singup;