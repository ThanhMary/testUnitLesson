import { useState, useEffect } from 'react';
import { endpoint, ProductObject as Product } from "../App";

const useHome = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = () => {
    fetch(`${endpoint}/products`)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setProducts(res);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    loading,
    products,
    loadProducts,
  };
};

export default useHome;