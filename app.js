const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('public'));


app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/productMothers', (req,res) => {
    res.sendFile(__dirname + '/public/mothers.html')
})
app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});
