import React, { Component } from "react";
import Ink from "react-ink";

import { formatPrice } from "../../../helpers/formatPrice";

class CartItems extends Component {
    render() {
        const { addProduct, removeProduct, item } = this.props;
        return (
            <React.Fragment>
                <div className="cart-item-meta pt-15 pb-15">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="btn-group btn-group-sm cart-item-btn">
                        <button
                            type="button"
                            className="btn btn-add-remove"
                            style={{
                                color: localStorage.getItem("cartColor-bg")
                            }}
                            onClick={() => removeProduct(item)}
                        >
                            <span className="btn-dec">-</span>
                            <Ink duration="500" />
                        </button>
                        <button type="button" className="btn btn-quantity">
                            {item.quantity}
                        </button>
                        <button
                            type="button"
                            className="btn btn-add-remove"
                            style={{
                                color: localStorage.getItem("cartColor-bg")
                            }}
                            onClick={() => addProduct(item)}
                        >
                            <span className="btn-inc">+</span>
                            <Ink duration="500" />
                        </button>
                    </div>
                    <div className="cart-item-price">{`${localStorage.getItem(
                        "currencyFormat"
                    )}${" "}${formatPrice(item.price * item.quantity)}`}</div>
                </div>
            </React.Fragment>
        );
    }
}

export default CartItems;
