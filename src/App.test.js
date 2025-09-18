import { render, screen } from '@testing-library/react';
import App from './App';

test('renders password generator title', () => {
  render(<App />);
  const titleElement = screen.getByText(/password generator/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders password length input', () => {
  render(<App />);
  const inputElement = screen.getByLabelText(/password length/i);
  expect(inputElement).toBeInTheDocument();
});

test('renders generate button', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /generate/i });
  expect(buttonElement).toBeInTheDocument();
});

test('renders reset button', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', { name: /reset/i });
  expect(buttonElement).toBeInTheDocument();
});

test('renders all checkbox options', () => {
  render(<App />);
  const lowercaseCheckbox = screen.getByLabelText(/include lowercase letters/i);
  const uppercaseCheckbox = screen.getByLabelText(/include uppercase letters/i);
  const numbersCheckbox = screen.getByLabelText(/include numbers/i);
  const symbolsCheckbox = screen.getByLabelText(/include symbols/i);
  
  expect(lowercaseCheckbox).toBeInTheDocument();
  expect(uppercaseCheckbox).toBeInTheDocument();
  expect(numbersCheckbox).toBeInTheDocument();
  expect(symbolsCheckbox).toBeInTheDocument();
});
