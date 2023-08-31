import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [openCart, setOpenCart] = useState(false);

  const showCartHandler = () => {
    setOpenCart(true);
  };

  const hideCartHandler = () => {
    setOpenCart(false);
  };
  return (
    <CartProvider>
      {openCart && <Cart onCloseCart = {hideCartHandler} />}
      <Header onShowCart = {showCartHandler} onCartOpen = {openCart}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
