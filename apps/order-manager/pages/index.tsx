import { signIn } from 'next-auth/react';
export function Index() {
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
