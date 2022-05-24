const isBomb = (element) => {
    const backImgSource = element.firstElementChild.getAttribute('src');
    return backImgSource === sources.bomb;
} 

const handler = {
    cellClick(e) {
        let cell = e.target.closest('.game__cell');
        let front = cell.querySelector('.game__front');
        let back = cell.querySelector('.game__back');
        
        //turning cell;
        if (back.style.transform !== 'rotateY(360deg)') {
            front.style.transform = `rotateY(180deg)`;
            back.style.transform = `rotateY(360deg)`;
        }

        // step handling
        if (isBomb(back)) {
            data.bomb--;
            data.life--;
            data.open++;
        } else {
            data.open++
        }

        UI.updateData(data);

        //checking results
        if (data.life === 0) {
            UI.openWindow('You lose(', false);
        }else if (data.open + data.bomb === 25) {
            UI.openWindow('You win!)', false);
        }
    },

    dialogButtonClick(e) {
        const id = e.target.id;

        if (id === 'easy') {
            data.life = 3;
        } else if (id === 'norm') {
            data.life = 2;
        } else if (id === 'hard') {
            data.life = 1; 
        } else {
            start();
            return null;
        }

        UI.updateData(data);
        e.target.closest('.app-dialog').hidden = true;
    }
}
