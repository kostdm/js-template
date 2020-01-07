function watchObj(target, callback) {
    let reactiveFunctions = {
        push: true,
        pop: true,
        splice: true,
        slice: true,
        shift: true,
        unshift: true,
        sort: true
    };

    return new Proxy(target, {
        get(targ, prop) {
            if (typeof targ[prop] === "function"){
                if (prop in reactiveFunctions) {
                    return function(...args) {
                        let res = targ[prop].apply(target, args);
                        callback();
                        return res;
                    };
                } else {
                    return targ[prop].bind(targ);
                }
            }
            return watchObj(targ[prop], callback);
        },
        set(targ, prop, val) {
            targ[prop] = val;
            callback();
            return true;
        }
    });
}

export class Parody {
    constructor(props) {
        if (typeof props !== "object") {
            props = {};
        }
        
        this.props = props;
        this.isMount = false;
        this.targetNode;
    }

    InitialState(state){
        this.state = watchObj(state, this.render.bind(this));
    }

    bindMount(selector) {
        this.isMount = true;
        this.targetNode = document.querySelector(selector);

        return this;
    }

    render(node) {
        if (this.isMount) {
            this.targetNode.innerHTML = '';
            this.targetNode.appendChild(node);  
        }
        return node;
    }
}

export function ParodyDom(tag, props, ...children) {
    console.log(tag);
    console.log(props);
    console.log(children);

    if (typeof tag === "function") {
        return (new tag(props)).render();
    }

    let node = document.createElement(tag);

    function addChildren(child){
        if (child instanceof HTMLElement){
            node.appendChild(child);
        }
        else if (typeof child === "object") {
            for (let elem of child) {
                addChildren(elem);
            }    
        } 
        else {
            let textNode = document.createTextNode(child);
            node.appendChild(textNode);
        }
    }

    children.forEach(addChildren);

    Object.assign(node, props);

    return node;
}