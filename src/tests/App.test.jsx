import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';


describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});

describe('App', () => {
  it('renders headline', () => {
    render(<App/>);
    const headLine = screen.getByText("Mark's To-drink list")
    expect(headLine).toBeInTheDocument();
  });
  
});