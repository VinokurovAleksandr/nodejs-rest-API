const {basedir} = global;


const {User} = require(`${basedir}/models/user`);
const {createError} = require(`${basedir}/helpers`);

// Доступні типи підписки
const allowedSubscriptions = ['starter', 'pro', 'business'];

const updateSubscription = async (req, res, next) => {
    const {subscription} = req.body;
    
    if(!allowedSubscriptions.includes(subscription)) {
        throw createError(400, `${subscription} is not allowed`);
    }

       // Перевіряємо, що req.user визначений

    if (!req.user) {
        throw createError(401, 'Not authorized');
    }

    // Оновлення підписки користувача
    const user  = await User.findByIdAndUpdate(
        req.user._id, // Ідентифікатор користувача отримуємо з req.user після авторизації
        {subscription}, // Оновлюємо підписку
        {new: true}); //Повертаємо оновлений документ

    
    if(!user) {
        throw createError(404);
    }
    res.json({
        email: user.email,
        subscription: user.subscription,
    });
    } 

module.exports = updateSubscription;