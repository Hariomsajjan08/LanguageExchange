import { createConnectionObject } from "./DBConnection.js";

const connection = createConnectionObject();


export function getUserProfile(request, response) {
    const { email } = request.user;
    
    const query = `SELECT * FROM Users WHERE emailId = ?`;

    connection.query(query, [email], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return response.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return response.status(404).json({ message: 'User not found' });
        }

        const user = results[0];
        return response.status(200).json({
            name: user.name,
            emailId: user.emailId,
            username: user.username,
            nativeLanguage: user.nativeLanguage,
            summary: user.summary,
        });
    });
}


export function updateUserProfile(request, response) {
    const { email } = request.user; 
    const { name, username, nativeLanguage, summary } = request.body;

    const query = `UPDATE Users SET name = ?, username = ?, nativeLanguage = ?, summary = ? WHERE emailId = ?`;

    connection.query(query, [name, username, nativeLanguage, summary, email], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return response.status(500).json({ message: 'Database error' });
        }

        if (results.affectedRows === 0) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json({ message: 'Profile updated successfully' });
    });
}
