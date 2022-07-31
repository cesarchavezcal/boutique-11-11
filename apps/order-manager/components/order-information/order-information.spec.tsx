import { render } from '@testing-library/react';

import OrderInformation from './order-information';

describe('OrderInformation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OrderInformation />);
    expect(baseElement).toBeTruthy();
  });
});
