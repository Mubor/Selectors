//Поиск необходимых спанов
const findSpansForReplacement = (element) => {
    let result = [];
    let child = element.children;
  
    for (let i = 0; i < child.length; i++) {

        if (child[i].matches('span') && child[i].closest('.user-list') !== null) {
            result.push(child[i]);
        } 
        else if (child[i].children.length !== 0) {
            result.push(findSpansForReplacement(child[i]));
        }
    }
    return result.flat(Infinity);
};

//Подсчет всех тэгов
const countOfEachTag = (element, obj) => {
    let child = element.children;

    for (let i = 0; i < child.length; i++) {

        if (obj[child[i].tagName] !== undefined){
            obj[child[i].tagName] += 1;
        } else {
            obj[child[i].tagName] = 1;
        }

        if (child[i].children.length !== 0) {
          countOfEachTag(child[i], obj);
        }
    }

    return obj;
}

//главные ф-и приложения
const app = {
    changeFirstName(){
        const firstName = STDIN.string("Input your firstname", validateString, false);

        for (let span of spans) {
            if (span.innerHTML === "firstName") {
                span.innerHTML = firstName;
            }
        }
    },

    changeLastName(){
        const lastName = STDIN.string("Input your lastname", validateString, false);

        for (let span of spans) {
            if (span.innerHTML === "lastName") {
                span.innerHTML = lastName;
            }
        }
    },

    changeAge(){
        const year = STDIN.number("Input year of birth", validateYear, false);
        const month = STDIN.number("Input month of birth", validateMonth, false);
        let day;

        while(1) {
            day = STDIN.number("Input day of birth", validateNum, false);

            if(day < DATE.maxMonthDays(DATE.isLeapYear(year), month))
                break;
        }

        const age = DATE.getAge(day, month, year, DATE.getCurrentDate());

        for (let span of spans) {
            if (span.innerHTML === "age") {
                span.innerHTML = age;
            }
        }
    },

    insertCountInList() {
        const tagCount = countOfEachTag(document.body, {})
        let list = document.querySelector('.tag-list');
        
        tagCount.LI += Object.keys(tagCount).length;

        for (let prop in tagCount) {
            let li = list.appendChild(document.createElement('li'));
            li.innerHTML = prop + ':' + tagCount[prop];
        }
    }
}

let spans;

document.addEventListener('DOMContentLoaded', () => {
    spans = findSpansForReplacement(document.body);

    app.changeFirstName();
    app.changeLastName();
    app.changeAge();
    app.insertCountInList();
});