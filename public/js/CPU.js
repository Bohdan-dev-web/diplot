const Mothers = document.querySelector('.Mothers')
async function getData(url,Section) {
    console.log("Heloo");
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        
        data.forEach(el => {
            Section.innerHTML += 
            `
            <div class="Mothers-card">
                <img class="Mothers-card__img" src="${el.img}" alt="">
                <p class="Mothers-card__title">${el.brand} ${el.model}</p>
            </div>
            ` 
        });
    } catch (error) {
        console.error('Помилка:', error);
    }
}

getData('http://192.168.0.103:3000/CPU',Mothers)