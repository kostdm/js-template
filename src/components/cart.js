import {Parody, ParodyDom} from '../parody';
import InputNumber from './input-number';

export default class Cart extends Parody {
    constructor(props) {
        super(props);

        this.state = {
            products: [
                {price: 1000, rest: 10, current: 1},
                {price: 2000, rest: 5, current: 2}
            ]
        };
    }

    onChange(ind, val) {
        this.state.products[ind].current = val;
        this.render();
    }

    render() {
        let sum = this.state.products
            .reduce((total, item) => total + item.price * item.current, 0);

        let prod = this.state.products;

        return super.render(
            <div>
                <InputNumber min="1"
                             max={prod[0].rest}
                             value={prod[0].current}
                             change={this.onChange.bind(this, 0)}
                />
                <InputNumber min="1"
                             max={prod[1].rest}
                             value={prod[1].current}
                             change={this.onChange.bind(this, 1)}
                />
                <hr/>
                <div>{sum}</div>
            </div>
        );
    }
}