import { renderHook, act } from '@testing-library/react-hooks'
import useHome from "../../Hooks/useHome";

test('load produit', () => {
    const { result } = renderHook(() => useHome())

    act(() => {
      result.current.loadProducts()
    })
   // expect(loading).toBeTruthy();
  })

