import { useSession, signIn, signOut } from 'next-auth/react';
export function Index() {
  const { data, status } = useSession();
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div>
      {data?.user && (
        <>
          <img src={data.user.image} alt="" />
          <p>Hi {data.user.name}</p>
        </>
      )}
      {!data?.user && <button onClick={() => signIn()}>Iniciar sesión</button>}
      {data?.user && <button onClick={() => signOut()}>Cerrar sesión</button>}
    </div>
  );
}

export default Index;
