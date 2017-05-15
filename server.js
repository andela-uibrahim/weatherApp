import express from 'express';
import path from 'path';

// Set up the express app
const app = express();


app.use(express.static(path.join(__dirname, 'dist')));

app.all('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 4000;
app.set('port', port);
app.listen(port, () => console.log('server started'));
export default app;