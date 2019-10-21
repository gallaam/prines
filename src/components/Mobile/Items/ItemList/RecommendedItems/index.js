import React, { Component } from "react";
import LazyLoad from "react-lazyload";
import ProgressiveImage from "react-progressive-image";
import Ink from "react-ink";

class RecommendedItems extends Component {
    render() {
        const { addProduct, removeProduct, product } = this.props;

        product.quantity = 1;
        return (
            <React.Fragment>
                <div key={product.id} className="col-6 p-0">
                    <div className="block block-link-shadow mb-50">
                        <div className="block-content recommended-item-content pt-0 text-center">
                            <LazyLoad>
                                <ProgressiveImage
                                    src={product.image}
                                    placeholder={product.placeholder_image}
                                >
                                    {src => (
                                        <img
                                            src={src}
                                            alt={product.name}
                                            className="img-fluid recommended-item-image"
                                        />
                                    )}
                                </ProgressiveImage>
                            </LazyLoad>
                            <div className="mt-2 mb-2 recommended-item-meta">
                                <div className="px-5 text-left">
                                    <span className="meta-name">{product.name}</span>
                                    <br />
                                    <span className="meta-price">
                                        {localStorage.getItem("currencyFormat")} {product.price}
                                    </span>
                                </div>
                                <div
                                    className="btn-group btn-group-sm mt-5 btn-full"
                                    role="group"
                                    aria-label="btnGroupIcons1"
                                >
                                    <button
                                        type="button"
                                        className="btn btn-add-remove"
                                        style={{
                                            color: localStorage.getItem("cartColor-bg")
                                        }}
                                        onClick={() => removeProduct(product)}
                                    >
                                        <span className="btn-dec">-</span>
                                        <Ink duration="500" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-add-remove"
                                        style={{
                                            color: localStorage.getItem("cartColor-bg")
                                        }}
                                        onClick={() => addProduct(product)}
                                    >
                                        <span className="btn-inc">+</span>
                                        <Ink duration="500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default RecommendedItems;
