const Mothers = document.querySelector('.Mothers')
async function getData(url) {
    try {
        const response = await fetch(url);
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

getData('http://192.168.0.103:3000/Mothers')
module.exports = { getData }