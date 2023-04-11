/* The code defines a Redux slice for a shopping cart feature. A slice is a small, independent part of the Redux store that can be updated with
its own reduces and actions*/

import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({ //used to define the cart slice and takes three properties 'name', 'initialState' and 'reducers'
    name:"cart", //name of the slice with a single reducer function called 'addToCart
    initialState:{ //represent the intial state of the slice which in this case is an rmpty array 'cartItems'
        cartItems:[],
    },
    reducers:{ //reducers property is an object that contains all the reducer funtions for the slice, which in this case has one reducer function

         addToCart: (state, action) => { /*takes tow parameters action and state. State represents the current state of the slice and the 'action' 
         represents the action dispatched*/

            const item = state.cartItems.find( /*the reducer function first check if the 'id' of the product already exists in the cartItems array. */
                (p) => p.id === action.payload.id
            );
            if (item) { /*If the product exists, the quantity of the item is incremented and the total price is updated */
                item.quantity++;
                item.attributes.price = item.oneQuantityPrice * item.quantity;
            } 
            else { // if it doesnt exist; it is pushed into the cart items array with inital quantity of 1

                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        updateCart:(state,action)=>{ //takes an action that includes an 'id', 'key' and 'val' property in its payload

            state.cartItems=state.cartItems.map((p)=>{/*The function maps over the cartItems array in the state.  */

                if(p.id===action.payload.id){ //If it finds an item with the matching 'id', it updates its 'key' property to 'val'

                    if(action.payload.key==='quantity'){ //If the key is quantity, it also updates the item's price property based on the 'bal' and 'oneQuantityPrice' property of the item

                        p.attributes.price=p.oneQuantityPrice*action.payload.val
                    }
                    return{...p,[action.payload.key]:action.payload.val} 
                }
                return p; //the funciton returns a new array with the updated items
            })
        },
        removeFromCart: (state,action) =>{
            state.cartItems=state.cartItems.filter((p)=>p.id !== action.payload.id) /*takes an 'id' property in its payload. and filters the 'cartItems' array in the state, removing
            any items with a matching 'id'. It returns a new array without the removed items */
        }
    }})
// Action creators are generated for each case reducer function
export const { addToCart, updateCart,removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;