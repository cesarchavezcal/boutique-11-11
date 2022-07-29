import { render } from '@testing-library/react';

import PageSubheader from './page-subheader';

describe('PageSubheader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageSubheader />);
    expect(baseElement).toBeTruthy();
  });
});
