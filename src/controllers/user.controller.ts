import { Request, Response }from 'express';
import fs from 'fs';

const createUser = async (req: Request, res: Response) => {
    const user : User = req.body;
    const userDetails : UserDetails = {
        user: user,
        level: 1,
        wpm: 0,
        accuracy: 0,
    }
    try {
        const previousUsers = fs.readFileSync('src/data/Users.json', 'utf-8');
        const users = JSON.parse(previousUsers);
        users.users.push(userDetails);
        fs.writeFileSync('src/data/Users.json', JSON.stringify(users));
        res.status(201).json({message: 'User created successfully'});        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const previousUsers = fs.readFileSync('src/data/Users.json', 'utf-8');
        const users = JSON.parse(previousUsers);
        const userById = users.users.filter((user: UserDetails) => user.user.id === id);
        res.status(200).json({user: userById});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export {
    createUser,
    getUserById,
}
