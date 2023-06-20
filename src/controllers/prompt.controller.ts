import { Request, Response } from 'express';
import fs from 'fs';

const getPromptsByLevel = async (req: Request, res: Response) => {
    const level = Number(req.params.level);
    try {
        const previousPrompts = fs.readFileSync('src/db/Prompts.json', 'utf-8');
        const prompts = JSON.parse(previousPrompts);
        const promptsByLevel = prompts.prompts.filter((prompt: TypePrompt) => prompt.level === level);
        res.status(200).json({prompts: promptsByLevel});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getPromptById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const previousPrompts = fs.readFileSync('src/db/Prompts.json', 'utf-8');
        const prompts = JSON.parse(previousPrompts);
        const promptById = prompts.prompts.filter((prompt: TypePrompt) => prompt.id === id);
        res.status(200).json({prompt: promptById});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const matchPrompt = async (req: Request, res: Response) => {
    const { prompt, text, userId, wpm } = req.body;
    try {
        const promptArray = prompt.split(' ');
        const textArray = text.split(' ');
        let errors = 0;
        for (let i = 0; i < promptArray.length; i++) {
            if (promptArray[i] !== textArray[i]) {
                errors++;
            }
        }
        const previousUsers = fs.readFileSync('src/db/Users.json', 'utf-8');
        const users = JSON.parse(previousUsers);
        const userById: UserDetails = users.users.filter((user: UserDetails) => user.user.id === userId);
        userById.wpm = (userById.wpm + wpm) / 2;
        userById.accuracy = (userById.accuracy + ((promptArray.length - errors) / promptArray.length)) / 2;
        res.status(200).json({
            errors: errors,
            accuracy: (promptArray.length - errors) / promptArray.length,
            user: userById
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export {
    getPromptsByLevel,
    getPromptById,
    matchPrompt,
}