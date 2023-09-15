import React, { useContext, useState } from "react";
import styles from "./Cart.module.css";
import Modal from "../Modal/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

export default function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSumbit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-http-175ac-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onCloseCart} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sendong order data...</p>;

  const didSumbitModalContent = (
    <>
      <p>Successfully!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isSubmitting && !didSumbit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSumbit && didSumbitModalContent}
    </Modal>
  );
}
