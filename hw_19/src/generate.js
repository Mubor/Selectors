const random = () => {
    return Math.round(Math.random());
}

const createCell = (celltype, sources) => {
    const td = document.createElement('td');
    const srcBackImg = celltype === 0 ? sources.clear : sources.bomb;
    
    const inner = `
    <div class="game__front"></div>
    <div class="game__back"><img src="${srcBackImg}" alt="backImg"></div>`;
    
    td.className = `game__cell`;
    td.innerHTML = inner;
    return td;
}

const render = (sources) => {
    const table = document.getElementById('game-field');
    
    for( let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        
        for( let j = 0; j < 5; j++) {
            let rand = random();

            if( rand === 1) data.bomb++;
            row.appendChild( createCell(rand, sources) );
        }
        
        table.appendChild(row);
    }
}