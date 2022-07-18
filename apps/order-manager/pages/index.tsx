import { ProfileCard, OrdersList, LoginCard } from '../components';
import { useSession, signOut } from 'next-auth/react';

/* eslint-disable-next-line */
export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  const { data } = useSession();
  return (
    <section className="container p-4 min-h-[calc(100vh-4rem)] grid grid-cols-1 gap-4">
      {!data ? (
        <LoginCard />
      ) : (
        <>
          <ProfileCard />
          <OrdersList />
        </>
      )}
    </section>
  );
}

export default Profile;
