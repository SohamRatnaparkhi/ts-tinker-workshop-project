import { Request, Response }from 'express';
import fs from 'fs';

const CreateUser = async (req: Request, res: Response) => {
    const user : User = req.body;
    try {
        const previousUsers = fs.readFileSync('src/db/Users.json', 'utf-8');
        const users = JSON.parse(previousUsers);
        users.users.push(user);
        fs.writeFileSync('src/db/Users.json', JSON.stringify(users));
        res.status(201).json({message: 'User created successfully'});        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export {
    CreateUser,
}
