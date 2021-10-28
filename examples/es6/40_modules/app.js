import {Employee} from './employee.js';

const p = new Employee("Mateusz", "Lewandowski", "Super Firma");
document.querySelector("#result").innerText = JSON.stringify(p);
