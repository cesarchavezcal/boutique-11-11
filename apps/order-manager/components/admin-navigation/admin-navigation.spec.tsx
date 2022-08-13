import { render } from '@testing-library/react';

import AdminNavigation from './admin-navigation';

describe('AdminNavigation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdminNavigation />);
    expect(baseElement).toBeTruthy();
  });
});
