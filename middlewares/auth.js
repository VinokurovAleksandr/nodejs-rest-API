const jwt = require("jsonwebtoken");

const {basedir} = global;

const {User} = require(`${basedir}/models/user`);
const {createError} = require(`${basedir}/helpers`);

const {SECRET_KEY} = process.env;


const auth = async (req, res, next) => {
    const {authorization} = req.headers;
    const  [bearer, token] = authorization.split(" ");
    if(bearer !== 'Bearer') {
        next(createError(401, 'Invalid token'));
    } 
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        
        if(!user) {
            next(createError(401));
        }
        req.user = user;
        next();
    } catch (error) {
        next(createError(401, error.message));
    }
}



module.exports = auth;