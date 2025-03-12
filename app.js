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
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get('/productCPU/:name', async (req,res) =>{
    try {
        const all = await GetALLData(); 
        const filtered = all.filter(cpu => cpu.model === req.params.name); 

        console.log("Відфільтровані товари:", filtered);
        
        res.render("product", { allp: filtered });
    } catch (error) {
        console.error("Помилка у маршруті /product/:name:", error);
        res.status(500).send("Внутрішня помилка сервера");
    }
})
app.get('/CPU', (req, res) => {
    res.sendFile(__dirname + '/public/CPU.html');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/productMothers', (req,res) => {
    res.sendFile(__dirname + '/public/mothers.html')
})
app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});
