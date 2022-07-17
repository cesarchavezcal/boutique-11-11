import { render } from '@testing-library/react';

import OrdersList from './orders-list';

describe('OrdersList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrdersList />);
    expect(baseElement).toBeTruthy();
  });
});
