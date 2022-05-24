const UI = {
    updateData(data) {
        const life = document.getElementById('life-count');
        const bomb = document.getElementById('bomb-count');
        const open = document.getElementById('opened-count');

        life.innerHTML = data.life;
        bomb.innerHTML = data.bomb;
        open.innerHTML = data.open;
    },

    openWindow(message, settingsMode = true) {
        const dialogWindow = document.querySelector('.app-dialog');
        const settingsBlock = document.getElementById('settings');
        const endBlock = document.getElementById('endgame');
        const messageBlock = document.getElementById('message');

        messageBlock.innerHTML = message;

        if(settingsMode) {
            settingsBlock.hidden = false;
            endBlock.hidden = true;
        } else {
            settingsBlock.hidden = true;
            endBlock.hidden = false;
        }

        dialogWindow.hidden = false;
    },
    
    clear () {
        for (const key in data) {
            data[key] = 0;
        }
        document.getElementById('game-field').innerHTML = '';
    }
}