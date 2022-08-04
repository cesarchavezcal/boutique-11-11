import { render } from '@testing-library/react';

import ImagesCarousel from './images-carousel';

describe('ImagesCarousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ImagesCarousel />);
    expect(baseElement).toBeTruthy();
  });
});
