import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import { AuthContext } from "@/components/shared/context/authContext";
import { useAuth } from "@/components/shared/hooks/authHook";
export default function App({ Component, pageProps }) {
  const { token, userId, userRole, login, logout } = useAuth();

  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          userId,
          userRole,
          isLoggedIn: !!token,
          login,
          logout,
        }}
      >
        <Head>
          <script src="https://js.stripe.com/v3/"></script>
        </Head>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  );
}
