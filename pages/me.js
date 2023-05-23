import React, { useContext } from "react";
import { useRouter } from "next/router";
import Header from "@/components/shared/UI/Header";
import { BiCategoryAlt } from "react-icons/bi";
import Footer from "@/components/shared/UI/Footer";
import { MdReviews } from "react-icons/md";
import { AuthContext } from "@/components/shared/context/authContext";
import { BsFillPeopleFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdOutlineContactPage } from "react-icons/md";
import classes from "../styles/me.module.css";
import SettingsForm from "@/components/settingsForm/settingsForm";

const me = (props) => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Header color />
      <main style={{ backgroundColor: "#eff4f9" }}>
        <div className="flex">
          <div className={classes.dashboard}>
            <div className={classes.sidebar}>
              <ul className={classes.navigation}>
                <li className={` ${classes.link_active} ${classes.nav_link}`}>
                  <a
                    className={`${classes.link} ${
                      props.display === "myaccount" ? classes.link__active : ""
                    } `}
                    href="/me?display=myaccount"
                  >
                    <BiCategoryAlt className={classes.svg} />
                    My Account
                  </a>
                </li>
                <li className={` ${classes.link_active} ${classes.nav_link}`}>
                  <a
                    className={`${classes.link} ${
                      props.display === "mybookings" ? classes.link__active : ""
                    } `}
                    href="/me?display=mybookings"
                  >
                    <MdReviews className={classes.svg} />
                    My Bookings
                  </a>
                </li>
                <li className={` ${classes.link_active} ${classes.nav_link}`}>
                  <a
                    className={`${classes.link} ${
                      props.display === "myreviews" ? classes.link__active : ""
                    } `}
                    href="/me?display=myreviews"
                  >
                    <BsFillPeopleFill className={classes.svg} />
                    My Review
                  </a>
                </li>
                {authCtx.userRole === "admin" && (
                  <li
                    className={` ${
                      router.query.display === "user"
                        ? classes.link_active
                        : classes.nav_link
                    }`}
                  >
                    <a
                      className={`${classes.link} ${
                        props.display === "users" ? classes.link__active : ""
                      } `}
                      href="/me?display=users"
                    >
                      <FiUsers className={classes.svg} />
                      Users
                    </a>
                  </li>
                )}
                <li className={` ${classes.link_active} ${classes.nav_link}`}>
                  <a
                    className={`${classes.link} ${
                      props.display === "passwords" ? classes.link__active : ""
                    } `}
                    href="/me?display=passwords"
                  >
                    <MdOutlineContactPage className={classes.svg} />
                    Passwords
                  </a>
                </li>
              </ul>
            </div>
            <div className={classes.cnt}>
              <SettingsForm display={props.display} user={props.user} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const userId = context.req.cookies["user"];
  const display = context.query.display;
  const fetchData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`
  );
  const res = await fetchData.json();

  return {
    props: {
      user: res.docs,
      display,
    },
  };
}

export default me;
