import React, { Component } from "react";
import Collapsible from "react-collapsible";
import ContentLoader from "react-content-loader";
import Ink from "react-ink";
import LazyLoad from "react-lazyload";
import ProgressiveImage from "react-progressive-image";
import { connect } from "react-redux";

import ItemBadge from "./ItemBadge";
import RecommendedItems from "./RecommendedItems";
import { addProduct, removeProduct } from "../../../../services/cart/actions";
import Slide from "react-reveal/Slide";

class ItemList extends Component {
    render() {
        const { data, addProduct, removeProduct } = this.props;
        return (
            <React.Fragment>
                <div className="bg-white mt-20">
                    <div className="p-10">
                        {!data.recommended ? (
                            <ContentLoader
                                height={480}
                                width={400}
                                speed={1.2}
                                primaryColor="#f3f3f3"
                                secondaryColor="#ecebeb"
                            >
                                <rect x="10" y="22" rx="4" ry="4" width="185" height="137" />
                                <rect x="10" y="168" rx="0" ry="0" width="119" height="18" />
                                <rect x="10" y="193" rx="0" ry="0" width="79" height="18" />

                                <rect x="212" y="22" rx="4" ry="4" width="185" height="137" />
                                <rect x="212" y="168" rx="0" ry="0" width="119" height="18" />
                                <rect x="212" y="193" rx="0" ry="0" width="79" height="18" />

                                <rect x="10" y="272" rx="4" ry="4" width="185" height="137" />
                                <rect x="10" y="418" rx="0" ry="0" width="119" height="18" />
                                <rect x="10" y="443" rx="0" ry="0" width="79" height="18" />

                                <rect x="212" y="272" rx="4" ry="4" width="185" height="137" />
                                <rect x="212" y="418" rx="0" ry="0" width="119" height="18" />
                                <rect x="212" y="443" rx="0" ry="0" width="79" height="18" />
                            </ContentLoader>
                        ) : null}
                        {data.recommended && (
                            <h3 className="pl-10 mt-5 recommended-text">
                                {localStorage.getItem("itemsPageRecommendedText")}
                            </h3>
                        )}
                        <div className="row m-0">
                            {!data.recommended
                                ? null
                                : data.recommended.map(item => (
                                      <RecommendedItems
                                          product={item}
                                          addProduct={addProduct}
                                          removeProduct={removeProduct}
                                          key={item.id}
                                      />
                                  ))}
                        </div>
                    </div>
                    {data.items &&
                        Object.keys(data.items).map((category, index) => (
                            <div key={category}>
                                <Collapsible trigger={category} open={index === 0 ? true : false}>
                                    {data.items[category].map(item => (
                                        <Slide bottom duration={500} key={item.id}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between"
                                                }}
                                            >
                                                {item.image !== "" && (
                                                    <LazyLoad>
                                                        <ProgressiveImage
                                                            src={item.image}
                                                            placeholder={item.placeholder_image}
                                                        >
                                                            {src => (
                                                                <img
                                                                    src={src}
                                                                    alt={item.name}
                                                                    className="flex-item-image"
                                                                />
                                                            )}
                                                        </ProgressiveImage>
                                                    </LazyLoad>
                                                )}
                                                <div
                                                    className={
                                                        item.image !== ""
                                                            ? "flex-item-name"
                                                            : "flex-item-name ml-0"
                                                    }
                                                >
                                                    <span className="item-name">{item.name}</span>{" "}
                                                    <ItemBadge item={item} />
                                                    <br />
                                                    <span className="item-price">
                                                        Rs. {item.price}
                                                    </span>
                                                </div>
                                                <div className="item-actions pull-right pb-0 mt-10">
                                                    <div
                                                        className="btn-group btn-group-sm"
                                                        role="group"
                                                        aria-label="btnGroupIcons1"
                                                    >
                                                        <button
                                                            type="button"
                                                            className="btn btn-add-remove"
                                                            style={{
                                                                color: localStorage.getItem(
                                                                    "cartColor-bg"
                                                                )
                                                            }}
                                                            onClick={() => {
                                                                item.quantity = 1;
                                                                removeProduct(item);
                                                            }}
                                                        >
                                                            <span className="btn-dec">-</span>
                                                            <Ink duration="500" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-add-remove"
                                                            style={{
                                                                color: localStorage.getItem(
                                                                    "cartColor-bg"
                                                                )
                                                            }}
                                                            onClick={() => {
                                                                item.quantity = 1;
                                                                addProduct(item);
                                                            }}
                                                        >
                                                            <span className="btn-inc">+</span>
                                                            <Ink duration="500" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Slide>
                                    ))}
                                </Collapsible>
                            </div>
                        ))}
                    <div className="mb-50" />
                </div>
            </React.Fragment>
        );
    }
}

export default connect(
    null,
    { addProduct, removeProduct }
)(ItemList);
