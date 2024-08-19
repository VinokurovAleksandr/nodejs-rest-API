const { basedir } = global;

const { User } = require(`${basedir}/models/user`);

const logout = async (req, res) => {
    // Отримання ідентифікатора користувача з об'єкта 'req.user'
    const { _id } = req.user;
    
    // Оновлення запису користувача в базі даних, очищаючи токен
    await User.findByIdAndUpdate(_id, { token: "" });
    
    // Відправлення порожньої відповіді з кодом статусу 204 (No Content)
    res.status(204).send();
};

module.exports = logout;