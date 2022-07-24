import { PromoCarousel, PageHeader, OrdersList } from '../components';
import { IoHomeOutline } from 'react-icons/io5';

/* eslint-disable-next-line */
export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  return (
    <section className="grid gap-4">
      <PageHeader
        icon={<IoHomeOutline className="text-2xl" />}
        title="Mi inicio"
        description="Aquí podrás ver la lista de tus pedidos"
      />
      <PromoCarousel />
      <OrdersList />
    </section>
  );
}

export default Profile;
