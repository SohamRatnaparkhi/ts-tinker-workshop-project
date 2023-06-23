import { Request, Response }from 'express';
import fs from 'fs';

const createUser = async (req: Request, res: Response) => {
    const user : User = req.body;
    const userDetails : UserDetails = {
        user: user,
        level: 1,
        wpm: 0,
        accuracy: 0,
        attempts: 0,
        scores: 0,
    }
    try {
        const previousUsers = fs.readFileSync('./data/Users.json', 'utf-8');
        const users = JSON.parse(previousUsers);
        users.users.push(userDetails);
        fs.writeFileSync('./data/Users.json', JSON.stringify(users));
        res.status(201).json({message: 'User created successfully'});        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserById = (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const previousUsers = fs.readFileSync('./data/Users.json', 'utf-8');
        const users = JSON.parse(previousUsers);
        const userById = users.users.filter((user: UserDetails) => user.user.id === id);
        res.status(200).json({user: userById});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const loginUser = (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const previousUsers = fs.readFileSync('./data/Users.json', 'utf-8');
        const users: UserDetails[] = JSON.parse(previousUsers).users;
        const user = users.filter((user: UserDetails) => user.user.username === username && user.user.password === password);

        if (user.length === 0) {
            res.status(404).json({message: 'User not found'});
            return;
        }
        return res.status(200).json({user: user[0]});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export {
    createUser,
    getUserById,
    loginUser
}
