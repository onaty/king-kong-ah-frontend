import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '<src>/helpers/testUtils';
import Login from './Login';
import formHandler from '<helpers>/formHandler';

jest.mock('<helpers>/formHandler');

afterEach(cleanup);

const setup = () => {
  const utils = render(
    <MemoryRouter>
      <Login history={{}} />
    </MemoryRouter>,
  );

  return {
    ...utils,
  };
};

describe('Login', () => {
  it('should render Login page', () => {
    const { container } = setup();

    expect(container.firstChild).toBeTruthy();
  });

  it('should render with sign in text', () => {
    const { getByText } = setup();

    expect(getByText('Sign In')).toBeTruthy();
  });

  it('should call handleSubmit once', () => {
    const { getByText, getByTestId } = setup();

    fireEvent.change(getByTestId('email'), { target: { value: 'abc@de.com' } });
    fireEvent.change(
      getByTestId('password'), { target: { value: 'eazyBee8!' } },
    );
    fireEvent.click(getByText('Submit'));

    expect(formHandler).toHaveBeenCalledTimes(1);
  });
});
