import React from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm"
import { useContext } from "react";
import CartContext from "../../../store/cart-context";

export default function MealItem(props) {
 const cartCtx = useContext(CartContext)
  const price = `$${props.price.toFixed(2)}`

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  }
  return (
    <React.Fragment>
      <li className={styles.meal}>
        <div>
          <h3>{props.name}</h3>
          <div className={styles.description}>{props.description}</div>
          <div className={styles.price}>{price}</div>
        </div>
        <div>
        <MealItemForm onAddToCart = {addToCartHandler}/>
        </div>
      </li>
    </React.Fragment>
  );
}
