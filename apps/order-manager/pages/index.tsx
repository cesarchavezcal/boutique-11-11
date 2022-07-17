import { ProfileCard, OrdersList } from '../components';

/* eslint-disable-next-line */
export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  return (
    <section className="container p-4 min-h-[calc(100vh-4rem)] grid grid-cols-1 gap-4">
      <ProfileCard />
      <OrdersList />
    </section>
  );
}

export default Profile;
