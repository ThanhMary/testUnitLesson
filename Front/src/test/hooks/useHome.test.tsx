import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render, waitFor, screen } from "@testing-library/react";
import useHome from '../../hooks/useHome';
import { rest } from "msw";
import { setupServer } from "msw/node";
//import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from '../../components/Home';




const server = setupServer(

    rest.get(
        "http://localhost:8000/api/products",
        (req, res, ctx) => {
            return res(
                ctx.json([
                    { id: 1, name: 'Rick Sanchez', price: '15', quantity: 5, image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
                    { id: 2, name: 'Morty Smith', price: '9,99', quantity: 70, image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg' },
                    { id: 3, name: 'Summer Smith', price: '15', quantity: 5, image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg' },
                ])
            );
        }
    ),
);


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


//test du chagement de tous les produits

test("loading-home", () => {
    const { result } = renderHook(() => useHome());
    const { loading } = result.current;
    expect(loading).toEqual(true);
});


test("load products mock", async () => {
    const { container } = render(<Home setRoute={() => { }} />);
    await waitFor(() => screen.getByText(/Rick Sanchez/i));
    expect(container.getElementsByTagName("img").length).toBe(3);
});