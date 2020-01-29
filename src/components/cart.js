import React from 'react';
import InputNumber from './input-number';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

export default class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [
                {price: 1000, rest: 10, current: 1},
                {price: 2000, rest: 5, current: 2},
                {price: 5000, rest: 25, current: 5}
            ],
            popUp: false
        };
    }

    onChange(ind, val) {
        let products = [...this.state.products];
        products[ind].current = val;
        this.setState({products});
    }

    onAdd = () => {
        let products = [...this.state.products];
        products.push({
            price: 500,
            rest: 7,
            current: 3
        });
        this.setState({products});
    }

    onRemove(ind) {
        let products = [...this.state.products];
        products.splice(ind, 1);
        this.setState({products});
    }

    popClose = () => {
        let newState = Object.assign({}, this.state);
        newState.popUp = false;
        this.setState(newState);
    }

    popOpen = () => {
        let newState = Object.assign({}, this.state);
        newState.popUp = true;
        this.setState(newState);
    }

    render() {
        let sum = this.state.products
            .reduce((total, item) => total + item.price * item.current, 0);

        let inputs = this.state.products.map((item, i) => {
            return (
            <div key={i}>
                <InputNumber min="1" max={item.rest} value={item.current}
                             change={this.onChange.bind(this, i)}
                />
                <input type="button" value="X" className="inputNumber__delete"
                       onClick={this.onRemove.bind(this, i)} />
            </div>); 
        });
        function getModalStyle() {
            const top = 50 + rand();
            const left = 50 + rand();
          
            return {
              top: `${top}%`,
              left: `${left}%`,
              transform: `translate(-${top}%, -${left}%)`,
            };
        }
          
        const useStyles = makeStyles(theme => ({
            paper: {
              position: 'absolute',
              width: 400,
              backgroundColor: theme.palette.background.paper,
              border: '2px solid #000',
              boxShadow: theme.shadows[5],
              padding: theme.spacing(2, 4, 3),
            },
        }));
        const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
const [modalStyle] = getModalStyle();
        return (
            <div>
                {inputs}
                <hr/>
                <input type="button" value="add"
                       onClick={this.onAdd}
                />
                <hr/>
                <div>{sum}</div>
                <button onClick={this.popOpen}>Open</button>
                <Modal aria-labelledby="simple-modal-title"
                       aria-describedby="simple-modal-description"
                       open={this.state.popUp}
                       onClose={this.popClose}>
                    <div style={modalStyle} className={classes.paper}>
                        {inputs}
                        <hr/>
                        <div>{sum}</div>
                    </div>
                </Modal>
            </div>
        );
    }
}
