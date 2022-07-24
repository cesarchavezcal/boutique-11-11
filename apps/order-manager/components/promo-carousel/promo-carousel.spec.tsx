import { render } from '@testing-library/react';

import PromoCarousel from './promo-carousel';

describe('PromoCarousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PromoCarousel />);
    expect(baseElement).toBeTruthy();
  });
});
