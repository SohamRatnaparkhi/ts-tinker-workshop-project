interface AppDetails {
    title: string,
    description: string,
    version: string,
}

interface TypePrompt {
    id: string,
    quote: string,
    size: number,
    level: number,
}

interface TypeState extends TypePrompt{
    current: string,
    next: string,
    done: boolean,
    errors: number,
    startTime: number,
    endTime: number,
    wpm: number,
    accuracy: number,
}

interface User {
    id: string,
    username: string,
    email: string,
    password: string,
}

interface UserDetails {
    user: User,
    wpm: number,
    accuracy: number,
    level: number,
    attempts: number,
    scores: number
}

/**
Example of a TypePrompt:
{
    "id": "1",
    "quote": "The quick brown fox jumps over the lazy dog",
    "size": 43,
    "level": 1
}
 */