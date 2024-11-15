// import { createConnectionObject } from "./DBConnection.js";

// const connection = createConnectionObject();

// export function loginUser(request, response) {
//     const { email, password } = request.body;

//     // Validate email and password inputs
//     if (!email || !password) {
//         return response.status(400).json({ message: 'Email and password are required' });
//     }

//     // Query to fetch user data by email
//     const query = `SELECT * FROM Users WHERE emailId = ?`;

//     connection.query(query, [email], (error, results) => {
//         if (error) {
//             console.error('Database error:', error);
//             return response.status(500).json({ message: 'Database error' });
//         }

//         // Check if user exists
//         if (results.length === 0) {
//             return response.status(404).json({ message: 'User not found' });
//         }

//         const user = results[0];

//         // Password comparison
//         if (password === user.password) {
//             return response.status(200).json({ message: 'User logged in successfully' });
//         } else {
//             return response.status(401).json({ message: 'Invalid password' });
//         }
//     });
// }


import { createConnectionObject } from "./DBConnection.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const connection = createConnectionObject();
const JWT_SECRET = 'secret_key';

export function loginUser(request, response) {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).json({ message: 'Email and password are required' });
    }
    const query = `SELECT * FROM Users WHERE emailId = ?`;

    connection.query(query, [email], async (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return response.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return response.status(404).json({ message: 'User not found' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const token = jwt.sign({ email: user.emailId }, JWT_SECRET, { expiresIn: '1h' });

            return response.status(200).json({
                message: 'User logged in successfully',
                token,
            });
        } else {
            return response.status(401).json({ message: 'Invalid password' });
        }
    });
}
