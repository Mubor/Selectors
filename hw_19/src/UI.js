const UI = {
    updateData(data) {
        const life = document.getElementById('life-count');
        const bomb = document.getElementById('bomb-count');
        const closed = document.getElementById('closed-count');

        life.innerHTML = data.life;
        bomb.innerHTML = data.bomb;
        closed.innerHTML = data.closed;
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
        data.bomb = 0;
        data.life = 0;
        data.closed = 25;
        document.getElementById('game-field').innerHTML = '';
    }
}