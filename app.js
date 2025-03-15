const express = require('express');
const app = express();
const port = 3000;
async function GetALLCPU() {
    try {
        const cpuResponse = await fetch('http://192.168.0.107:3000/CPU');
        const cpus = await cpuResponse.json();
        

        return cpus;
    } catch (error) {
        console.error("Помилка отримання CPU:", error);
    }
    
}
async function GetALLMother() {
    try {
        const cpuResponse = await fetch('http://192.168.0.107:3000/Mothers');
        const cpus = await cpuResponse.json();
        

        return cpus;
    } catch (error) {
        console.error("Помилка отримання CPU:", error);
    }
    
}

app.set("view engine", "ejs");
app.use(express.static("public"));
/**
 * 
 * @param {Параметр сторінки в яку передаєтся дані для процесора і для плат і відеокерт вони окремі} page 
 * @param { функція отриманя плат або проц або відео Callback } fun 
 * @param { ід отрумуєтся в запиту до продукту  } id 
 */
async function RenredTovar(page,fun,id,res) {
    try {
        const all = await fun(); 
        console.log(all);
        
        const filtered = all.filter(cpu => cpu.id === id); 

        console.log("Відфільтровані товари:", filtered);
        
        res.render(page, { allp: filtered });
    } catch (error) {
        console.error("Помилка у маршруті /product/:name", error);
        res.status(500).send("Внутрішня помилка сервера");
    }
}
app.get('/productCPU/:name', async (req,res) =>{
    const id = req.params.name
    if(id.includes('p')){
        await RenredTovar('product',GetALLCPU,id,res)
    }
    else if (id.includes('m')) {
        await RenredTovar('mother',GetALLMother,id,res)
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
