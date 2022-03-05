import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { rest } from "msw";
import { setupServer } from "msw/node";
//import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import useCart from '../../hooks/useCart';
import Cart from '../../components/Cart';
import { render, waitFor, screen } from "@testing-library/react";


const server = setupServer(

    rest.get(
        "http://localhost:8000/api/cart",
        (req, res, ctx) => {
            return res(
                ctx.json({
                    products: [{ id: 3, name: 'Summer Smith', price: '15', quantity: 5, image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg' },
                    { id: 15, name: 'Alien Rick', price: '20', quantity: 20, image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg' },
                    { id: 15, name: 'Alien Rick', price: '20', quantity: 20, image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg' }
                    ]
                })
            );
        }
    ),
);


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test("loading", async () => {
    const { result } = renderHook(() => useCart());
    const { loadCart } = result.current;
    await act(async () => { await loadCart() });
    const { products } = result.current;
    expect(products).toStrictEqual([{ id: 3, name: 'Summer Smith', price: '15', quantity: 5, image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg' },
    { id: 15, name: 'Alien Rick', price: '20', quantity: 20, image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg' },
    { id: 15, name: 'Alien Rick', price: '20', quantity: 20, image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg' }
    ]);
});

test("load Cart mock", async () => {
    const { container } = render(<Cart setRoute={() => { }} />);
    await waitFor(() => screen.getByText(/Retour/i));
});
