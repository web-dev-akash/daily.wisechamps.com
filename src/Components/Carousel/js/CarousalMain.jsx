import React from "react";
import "../css/sandbox.css";
import "../css/embla.css";
import EmblaCarousel from "./Carousel";

const OPTIONS = { loop: true, align: "center" };
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
export const CarousalMain = () => {
  return (
    <main className="sandbox">
      <section className="sandbox__carousel">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </section>
    </main>
  );
};
