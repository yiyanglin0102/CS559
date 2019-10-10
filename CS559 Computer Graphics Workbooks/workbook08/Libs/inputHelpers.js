/*jshint esversion: 6 */
// @ts-check

// useful utility function for creating HTML
/**
 * https://plainjs.com/javascript/manipulation/insert-an-element-after-or-before-another-32/
 * inserts an element after another element (referenceNode)
 * @param {HTMLElement} el 
 * @param {HTMLElement} referenceNode 
 */
export function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

/**
 * allow for flexible insertion
 * 
 * Note: an HTMLElement works to meet WhereSpec since it has appendChild
 * @typedef WhereSpec
 * @property [after]
 * @property [end]
 * @property [appendChild]
 * /
 
/**
 * insert an element into the DOM - uses a WhereSpec to figure out where to
 * put it
 * 
 * @param {HTMLElement} el 
 * @param {WhereSpec} [where] 
 */
export function insertElement(el, where=undefined) {
    if (!where) {
        console.log("Warning: appending element to end of body because WHERE can't figure out a better place");
        document.body.appendChild(el);
    } else if (where.appendChild) {
        where.appendChild(el);
    } else if (where.after) {
        insertAfter(el,where.after);
    } else if (where.end) {
        where.end.appendChild(el);
    } else {
        console.log("Warning: appending element to end of body because WHERE can't figure out a better place");
        document.body.appendChild(el);
    }
}

/**
 * 
 * @param {String} str 
 * @param {WhereSpec} [where] 
 * @param {String} [label] 
 */
export function makeCheckbox(str,where,label=undefined) {
    label = label ? label : str;

    let safename = str.replace(/ /g,str);

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.id = "check-"+safename;
    insertElement(checkbox,where);

    let checklabel = document.createElement("label");
    checklabel.setAttribute("for","check-"+safename);
    checklabel.innerText = label;
    insertAfter(checklabel,checkbox);

    return checkbox;
}

export function makeButton(str,where) {
    let safename = str.replace(/ /g,str);

    let button = document.createElement("button");
    button.innerHTML = str;
    insertElement(button,where);

    return button;
}

export function makeBoxDiv(params,where) {
    if (!params) params = {};

    if (!params.margin) params.margin = 5;
    if (!params.padding) params.padding = 5;

    let style = `border:2px solid black; padding:${params.padding}px; margin:${params.margin}px; border-radius:5px`;

    if (params.width) style += `; width:${Number(params.width) - 2*params.margin}px`;

    let div = document.createElement("div");
    div.setAttribute("style",style);
    insertElement(div,where);
    return div;
}

export function makeFlexDiv(where) {
    let style = "display: flex; flex-direction: row;";
    let div = document.createElement("div");
    div.setAttribute("style",style);
    insertElement(div,where);
    return div;
}

export function makeOutbox(str,where, label) {
    label = label ? label : str;

    let safename = str.replace(/ /g,str);

    let text = document.createElement("input");
    insertElement(text,where);
    text.id = name+"-text";
    text.setAttribute("type","text");
    text.style.width = "50px";
    text.setAttribute("readonly","1");

    let checklabel = document.createElement("label");
    checklabel.setAttribute("for","check-"+safename);
    checklabel.innerText = label;
    insertAfter(checklabel,text);

    return text;

}
/**
 * 
 * @param {Array<String>} values 
 * @param {WhereSpec} where 
 * @param {string} [initial] 
 */
export function makeSelect(values, where, initial) {
    let select = document.createElement("select");
    values.forEach(function(ch) {
        let opt = document.createElement("option");
        opt.value = ch;
        opt.text = ch;
        select.add(opt);
        if (initial) select.value = initial;
    });
    insertElement(select,where);
    return select;
}

/**
 * just stick a break in (to start a new line)
 */
export function makeBreak(where) {
    let br=document.createElement("BR");
    insertElement(br,where);
    return br;
}


/**
 * Create a Heading and stick it into the DOM
 * 
 * extra control to get rid of space above/below
 * 
 * @param {string} text 
 * @param {WhereSpec} where 
 * @param {Object} params
 * @property {number} [top]
 * @property {number} [bottom]
 * @property {boolean} [tight]
 * @property {number} [level=3]
 */
export function makeHead(text,where,params={}) {
    let style = "";
    if ("top" in params) style += `margin-top:${params.top}px;`;
    if ("bottom" in params) style += `margin-bottom:${params.bottom}px;`;
    if ("tight" in params) style += `margin-top:0;margin-bottom:0`;
    let level = params.level || 3;
    let htype = "H"+level;
    let head = document.createElement(htype);
    head.setAttribute("style",style);
    head.innerText = text;
    insertElement(head,where);
    return head;
}

/**
 * Label Slider is a class (since you might want to access the component things)
 * 
 * This makes a slider and a corresponding label and textbox for the value
 */
export class LabelSlider {
    /**
     * 
     * @param {string} name 
     * @param {Object} params
     * @param {number} [params.width = 250]
     * @param {number} [params.min = -1]
     * @param {number} [params.max = -1]
     * @param {number} [params.step = .1]
     * @param {number} [params.initial = 0]
     * @param {function} [params.oninput]
     * @param {WhereSpec} [params.where]
     */
    constructor(name,params) {
        let min = params.min || 0;
        let max = params.max || 1;
        let step =params.step || 0.1;
        let initial = params.initial || 0;

        let width = params.width || 250;

        this.div = document.createElement("div");

        this.label = document.createElement("label");
        this.label.setAttribute("for",name+"-text");
        this.label.setAttribute("style","padding:5px; width:40px; display:inline-block;");
        this.label.innerText = name;
        this.div.appendChild(this.label);

        this.text = document.createElement("input");
        this.div.appendChild(this.text);
        this.text.id = name+"-text";
        this.text.setAttribute("type","text");
        this.text.setAttribute("style","width:40px");
        this.text.setAttribute("readonly","1");

        this.range = document.createElement("input");
        this.div.appendChild(this.range);
        this.range.id = name + "-slider";
        this.range.setAttribute("type","range");
        this.range.setAttribute("style",`width:${width-120}px`);
        // give default values for range
        this.setRange(min,max,step);

        this.range.value = String(initial);

        this.oninput = params.oninput;

        let self=this;
        function fupdate() {
            self.update();
        }
        this.range.oninput = fupdate;
        this.update();

        if ("where" in params) {
            insertElement(this.div,params.where);
        }
    }

    setRange(min,max,step) {
        this.range.setAttribute("min",String(min));
        this.range.setAttribute("max",String(max));
        this.range.setAttribute("step",String(step));
    }

    update() {
        this.text.value = Number(this.range.value).toFixed(2);
        if (this.oninput) this.oninput(this);
    }

    value() {
        return Number(this.range.value);
    }

    set(val) {
        this.range.value = String(val);
        this.update();
    }
}
