import express, {Request, Response} from 'express'

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hi, this is Express with TS and ES modules')
});

app.listen(PORT, () => {
    console.log(`Server is running on HTTP://localhost:${PORT}`)
})