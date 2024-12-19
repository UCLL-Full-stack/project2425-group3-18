import React from 'react';
import { render, screen } from '@testing-library/react';
import ViewKotenButton from '../../components/buttons/ViewKotenButton';

window.React = React;

test('Given ViewKotenButton component is rendered, When the button is displayed, Then it should show the correct text "View Koten"', () => {
  render(<ViewKotenButton />);

  const buttonElement = screen.getByText(/view koten/i);
  expect(buttonElement).toBeTruthy();
});
