const Users = require('./../../models/users');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
    try {
        const token = req.query.token;
        const decoded = jwt.verify(token, 'mailer123');

        if (!decoded.admin) {
            return res.status(200).json({ success: false });
        };

        const users = await Users.find();
    
        return res.status(200).json({ success: true, users: users });
    } catch (error) {
        return res.status(500).json({ success: false });
    }
    
};

const addUser = async (req, res) => {
    const user = req.body;

    try {
        const token = req.query.token;
        const decoded = jwt.verify(token, 'mailer123');

        if (!decoded.admin) {
            return res.status(200).json({ success: false });
        };

        const newUser = await Users.create(user);
        
        newUser.save();
    
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false });
    }
}
    
module.exports = {
    getUsers,
    addUser,
}; 
