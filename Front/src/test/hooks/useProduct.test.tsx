import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import useProduct from '../../hooks/useProduct';
import Product from '../../components/Product';
import { render, waitFor, screen } from "@testing-library/react";


const produit = {
    id: 3,
    name: 'Summer Smith',
    price: '15',
    quantity: 5,
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
}


const server = setupServer(

    rest.post('http://localhost:8000/api/cart/3', (req, res, ctx) => {
        return res(ctx.json({}))
    })

);


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("load product mock", async () => {
    const { container } = render(<Product data={produit} />);
    await waitFor(() => screen.getByText(/Ajouter au panier/i));
    expect(container.getElementsByTagName("img").length).toBe(1);
});



test("add in panier", async () => {
    const { result } = renderHook(() => useProduct(produit));
    const { addProduct } = result.current;
    await act(async () => { await addProduct() });
    const { message } = result.current;
    expect(message).toBe("Enregistré dans le panier");
});


