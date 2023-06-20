import express from 'express';
import cors from 'cors';

const main = () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get('/health', (_req, res) => {
        res.status(200).json({status: "OK"});
    });

    app.listen(3000, () => {
        console.log('Server running at port 3000');
    });
}

main();