const express = require('express');
const app = express();
const port = 3000;
async function GetALLData() {
    try {
        const [mothersResponse, cpuResponse] = await Promise.all([
            fetch('http://192.168.0.103:3000/Mothers'),
            fetch('http://192.168.0.103:3000/CPU')
        ]);

        const [mothers, cpus] = await Promise.all([
            mothersResponse.json(),
            cpuResponse.json()
        ]);

        const allProducts = [...mothers, ...cpus]; 
        console.log("Усі товари:", allProducts);

        return allProducts;

    } catch (error) {
        console.error("Помилка отримання товарів:", error);
    }
}
app.use(express.static("public"));
app.get('/productMothers/:name', (req,res) =>{
    const name =  req.params.name;
    const all = GetALLData();
    console.log(all);
    
})
app.get('/CPU', (req, res) => {
    res.sendFile(__dirname + '/public/CPU.html');
});
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/productMothers', (req,res) => {
    res.sendFile(__dirname + '/public/mothers.html')
})
app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});
