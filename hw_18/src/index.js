class DisplayDOM {
    static display(app, component) {
        app.replaceChildren(component.element);
    }
}

class Base {
    constructor(tag, text, options = {}) {
        this.element = this.createBlock(tag);
        this.text = this.insertText(text);
        
        const { children, attributes } = options;
        this.attributes = this.setAttr(attributes);
        this.children = this.setChild(children);
        this.childrenObjects = children;
    }
    
    createBlock(tag) {
        return document.createElement(tag);
    }
    
    setChild(children = []) {
        for (const child of children) {
            this.element.append(child.element);
        }
        return this.element.children;
    }
    
    setAttr(attributes = {}) {
        for (const prop of Object.keys(attributes)) {
            this.element[prop] = attributes[prop];
        }
        this.element.attributes;
    }
    
    insertText(text){
        this.element.innerHTML = text;
        return this.element.innerHTML;
    }
}

class BodyItem extends Base {
    constructor(innerText){
        super('div', innerText, {
            attributes: {
                hidden: true,
                className: ['accordion__body']
            }
        });
    }
}

class AccordionItem extends Base {
    constructor(title, { item }){
        super('div', title, {
            attributes: {
                onclick: () => {
                    this.element.firstElementChild.hidden = !this.element.firstElementChild.hidden;
                },
                className: ['accordion__item']
            },
            children: [item]
        })
    }

    open() {
        this.children[0].hidden = false;
    }
    
    close() {
        this.children[0].hidden = true;
    }
}

class Accordion extends Base {
    constructor({ items }) {
        super('section', null, {
            attributes: {
                className: ['accordion']
            },
            children: items.map(el => new AccordionItem(el.title, {item: new BodyItem(el.body)}))
        })
    }

    open(id) {
        this.childrenObjects[id].open();
    }
    
    close(id) {
        this.childrenObjects[id].close();
    }
}

const data = [
    { title: 'Accordion 1', body: 'text'},
    { title: 'Accordion 2', body: 'text'},
    { title: 'Accordion 3', body: 'text'},
    { title: 'Accordion 4', body: 'text'},
    { title: 'Accordion 5', body: 'text'}
];

const main = document.getElementById('app');
const accordion = new Accordion({ items: data });
accordion.open(0);
DisplayDOM.display(main, accordion);