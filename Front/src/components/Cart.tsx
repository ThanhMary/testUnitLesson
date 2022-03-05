import React from "react";
import useCart from "../hooks/useCart";
import "./index.css"
const Cart = ({ setRoute }: { setRoute: (data: any) => void }) => {
  const { loading, products, message, removeToCart } = useCart();
  return (
    <div>
      {loading && <div className="back">Loading....</div>}
      {message && <p className="back">{message}</p>}
      <button className="back" onClick={() => setRoute({ route: "home" })}>Retour</button>
      <div className="product-block">
        {products.map((product) => {
          return (
            <div>
              <div className="product">
                <img src={product.image} alt="" />
                <p>Figurine de {product.name}</p>
                <p>Quantitée {product.quantity}</p>
              </div>
              <button className="supprimer" onClick={() => removeToCart(product)}>
                Supprimer du panier
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
