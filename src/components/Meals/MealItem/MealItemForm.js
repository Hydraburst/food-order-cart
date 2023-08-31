import styles from "./MealItemForm.module.css";
import React, { useRef, useState } from "react";
import Input from "../../UI/Input";

export default function MealItemForm(props) {
  const amountInputRef = useRef();

  const [amountIsValid, setAmountIsValid] = useState(true);

  const sumbitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountToNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountToNumber < 1 ||
      enteredAmountToNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountToNumber);
  };
  return (
    <>
      <form action="" className={styles.form} onSubmit={sumbitHandler}>
        <Input
          ref={amountInputRef}
          label="Amount"
          input={{
            id: "amount_" + props.id,
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
          }}
        />
        <button name="button" id="button">
          + Add
        </button>
        {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
      </form>
    </>
  );
}
