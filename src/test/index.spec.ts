import { useState } from 'react'
import { act, renderHook } from '@testing-library/react-hooks'

import useWatch from '..'

describe('Correctly working with primitives', () => {
  it('test with number', () => {
      const useTest = () => {
        const [value, setValue] = useState(1);
        const [prevValue, setPrevValue] = useState<number | undefined>(undefined);
        useWatch((_, prevCount) => {
          setPrevValue(prevCount)
        }, value);
        return { value, setValue, prevValue }
      };
      const { result } = renderHook(() => useTest());

      expect(result.current.value).toBe(1);
      expect(result.current.prevValue).toBeUndefined();
      act(() => { result.current.setValue(7); })
      expect(result.current.value).toBe(7);
      expect(result.current.prevValue).toBe(1);
      act(() => { result.current.setValue(44); })
      expect(result.current.value).toBe(44);
      expect(result.current.prevValue).toBe(7);
  });
});