import { Lexend } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/shared/UI/Header";
import Hero from "@/components/Hero/Hero";
import SectionCards from "@/components/tourCards/sectionCards";
import Footer from "@/components/shared/UI/Footer";

export default function Home({ tours, count }) {
  return (
    <>
      <main className={` ${styles.main__home}`}>
        <Header />
        <Hero />
        <SectionCards tours={tours} count={count} />
        <Footer />
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies["token"]
    ? context.req.cookies["token"]
    : null;

  if (token) {
    try {
      const fetchApi = await fetch(`${process.env.API_URL}/api/tours`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await fetchApi.json();

      if (data.error && data.error.statusCode === 401) {
        return {
          redirect: {
            destination: "/login",
          },
        };
      }

      return {
        props: {
          tours: data.docs,
          count: data.count,
        },
      };
    } catch (error) {
      return {
        props: {
          tours: null,
        },
      };
    }
  }

  return {
    redirect: {
      destination: "/login",
    },
  };
}
