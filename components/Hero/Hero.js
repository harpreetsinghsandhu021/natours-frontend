import React, { useEffect, useRef } from "react";
import classes from "./Hero.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Hero = () => {
  const img1 = useRef();
  const img2 = useRef();
  const img3 = useRef();
  const box = useRef();

  useEffect(() => {
    const tl = new gsap.timeline({
      defaults: {
        scrollTrigger: {
          trigger: "#section--hero",
          start: "100% 100%",
          scrub: true,
        },
      },
    });
    tl.to(img2.current, { y: "-10%", duration: 10 });
    tl.to(img3.current, { duration: 10, y: "-10%" });
    tl.to(img1.current, { y: "6%", duration: 10 });
    tl.to(box.current, { y: "-100%", duration: 10 });
  }, []);

  return (
    <section id="section--hero" className={classes.section__hero}>
      <img
        className={`${classes.hero__img} ${classes.hero__img__1}`}
        src="/images/bg1.png"
        alt="bg-home"
        ref={img1}
      />
      <img
        className={`${classes.hero__img} ${classes.hero__img__2}`}
        src="/images/rock1.png"
        ref={img2}
        alt="rock"
      />
      <img
        className={`${classes.hero__img} ${classes.hero__img__3}`}
        src="/images/girl1.png"
        ref={img3}
        alt="bg-home"
      />
      <div ref={box} className={classes.black}></div>
      <div className={classes.cnt__box}>
        <h4>Here`s what a trip to the best rainforest</h4>
        <p>
          ngutan is a sustainable travel.magazine for travel stories that divé
          into worlds beyond our own, and the people and cultures that inhabit
          those places.
        </p>
        <button>read more</button>
      </div>
    </section>
  );
};

export default Hero;
