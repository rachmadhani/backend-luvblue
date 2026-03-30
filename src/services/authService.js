const { User } = require('../models');

/**
 * Login user and generate token
 * @param {Object} data - { email, password }
 * @returns {Object} - { user, token }
 */
exports.loginUser = async (data) => {
    const { email, password } = data;

    if (!email || !password) {
        const error = new Error('Email and password are required');
        error.status = 400;
        throw error;
    }

    const user = await User.findOne({ where: { email } });

    if (!user || user.auth_provider !== 'email') {
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }

    if (!user.validPassword(password)) {
        const error = new Error('Invalid credentials');
        error.status = 401;
        throw error;
    }

    const token = user.generateAuthToken();

    const userResponse = user.toJSON();
    delete userResponse.password;

    return { user: userResponse, token };
};