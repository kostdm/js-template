import {Parody} from '../parody';

export default class InputNumber extends Parody {
    constructor(props) {
        super(props);

        this.onChange = ('change' in props) ? props.change : function(){};
    }

    _normalizeValue(val) {
        let newVal = parseInt(val);
        if (isNaN(newVal) || newVal < this.props.min){
            newVal = this.props.min;
        } else if (newVal > this.props.max) {
            newVal = this.props.max;
        }

        this.onChange(newVal);
    }

    render() {
        let min = document.createElement('input');
        min.setAttribute('type', 'button');
        min.value = '-';
        min.addEventListener('click', () => {
            this._normalizeValue(this.props.value - 1);
        });

        let plus = document.createElement('input');
        plus.setAttribute('type', 'button');
        plus.value = '+';
        plus.addEventListener('click', (e) => {
            this._normalizeValue(this.props.value + 1);
        });

        let num = document.createElement('input');
        num.className = 'inputNumber__value';
        num.setAttribute('type', 'text');
        num.value = this.props.value;
        num.addEventListener('change', (e) => {
            this._normalizeValue(e.target.value);
        });

        let root = document.createElement('div');
        root.appendChild(min);
        root.appendChild(num);
        root.appendChild(plus);

        return super.render(root);
    }
}