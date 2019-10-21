export const formatPrice = price => {
    if (price) {
        let formatedPrice = parseFloat(price);
        formatedPrice = formatedPrice.toFixed(2);
        return formatedPrice;
    }
    return null;
};
