const {basedir} = global;

const bcrypt = require("bcryptjs");
const {User, schemas} = require(`${basedir}/models/user`);
const {createError} = require(`${basedir}/helpers`);


const login = async (req, res) => {
    const {error} = schemas.login.validate(req.body);
    if(error){
        throw createError(400, error.message);
    }
    const {email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        throw createError(401, `${email} not found`);
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword) {
        throw createError(401, 'Invalid password');
    }
    const token = "dfsfsdfsdf.sdfdssd23232323"
    res.json({
        token,
    })
};


module.exports = login; 