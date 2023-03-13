const fs = require('fs');

const data = fs.readFileSync('./countries.txt', {encoding:'utf8', flag:'r'});

let stringSinSalto = data.split(/\n/);
let paises = []
let poblacion = []
let area = []
let densidad = []

stringSinSalto.map((item) => {
    let newItem = item.replaceAll(',', '');
    let pais = newItem.match(/[a-z][A-Z]+/gi)
    let poblacionArea = newItem.match(/[0-9]+/gi)



    if(poblacionArea !== null){
        if(poblacionArea.length === 2){
            poblacionArea.map((number, index) => {
                if(index === 0) return poblacion.push(number);
    
                if( index === 1) return area.push(number);
            });

            if(pais !== null){
                paises.push(pais.join(' '))
            }
        } 
    }
});

poblacion.map(Number)
.map((item, index) => item / Number(area[index]))
.map((item) => densidad.push(item.toFixed()));

let lastData = ['Pais - Poblacion - Area - Densidad\n'];

paises.map((item, index) => {
    if(index > 0){
        lastData.push(`${item} - ${poblacion[index]} - ${area[index]} - ${densidad[index]}\n`);
    }
})

fs.writeFileSync("countries.csv", lastData.join(' '));