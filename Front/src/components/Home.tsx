import React from "react";
import useHome from "../hooks/useHome";
import "./index.css"
const Home = ({ setRoute }: { setRoute: (data: any) => void }) => {
  const { loading, products } = useHome();
  return (
    <div>
      {loading && <div className="back">Loading....</div>}

      <button className="toPanier" onClick={() => setRoute({ route: "cart" })}>Aller sur panier</button>
      <div className="product-block">
        {products.map((product) => {
          return (
            <div key={product.name} >
              <div className="product" key={product.id} onClick={() => setRoute({ route: "product", data: product })}>
                <img src={product.image} alt="" />
                <p>Figurine de {product.name}</p>
                <p>Quantitée <span style={{ color: "blue" }}>{product.quantity}</span> </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
