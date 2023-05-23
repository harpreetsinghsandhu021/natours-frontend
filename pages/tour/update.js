import React from "react";
import Header from "@/components/shared/UI/Header";
import Wrapper from "@/components/shared/components/Wrapper";
import Footer from "@/components/shared/UI/Footer";
import UpdateForm from "@/components/updateForm/UpdateForm";

export async function getServerSideProps(context) {
  const token = context.req.cookies["token"];

  const fetchApi = await fetch(
    `${process.env.API_URL}/api/tours/${context.query.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const res = await fetchApi.json();

  if (res.error) {
    if (res.error.statusCode === 500) {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
  }

  return {
    props: {
      tour: res.docs,
    },
  };
}

const update = (props) => {
  return (
    <>
      <Header />
      <main className="main--add-tour">
        <UpdateForm tour={props.tour} addTour />
      </main>
      <Footer />
    </>
  );
};

export default update;
