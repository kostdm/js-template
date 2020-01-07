import {Parody, ParodyDom} from '../parody';
import InputNumber from './input-number';

export default class Cart extends Parody {
    constructor(props) {
        super(props);

        this.InitialState({
            products: [
                {price: 1000, rest: 10, current: 1},
                {price: 2000, rest: 5, current: 2},
                {price: 5000, rest: 25, current: 5}
            ]
        });
    }

    onChange(ind, val) {
        this.state.products[ind].current = val;
    }

    onAdd = () => {
        this.state.products.push({
            price: 500,
            rest: 7,
            current: 3
        });
    }

    onRemove(ind) {
        this.state.products.splice(ind, 1);
    }

    render() {
        let sum = this.state.products
            .reduce((total, item) => total + item.price * item.current, 0);

        let inputs = this.state.products.map((item, i) => {
            return (
            <div>
                <InputNumber min="1" max={item.rest} value={item.current}
                             change={this.onChange.bind(this, i)}
                />
                <input type="button" value="X" className="inputNumber__delete"
                       onclick={this.onRemove.bind(this, i)} />
            </div>); 
        });

        return super.render(
            <div>
                {inputs}
                <hr/>
                <input type="button" value="add"
                       onclick={this.onAdd.bind(this)}
                />
                <hr/>
                <div>{sum}</div>
            </div>
        );
    }
}