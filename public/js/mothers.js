const axios = require('axios');
axios.get('http://192.168.0.103:3000/Mothers')
    .then(res =>{
        console.log(res.data);
    })