import { useSession, signIn } from 'next-auth/react';
export function Index() {
  const { data, status } = useSession();
  console.log(data);
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div>
      <button onClick={() => signIn()}>Signin</button>
    </div>
  );
}

export default Index;
