const Mothers = document.querySelector('.Mothers')
import {getData} from './FetchData.js';
getData('http://192.168.0.103:3000/CPU',Mothers)

