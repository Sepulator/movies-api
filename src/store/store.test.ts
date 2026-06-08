import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@/__tests__/test-utils';

import { useFormsStoreBase } from './store';
import { useItems, useAddItem, useToggleModal, useResetItems, useCountries, useShowModal } from './selectors';
import type { FormItem } from '@/models/interfaces';

const newItem: FormItem = {
  id: 'random uuid',
  name: 'Test Name',
  age: 25,
  email: 'test@example.com',
  gender: 'male',
  password: 'password123',
  confirmPassword: 'password123',
  country: 'Bahamas',
  image: 'base64image',
  termsAndConditions: true,
};

describe('Forms Store and Selectors', () => {
  beforeEach(() => {
    act(() => {
      useFormsStoreBase.getState().reset();
    });
    act(() => {
      useFormsStoreBase.getState().toggleModal('none');
    });
  });

  it('should initialize with correct default values', () => {
    const { result: itemsResult } = renderHook(() => useItems());
    const { result: modalResult } = renderHook(() => useShowModal());
    const { result: countriesResult } = renderHook(() => useCountries());

    expect(itemsResult.current).toEqual([]);
    expect(modalResult.current).toBe('none');
    expect(countriesResult.current.length).toBeGreaterThan(0);
  });

  it('should add an item', () => {
    const { result: addItemResult } = renderHook(() => useAddItem());
    const { result: itemsResult } = renderHook(() => useItems());

    act(() => {
      addItemResult.current(newItem);
    });

    expect(itemsResult.current).toHaveLength(1);
    expect(itemsResult.current[0]).toEqual(newItem);
  });

  it('should toggle the modal', () => {
    const { result: toggleModalResult } = renderHook(() => useToggleModal());
    const { result: modalResult } = renderHook(() => useShowModal());

    act(() => {
      toggleModalResult.current('contolled');
    });

    expect(modalResult.current).toBe('contolled');
  });

  it('should reset the items', () => {
    const { result: addItemResult } = renderHook(() => useAddItem());
    const { result: resetResult } = renderHook(() => useResetItems());
    const { result: itemsResult } = renderHook(() => useItems());

    act(() => {
      addItemResult.current(newItem);
    });
    expect(itemsResult.current).toHaveLength(1);

    act(() => {
      resetResult.current();
    });
    expect(itemsResult.current).toHaveLength(0);
  });
});
