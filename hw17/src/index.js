const changePreviousElementsColor = (element, classString, canGoldStarBeChanged = false) => {
    while(true) {
        if (element.className !== 'selected' || canGoldStarBeChanged) {
            element.className = classString;
        }

        if (element.previousElementSibling !== null) {
            element = element.previousElementSibling;
        } else break;
    }
};

const onReject = () => {
    alert('Rate it!');
}
const onSubmit = () => {
    alert('Thanks for rating)');
}

const app = {
    ratingClick(e) {
        if(e.target.tagName === 'I') {
            changePreviousElementsColor(e.target, 'selected');
            
            //меняем цвет следующих на серый 
            let element = e.target;
            while(true) {
                if (element.nextElementSibling !== null) {
                    element = element.nextElementSibling;
                } else break;

                element.className = null;
            }
        }
    },

    ratingMouseOverOut(e) {
        if(e.target.tagName === 'I') {
            let classStr = e.type === 'mouseover' ? 'previewed' : null;
            changePreviousElementsColor(e.target, classStr);
        }
    },

    buttonClick(e) {
        const buttonOpen = document.querySelector('[data-dialog]');
        const buttonReject = document.querySelector('[data-dialog-reject]');
        const buttonSubmit = document.querySelector('[data-dialog-submit]');

        if (e.target === buttonOpen) {
            modalWindow.hidden = false;
        }
        else if (e.target === buttonReject) {
            onReject();
            modalWindow.hidden = true;
        }
        else if (e.target === buttonSubmit) {
            onSubmit();
            modalWindow.hidden = true;
        }
    }
}


const rating = document.querySelector('.app-rating');
const modalWindow = document.querySelector('.app-dialog');

modalWindow.hidden = true;

document.addEventListener('click', app.buttonClick);
rating.addEventListener('click', app.ratingClick);
rating.addEventListener('mouseover', app.ratingMouseOverOut);
rating.addEventListener('mouseout', app.ratingMouseOverOut);

