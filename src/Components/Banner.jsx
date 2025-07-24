import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const slides = [
    {
      src: "https://res.cloudinary.com/duic0gfkw/image/upload/v1753354729/Easy_to_care_Plants_ablftq_c_pad_b_gen_fill_w_4000_h_3500_bujzdq_c_pad_b_gen_fill_w_4000_h_2000_pxku9s_c_pad_b_gen_fill_w_4000_h_1000_ofmknn.jpg",
      alt: "Easy to care plants",
    },
    {
      src: "https://res.cloudinary.com/duic0gfkw/image/upload/v1753354362/Houseplant_Basic_care_vajh27_c_pad_b_gen_fill_w_4000_h_3500_zkvz8i_c_pad_b_gen_fill_w_4000_h_2000_gfeold_c_pad_b_gen_fill_w_4000_h_1000_drzabm.jpg",
      alt: "Houseplant basic care",
    },
    {
      src: "https://res.cloudinary.com/duic0gfkw/image/upload/v1753354730/HousePlantCareCards6_dki4dd_c_pad_b_gen_fill_w_4000_h_3500_nfpl8m_c_pad_b_gen_fill_w_4000_h_2000_waz1wb_c_pad_b_gen_fill_w_4000_h_1000_xxnc6s.webp",
      alt: "Houseplant care cards",
    },
  ];

  return (
    <section className="my-6 px-4 lg:px-10">
      <div className="rounded-xl overflow-hidden shadow-md border border-[var(--secondary)]">
        <Swiper
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay, Pagination]}
          className="rounded-xl"
        >
          {slides.map(({ src, alt }, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[22vh] sm:h-[28vh] md:h-[34vh] lg:h-[40vh]">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
