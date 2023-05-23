import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { useContext } from "react";
import { getCookie } from "cookies-next";
import { AuthContext } from "@/components/shared/context/authContext";
import { Lexend } from "@next/font/google";
import Header from "@/components/shared/UI/Header";
import Footer from "@/components/shared/UI/Footer";
import Tour from "../../components/particularTour/Tour";
import { useRouter } from "next/router";

const LexendFont = Lexend({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const tour = ({ tour }) => {
  return (
    <>
      <Head>
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js"></script>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <main className={`main--tour--page`}>
        <Header color="#000" />
        <Tour tour={tour} />
        <Footer black />
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  const token = context.req.cookies["token"];

  if (!token)
    return {
      redirect: {
        destination: "/login",
      },
    };

  const fetchApi = await fetch(
    `${process.env.API_URL}/api/tours?slug=${context.query.tour}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await fetchApi.json();

  return {
    props: {
      tour: data.docs,
    },
  };
}

export default tour;
