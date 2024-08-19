const getCurrent = async(req, res) => {
    // Деструктуризація 'name' та 'email' з об'єкта користувача, прикріпленого до запиту
    const {name, email} = req.user;
     // Відправляємо відповідь у форматі JSON з даними користувача
    res.json({
        name,
        email,
    })
};

module.exports = getCurrent
