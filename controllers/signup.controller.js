// const jwt = require('jsonwebtoken');
// const {  } = require('../models/signup.model');
// const { jwtSecret, jwtExpiration } = require('../config/dbConfig');

// const signup = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Create a new user
//     const user = await User.create({ username, password });

//     // Generate JWT token
//     const token = generateToken(user.id);

//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Find the user by username
//     const user = await User.findOne({ where: { username } });

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     // Verify password
//     const isValidPassword = await user.isValidPassword(password);

//     if (!isValidPassword) {
//       return res.status(401).json({ error: 'Invalid username or password' });
//     }

//     // Generate JWT token
//     const token = generateToken(user.id);

//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const generateToken = (userId) => {
//   return jwt.sign({ userId }, jwtSecret, { expiresIn: jwtExpiration });
// };

// module.exports = { signup, login };
