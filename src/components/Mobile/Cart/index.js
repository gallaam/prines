import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import CartItems from "./CartItems";
import { updateCart } from "../../../services/total/actions";
import { updateUserInfo } from "../../../services/user/actions";
import { addProduct, removeProduct } from "../../../services/cart/actions";
import { getRestaurantInfoById } from "../../../services/items/actions";
import BackWithSearch from "../../Mobile/Elements/BackWithSearch";
import RestaurantInfoCart from "./RestaurantInfoCart";
import OrderComment from "./OrderComment";
import BillDetails from "./BillDetails";
import Coupon from "./Coupon";
import CartCheckoutBlock from "./CartCheckoutBlock";
import Footer from "../Footer";
import Meta from "../../helpers/meta";

class Cart extends Component {
    static contextTypes = {
        router: () => null
    };

    state = {
        loading: true
    };

    componentDidMount() {
        if (this.props.cartProducts.length) {
            document.getElementsByTagName("body")[0].classList.add("bg-grey");
        }

        this.props.getRestaurantInfoById(localStorage.getItem("activeRestaurant"));

        const { user } = this.props;
        if (user.success) {
            this.props.updateUserInfo(user.data.id, user.data.auth_token);
        }
    }

    componentWillReceiveProps(nextProps) {
        //if user has running order, then redirect to running order page
        const { user } = this.props;
        if (user.success) {
            if (user.running_order !== nextProps.user.running_order) {
                if (nextProps.user.running_order !== null) {
                    //user have a running order
                    this.context.router.history.push("/running-order");
                }
            }
            if (nextProps.user.running_order === null) {
                this.setState({ loading: false });
            }
        } else {
            this.setState({ loading: false });
        }
    }
    addProduct = product => {
        const { cartProducts, updateCart } = this.props;
        let productAlreadyInCart = false;

        cartProducts.forEach(cp => {
            if (cp.id === product.id) {
                cp.quantity += 1;
                productAlreadyInCart = true;
            }
        });

        if (!productAlreadyInCart) {
            cartProducts.push(product);
        }

        updateCart(cartProducts);
    };

    removeProduct = product => {
        const { cartProducts, updateCart } = this.props;

        const index = cartProducts.findIndex(p => p.id === product.id);
        //if product is in the cart then index will be greater than 0
        if (index >= 0) {
            cartProducts.forEach(cp => {
                if (cp.id === product.id) {
                    if (cp.quantity === 1) {
                        //if quantity is 1 then remove product from cart
                        cartProducts.splice(index, 1);
                    } else {
                        //else decrement the quantity by 1
                        cp.quantity -= 1;
                    }
                }
            });

            updateCart(cartProducts);
        }
    };

    componentWillUnmount() {
        document.getElementsByTagName("body")[0].classList.remove("bg-grey");
    }
    render() {
        if (window.innerWidth > 768) {
            return <Redirect to="/" />;
        }
        if (localStorage.getItem("storeColor") === null) {
            return <Redirect to={"/"} />;
        }
        if (!this.props.cartProducts.length) {
            document.getElementsByTagName("body")[0].classList.remove("bg-grey");
        }
        const { cartTotal, cartProducts, restaurant_info } = this.props;
        return (
            <React.Fragment>
                <Meta
                    seotitle={localStorage.getItem("cartPageTitle")}
                    seodescription={localStorage.getItem("seoMetaDescription")}
                    ogtype="website"
                    ogtitle={localStorage.getItem("seoOgTitle")}
                    ogdescription={localStorage.getItem("seoOgDescription")}
                    ogurl={window.location.href}
                    twittertitle={localStorage.getItem("seoTwitterTitle")}
                    twitterdescription={localStorage.getItem("seoTwitterDescription")}
                />
                {this.state.loading ? (
                    <div className="height-100 overlay-loading">
                        <div>
                            <img
                                src="/assets/img/loading-food.gif"
                                alt={localStorage.getItem("pleaseWaitText")}
                            />
                        </div>
                    </div>
                ) : (
                    <React.Fragment>
                        <BackWithSearch
                            boxshadow={true}
                            has_title={true}
                            title={localStorage.getItem("cartPageTitle")}
                            disbale_search={true}
                        />
                        {cartProducts.length ? (
                            <React.Fragment>
                                <div>
                                    <RestaurantInfoCart restaurant={restaurant_info} />
                                    <div className="block-content block-content-full bg-white pt-50 pb-5">
                                        <h2 className="item-text mb-10">
                                            {localStorage.getItem("cartItemsInCartText")}
                                        </h2>
                                        {cartProducts.map(item => (
                                            <CartItems
                                                item={item}
                                                addProduct={this.addProduct}
                                                removeProduct={this.removeProduct}
                                                key={item.id}
                                            />
                                        ))}
                                    </div>
                                    <OrderComment />
                                </div>

                                <div>
                                    <Coupon />
                                </div>

                                <div>
                                    <BillDetails total={cartTotal.totalPrice} />
                                </div>
                                <div>
                                    <CartCheckoutBlock
                                        cart_page={this.context.router.route.location.pathname}
                                    />
                                </div>
                            </React.Fragment>
                        ) : (
                            <div className="bg-white cart-empty-block">
                                <img
                                    className="cart-empty-img"
                                    src="/assets/img/cart-empty.png"
                                    alt={localStorage.getItem("cartEmptyText")}
                                />
                                <h2 className="cart-empty-text mt-50 text-center">
                                    {localStorage.getItem("cartEmptyText")}
                                </h2>
                                <Footer active_cart={true} />
                            </div>
                        )}
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    restaurant_info: state.items.restaurant_info,
    cartProducts: state.cart.products,
    cartTotal: state.total.data,
    user: state.user.user
});

export default connect(
    mapStateToProps,
    { updateUserInfo, updateCart, addProduct, removeProduct, getRestaurantInfoById }
)(Cart);
