import { render } from '@testing-library/react';

import OrderListCard from './order-list-card';

describe('OrderListCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrderListCard />);
    expect(baseElement).toBeTruthy();
  });
});
