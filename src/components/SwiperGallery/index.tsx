import React, { ReactElement } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import NextImage from "next/image";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type SwiperGalleryProps = {
  data: {
    img: string;
    title: string;
    alt: string;
  }[];
};

export default function SwiperGallery({ data }: SwiperGalleryProps): ReactElement {
  const [lightBoxOpen, setLightBoxOpen] = React.useState(false);
  const [activeImage, setActiveImage] = React.useState(0);
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const onClick = (index) => {
    setActiveImage(index);
    setLightBoxOpen(!lightBoxOpen);
  };

  const edgeSlidesClick = React.useCallback((index) => {
    onClick(index);
  }, []);

  React.useEffect(() => {
    const firstSlide = document.querySelector(".swiper-slide-prev");
    const lastSlide = document.querySelector(".swiper-slide-duplicate-next");

    firstSlide.addEventListener("click", () => edgeSlidesClick(data.length - 1));
    firstSlide.previousSibling?.addEventListener("click", () => edgeSlidesClick(data.length - 2));
    lastSlide.addEventListener("click", () => edgeSlidesClick(1));
    lastSlide.previousSibling?.addEventListener("click", () => edgeSlidesClick(0));

    return () => {
      firstSlide.removeEventListener("click", () => edgeSlidesClick(data.length - 1));
      firstSlide.previousSibling?.removeEventListener("click", () =>
        edgeSlidesClick(data.length - 2)
      );
      lastSlide.addEventListener("click", () => edgeSlidesClick(1));
      lastSlide.previousSibling?.addEventListener("click", () => edgeSlidesClick(0));
    };
  }, [edgeSlidesClick]);

  const params = {
    slidesPerView: 3,
    modules: [Navigation],
    spaceBetween: 0,
    loop: true,
    roundLengths: true,
    centeredSlides: true,
    navigation: {
      nextEl: navigationPrevRef.current,
      prevEl: navigationPrevRef.current,
    },
  };
  const customStyles = {
    overlay: {
      zIndex: "1030",
    },
    bodyOpen: {
      position: "fixed",
    },
  };

  return (
    <>
      <Swiper
        {...params}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="img-gallery">
            <NextImage
              src={item.img}
              width={1350}
              height={900}
              layout="responsive"
              alt={item.alt}
              loading="eager"
              className="img-fluid img-gallery"
              sizes="35vw"
              onClick={() => onClick(index)}
            />
          </SwiperSlide>
        ))}
        <div ref={navigationPrevRef} className="swiper-button-prev swiper-button-white" />
        <div ref={navigationNextRef} className="swiper-button-next swiper-button-white" />
      </Swiper>

      {lightBoxOpen && (
        <Lightbox
          mainSrc={data[activeImage].img}
          nextSrc={data[(activeImage + 1) % data.length].img}
          prevSrc={data[(activeImage + data.length - 1) % data.length].img}
          onCloseRequest={() => setLightBoxOpen(false)}
          imageCaption={data[activeImage].title}
          onMovePrevRequest={() => setActiveImage((activeImage + data.length - 1) % data.length)}
          onMoveNextRequest={() => setActiveImage((activeImage + 1) % data.length)}
          enableZoom={false}
          reactModalStyle={customStyles}
        />
      )}
    </>
  );
}
