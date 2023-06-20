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
    createdAt: string,
    updatedAt: string,
}

interface UserDetails {
    user: User,
    wpm: number,
    accuracy: number,
    level: number,
}