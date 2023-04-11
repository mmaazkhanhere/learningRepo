("use strict"); /*A javascrip directive which helps catch coding errors and prevent certain actions that could cause problems */
const stripe = require("stripe")(process.env.STRIPE_KEY); //import stripe module and intialise it with a secret API key that is stored in the environemnt variable 'STRIPE_KEY'
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories; /*creates a controller object that handles HTTP requests and responses for a 
specific API endpoints */

module.exports = createCoreController("api::order.order", ({ strapi }) => ({ /*takes two arguments: 1) the first is a string that specifies the name of the
API endpoint 2) is a callback function that defines the controllers method */

  async create(ctx) {  //handles POST requests to the API endpoints and create a next order

    const { products } = ctx.request.body;
    try {
      const lineItems = await Promise.all( /*use 'Promise.all() method to asynchronously fetch the product data for each product in the 'products' array
      and is fetched from the Stripe service using findOne method */
        products.map(async (product) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);

          console.log("this is item------->", item);
          console.log("this is product------->", product);

          return {
            price_data: { //includes price related data for the line item and has three properties
              currency: "usd", //currency of the price
              product_data: { //includes the metadata about the product associated with the line item.
                name: item.name,
              },
              unit_amount: Math.round(item.price * 100), //unit price of the product
            },
            quantity: product.quantity, //represents the quantity of the product associated with the line item
          };
        })
      );

      /*this code block creates a Stripe checkout session and saves order data to a local database when a POST request is made to the 
      corresponding API endpoint. */
      const session = await stripe.checkout.sessions.create({

        shipping_address_collection: { allowed_countries: ["US"] }, //an object that specifies the countries where the shipping addresses are allowed
        payment_method_types: ["card"], /*an array that specifies which payment methods are allowed which in this case is only card */
        mode: "payment", //specifies the mode of the session which here is set to 'payment' meaning it is a one-time payment session
        success_url: process.env.CLIENT_URL + `/success`, // a string that specifies the URL to redirect to after a successful payment
        cancel_url: process.env.CLIENT_URL + "/failed", //a string that specifies the URL to redirect to after a failed payment
        line_items: lineItems, //an array of line items that represents the product being purchased
      });

      await strapi /*the order is saved to a local database using the following command which includes an array of products and the stripe session
      ID */
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id } });

      return { stripeSession: session }; //returns an object with a 'stripeSession' property that contains the session object returned from the stripe
    } catch (error) { //if an error, it sets the HTTp response status to 500 and returns an object with an 'error' property
      ctx.response.status = 500;
      return { error };
    }
  },
}));