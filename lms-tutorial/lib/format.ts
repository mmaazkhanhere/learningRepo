/*A utility function used to format a numerical price value into a currency format */

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(price);
}