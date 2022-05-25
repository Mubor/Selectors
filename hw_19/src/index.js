const start = () => {
    UI.clear();
    render(sources);
    UI.updateData(data);
    UI.openWindow('Chose dificulty mode');
}

const sources = {
    bomb: 'imgs/bomb.png',
    clear: 'imgs/ok.png',
}
const data = {
    bomb: 0, 
    life: 0, 
    closed: 25
}

document.getElementById('game-field').addEventListener('click', handler.cellClick);
document.body.querySelector('.app-dialog').addEventListener('click', handler.dialogButtonClick);
start();



