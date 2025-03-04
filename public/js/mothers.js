const Mothers = document.querySelector('.Mothers')
async function getData() {
    try {
        const response = await fetch('http://192.168.0.103:3000/Mothers');
        const data = await response.json();
        data.forEach(el => {
            Mothers.innerHTML += 
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

getData()
