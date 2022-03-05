import useProduct from "../hooks/useProduct";

const Product = ({ setRoute, data: product }: any) => {
  const { quantity, message, loading, setQuantity, addProduct } =
    useProduct(product);

  return (
    <div>
      {loading && <div className="back">Loading....</div>}
      {message && <p className="back">{message}</p>}
      <button className="back" onClick={() => setRoute({ route: "home" })}>Retour</button>
      <div className="supprimer">
        <div className="product">
          <img src={product.image} alt="" />
          <p>Figurine de {product.name}</p>
          <p>Quantitée {product.quantity}</p>
        </div>
        <div style={{ marginLeft: "25%" }}>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantité à ajouter"
          />
          <button className="add" onClick={addProduct}>Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
