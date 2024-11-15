// import { createConnectionObject } from "./DBConnection.js";

// const connection = createConnectionObject();

// export function registerUser (request, response){
//     const { name, email, password } = request.body;

//     const query = `INSERT INTO Users (name, emailId, password) VALUES (?, ?, ?)`;

//     connection.query(query, [name, email, password], (err) => {
//         if (err) {
//             console.log('Error inserting data:', err);
//             response.status(500).json({ error: 'Failed to register user' });
//             return;
//         }
//         response.status(201).json({ message: 'User registered successfully!' });
//     });

// }


import { createConnectionObject } from "./DBConnection.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const connection = createConnectionObject();
const SALT_ROUNDS = 10; 
const JWT_SECRET = 'secret_key'; 

export async function registerUser(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
        return response.status(400).json({ message: 'Name, email, and password are required' });
    }

    try {

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const query = `INSERT INTO Users (name, emailId, password) VALUES (?, ?, ?)`;
        connection.query(query, [name, email, hashedPassword], (err) => {
            if (err) {
                console.log('Error inserting data:', err);
                return response.status(500).json({ error: 'Failed to register user' });
            }

            const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

            response.status(201).json({
                message: 'User registered successfully!',
                token, 
            });
        });
    } catch (error) {
        console.error('Error during registration:', error);
        response.status(500).json({ error: 'Failed to register user' });
    }
}
