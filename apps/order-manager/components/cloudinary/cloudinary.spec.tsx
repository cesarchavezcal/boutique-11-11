import { render } from '@testing-library/react';

import Cloudinary from './cloudinary';

describe('Cloudinary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Cloudinary />);
    expect(baseElement).toBeTruthy();
  });
});
