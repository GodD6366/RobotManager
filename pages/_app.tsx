import { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import '../styles/globals.css';

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </SessionProvider>
  );
}

function Auth({ children }) {
  //   const { status } = useSession({ required: true });

  //   if (status === 'loading') {
  //     return (
  //       <Stack>
  //         <Skeleton height='20px' />
  //         <Skeleton height='20px' />
  //         <Skeleton height='20px' />
  //       </Stack>
  //     );
  //   }

  return children;
}
export default App;
