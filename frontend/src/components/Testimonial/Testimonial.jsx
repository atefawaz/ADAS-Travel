import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p>
          I recently visited [Traveling Booking] and I can't recommend it more
          enough! Their user-friendly interface made it effortless to find the
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava01} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h6 className="mb-0 mt-3">Atef Fawaz</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          I recently visited [Traveling Booking] and I can't recommend it more
          enough! Their user-friendly interface made it effortless to find the
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h6 className="mb-0 mt-3">Abed Badran </h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          I recently visited [Traveling Booking] and I can't recommend it more
          enough! Their user-friendly interface made it effortless to find the
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava03} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h6 className="mb-0 mt-3">Dhruv chauhan</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p>
          I recently visited [Traveling Booking] and I can't recommend it more
          enough! Their user-friendly interface made it effortless to find the
        </p>

        <div className="d-flex align-items-center gap-4 mt-3">
          <img src={ava02} alt="" className="w-25 h-25 rounded-2" />
          <div>
            <h6 className="mb-0 mt-3">Sathya Gnanou</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default Testimonial;
