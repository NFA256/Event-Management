import React from 'react'
import { AboutContent, AboutPricing } from "../Components/About";
import{ScheduleContent} from '../Components/Schedule'

const Home = () => {
  return (
    <>
      {/* <!--? slider Area Start--> */}
      <div class="slider-area position-relative">
        <div class="slider-active">
          {/* <!-- Single Slider --> */}
          <div class="single-slider slider-height d-flex align-items-center">
            <div class="container">
              <div class="row">
                <div class="col-xl-8 col-lg-8 col-md-9 col-sm-10">
                  <div class="hero__caption">
                    <span data-animation="fadeInLeft" data-delay=".1s">
                      Committed to success
                    </span>
                    <h1 data-animation="fadeInLeft" data-delay=".5s">
                      Digital Conference For Designers
                    </h1>
                    {/* <!-- Hero-btn --> */}
                    <div class="slider-btns">
                      <a
                        data-animation="fadeInLeft"
                        data-delay="1.0s"
                        href="industries.html"
                        class="btn hero-btn"
                      >
                        Download
                      </a>
                      <a
                        data-animation="fadeInRight"
                        data-delay="1.0s"
                        class="popup-video video-btn"
                        href="https://www.youtube.com/watch?v=up68UAfH0d0"
                      >
                        <i class="fas fa-play"></i>
                      </a>
                      <p
                        class="video-cap d-none d-sm-blcok"
                        data-animation="fadeInRight"
                        data-delay="1.0s"
                      >
                        Story Vidoe
                        <br />
                        Watch
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Single Slider --> */}
        </div>
        {/* <!-- Counter Section Begin --> */}
        <div class="counter-section d-none d-sm-block">
          <div class="cd-timer" id="countdown">
            <div class="cd-item">
              <span>96</span>
              <p>Days</p>
            </div>
            <div class="cd-item">
              <span>15</span>
              <p>Hrs</p>
            </div>
            <div class="cd-item">
              <span>07</span>
              <p>Min</p>
            </div>
            <div class="cd-item">
              <span>02</span>
              <p>Sec</p>
            </div>
          </div>
        </div>
        {/* <!-- Counter Section End --> */}
      </div>
      {/* <!-- slider Area End--> */}
          <AboutContent />
            <section class="team-area pt-180 pb-100 section-bg bg-info">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-9">
              {/* <!-- Section Tittle --> */}
              <div class="section-tittle section-tittle2 mb-50">
                <h2>The Most Importent Speakers.</h2>
                <p>
                  There arge many variations ohf passages of sorem gpsum ilable,
                  but the majority have suffered alteration in.
                </p>
                <a href="#" class="btn white-btn mt-30">View Spackert</a>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="single-team mb-30">
                <div class="team-img">
                  <img src="assets/img/gallery/team1.png" alt="" />
                  {/* <!-- Blog Social --> */}
                  <ul class="team-social">
                    <li>
                      <a href="#"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fas fa-globe"></i></a>
                    </li>
                  </ul>
                </div>
                <div class="team-caption">
                  <h3><a href="#">Jesscia brown</a></h3>
                  <p>Co Founder</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="single-team mb-30">
                <div class="team-img">
                  <img src="assets/img/gallery/team2.png" alt="" />
                  {/* <!-- Blog Social --> */}
                  <ul class="team-social">
                    <li>
                      <a href="#"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fas fa-globe"></i></a>
                    </li>
                  </ul>
                </div>
                <div class="team-caption">
                  <h3><a href="#">Jesscia brown</a></h3>
                  <p>Co Founder</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="single-team mb-30">
                <div class="team-img">
                  <img src="assets/img/gallery/team3.png" alt="" />
                  {/* <!-- Blog Social --> */}
                  <ul class="team-social">
                    <li>
                      <a href="#"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fas fa-globe"></i></a>
                    </li>
                  </ul>
                </div>
                <div class="team-caption">
                  <h3><a href="#">brown Rulsan</a></h3>
                  <p>Co Founder</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="single-team mb-30">
                <div class="team-img">
                  <img src="assets/img/gallery/team4.png" alt="" />
                  {/* <!-- Blog Social --> */}
                  <ul class="team-social">
                    <li>
                      <a href="#"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fas fa-globe"></i></a>
                    </li>
                  </ul>
                </div>
                <div class="team-caption">
                  <h3><a href="#">Jesscia brown</a></h3>
                  <p>Co Founder</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="single-team mb-30">
                <div class="team-img">
                  <img src="assets/img/gallery/team5.png" alt="" />
                  {/* <!-- Blog Social --> */}
                  <ul class="team-social">
                    <li>
                      <a href="#"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fas fa-globe"></i></a>
                    </li>
                  </ul>
                </div>
                <div class="team-caption">
                  <h3><a href="#">Jesscia brown</a></h3>
                  <p>Co Founder</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="single-team mb-30">
                <div class="team-img">
                  <img src="assets/img/gallery/team6.png" alt="" />
                  {/* <!-- Blog Social --> */}
                  <ul class="team-social">
                    <li>
                      <a href="#"><i class="fab fa-facebook-f"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fab fa-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fas fa-globe"></i></a>
                    </li>
                  </ul>
                </div>
                <div class="team-caption">
                  <h3><a href="#">wndfert droit</a></h3>
                  <p>Co Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
          <ScheduleContent />
          <AboutPricing />
             {/* <!--? Brand Area Start--> */}
      <section
              class="work-company section-padding30"
              style={{ background: '#218fb1ee' }}
      >
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-5 col-md-8">
              {/* <!-- Section Tittle --> */}
              <div class="section-tittle section-tittle2 mb-50">
                <h2>Our Top Genaral Sponsors.</h2>
                <p>
                  There arge many variations ohf passages of sorem gp ilable,
                  but the majority have ssorem gp iluffe.
                </p>
              </div>
            </div>
            <div class="col-lg-7">
              <div class="logo-area">
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-6">
                    <div class="single-logo mb-30">
                      <img src="assets/img/gallery/cisco_brand.png" alt="" />
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-6">
                    <div class="single-logo mb-30">
                      <img src="assets/img/gallery/cisco_brand2.png" alt="" />
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-6">
                    <div class="single-logo mb-30">
                      <img src="assets/img/gallery/cisco_brand3.png" alt="" />
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-6">
                    <div class="single-logo mb-30">
                      <img src="assets/img/gallery/cisco_brand4.png" alt="" />
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-6">
                    <div class="single-logo mb-30">
                      <img src="assets/img/gallery/cisco_brand5.png" alt="" />
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-6">
                    <div class="single-logo mb-30">
                      <img src="assets/img/gallery/cisco_brand6.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Brand Area End-->
      <!--? Blog Area Start --> */}
      <section class="home-blog-area section-padding30">
        <div class="container">
          {/* <!-- Section Tittle --> */}
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-8">
              <div class="section-tittle text-center mb-50">
                <h2>News From Blog</h2>
                <p>
                  There arge many variations ohf passages of sorem gp ilable,
                  but the majority have ssorem gp iluffe.
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6">
              <div class="home-blog-single mb-30">
                <div class="blog-img-cap">
                  <div class="blog-img">
                    <img src="assets/img/gallery/home-blog1.png" alt="" />
                    {/* <!-- Blog date --> */}
                    <div class="blog-date text-center">
                      <span>24</span>
                      <p>Now</p>
                    </div>
                  </div>
                  <div class="blog-cap">
                    <p>| Physics</p>
                    <h3>
                      <a href="blog_details.html"
                        >Footprints in Time is perfect House in Kurashiki</a
                      >
                    </h3>
                    <a href="blog_details.html" class="more-btn">Read more »</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6">
              <div class="home-blog-single mb-30">
                <div class="blog-img-cap">
                  <div class="blog-img">
                    <img src="assets/img/gallery/home-blog2.png" alt="" />
                    {/* <!-- Blog date --> */}
                    <div class="blog-date text-center">
                      <span>24</span>
                      <p>Now</p>
                    </div>
                  </div>
                  <div class="blog-cap">
                    <p>| Physics</p>
                    <h3>
                      <a href="blog_details.html"
                        >Footprints in Time is perfect House in Kurashiki</a
                      >
                    </h3>
                    <a href="blog_details.html" class="more-btn">Read more »</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Blog Area End --> */}
    </>
  );
}

export default Home