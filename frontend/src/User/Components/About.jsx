import React from "react";

const HeroSection = () => (
  <div className="slider-area2">
    <div className="slider-height2 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="hero-cap text-center">
              <h2>About Us</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// About Section Content
export const AboutContent = () => (
  <section className="about-low-area section-padding2">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <div className="about-caption mb-50">
            <div className="section-tittle mb-35">
              <h2>The Biggest Digital Conference.</h2>
            </div>
            <p>
              There are many variations of passages of lorem ipsum available,
              but the majority have suffered alteration in some form.
            </p>
            <p>
              There are many variations of passages of lorem ipsum available,
              but the majority have suffered alteration in some form.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-10">
              <div className="single-caption mb-20">
                <div className="caption-icon">
                  <span className="flaticon-communications-1"></span>
                </div>
                <div className="caption">
                  <h5>Where</h5>
                  <p>New York, United States</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-10">
              <div className="single-caption mb-20">
                <div className="caption-icon">
                  <span className="flaticon-education"></span>
                </div>
                <div className="caption">
                  <h5>When</h5>
                  <p>Jan. 21. 2021</p>
                </div>
              </div>
            </div>
          </div>
          <a href="#" className="btn mt-50">
            Get Your Ticket
          </a>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="about-img">
            <div className="about-font-img d-none d-lg-block">
              <img src="assets/img/gallery/about2.png" alt="" />
            </div>
            <div className="about-back-img">
              <img src="assets/img/gallery/about1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const AboutPricing = () => (
  <>
    {/* <div className="gallery-area fix">
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="gallery-box">
              <div className="single-gallery">
                <div
                  className="gallery-img "
                  style={{
                    backgroundImage: "url(assets/img/gallery/gallery1.png);",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="gallery-box">
              <div className="single-gallery">
                <div
                  className="gallery-img "
                  style={{
                    backgroundImage: "url(assets/img/gallery/gallery2.png);",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="gallery-box">
              <div className="single-gallery">
                <div
                  className="gallery-img "
                  style={{
                    backgroundImage: "url(assets/img/gallery/gallery3.png);",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="gallery-box">
              <div className="single-gallery">
                <div
                  className="gallery-img "
                  style={{
                    backgroundImage: "url(assets/img/gallery/gallery4.png);",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="gallery-box">
              <div className="single-gallery">
                <div
                  className="gallery-img "
                  style={{
                    backgroundImage: "url(assets/img/gallery/gallery5.png);",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6">
            <div className="gallery-box">
              <div className="single-gallery">
                <div
                  className="gallery-img "
                  style={{
                    backgroundImage:
                      "url(assets/img/gallery/gallery6.png);",
                  }}
                >
                  <img src="" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div> */}
    <section className="pricing-card-area section-padding2">
      <div className="container">
        {/* <!-- Section Tittle --> */}
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <div className="section-tittle text-center mb-100">
              <h2>Program Pricing</h2>
              <p>
                There arge many variations ohf passages of sorem gp ilable, but
                the majority have ssorem gp iluffe.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-10">
            <div className="single-card text-center mb-30">
              <div className="card-top">
                <span>Day - 1</span>
                <h4>$ 05.00</h4>
              </div>
              <div className="card-bottom">
                <ul>
                  <li>Increase traffic 50%</li>
                  <li>E-mail support</li>
                  <li>10 Free Optimization</li>
                  <li>24/7 support</li>
                </ul>
                <a href="services.html" className="black-btn">
                  View Spackert
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-10">
            <div className="single-card active text-center mb-30">
              <div className="card-top">
                <span>Day - 1,2,3</span>
                <h4>$ 08.00</h4>
              </div>
              <div className="card-bottom">
                <ul>
                  <li>Increase traffic 50%</li>
                  <li>E-mail support</li>
                  <li>10 Free Optimization</li>
                  <li>24/7 support</li>
                </ul>
                <a href="services.html" className="black-btn">
                  View Spackert
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-10">
            <div className="single-card text-center mb-30">
              <div className="card-top">
                <span>Day - 1,2</span>
                <h4>$ 06.00</h4>
              </div>
              <div className="card-bottom">
                <ul>
                  <li>Increase traffic 50%</li>
                  <li>E-mail support</li>
                  <li>10 Free Optimization</li>
                  <li>24/7 support</li>
                </ul>
                <a href="services.html" className="black-btn">
                  View Spackert
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

// Main About Component
const About = () => (
  <>
    <main>
      <HeroSection />
      <AboutContent />
      <AboutPricing />
    </main>
  </>
);

export default About;
