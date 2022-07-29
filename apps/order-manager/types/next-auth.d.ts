import { UserT } from '@boutique-11-11/models';

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
  interface Session {
    user?: UserT;
  }
}

/** Example on how to extend the built-in types for JWT */
// declare module 'next-auth/jwt' {
//   interface JWT {
//     /** This is an example. You can find me in types/next-auth.d.ts */
//   }
// }
