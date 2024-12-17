import React from "react";

const HeroSection = () => (
  <div class="slider-area2">
    <div class="slider-height2 d-flex align-items-center justify-content-center">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="hero-cap text-center">
              <h2>Schedule</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ScheduleContent = () => (
  <main>
    {/* <!--? Hero Start --> */}

    {/* <!-- Hero End --> */}
    {/* <!--? accordion --> */}
    <section class="accordion fix section-padding30">
      <div class="container">
        <div class="row ">
          <div class="col-lg-11  mx-auto">
            <div class="properties__button mb-40">
              {/* <!--Nav Button  --> */}
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <a
                    class="nav-item nav-link active"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav-home"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Day - 01
                  </a>
                  <a
                    class="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    href="#nav-profile"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    {" "}
                    Day - 02
                  </a>
                  <a
                    class="nav-item nav-link"
                    id="nav-contact-tab"
                    data-toggle="tab"
                    href="#nav-contact"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    {" "}
                    Day - 03{" "}
                  </a>
                  <a
                    class="nav-item nav-link"
                    id="nav-dinner-tab"
                    data-toggle="tab"
                    href="#nav-dinner"
                    role="tab"
                    aria-controls="nav-dinner"
                    aria-selected="false"
                  >
                    {" "}
                    Day - 04{" "}
                  </a>
                </div>
              </nav>
              {/* <!--End Nav Button  --> */}
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        {/* <!-- Nav Card --> */}
        <div class="tab-content" id="nav-tabContent">
          {/* <!-- card one --> */}
          <div
            class="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <div class="row">
              <div class="col-lg-11 mx-auto">
                <div class="accordion-wrapper">
                  <div class="accordion" id="accordionExample">
                    {/* <!-- single-one --> */}
                    <div class="card">
                      <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                          <a
                            href="#"
                            class="btn-link collapsed"
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            <span>8:30 AM - 9:30 AM</span>
                            <p>Snackes</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id="collapseTwo"
                        class="collapse show"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          There arge many variations ohf passages of sorem gpsum
                          ilable, but the majority have suffered alteration in
                          some form, by ected humour, or randomised words
                          whi.rere arge many variations ohf passages of sorem
                          gpsum ilable.
                        </div>
                      </div>
                    </div>
                    {/* <!-- single-two --> */}
                    <div class="card">
                      <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                          <a
                            href="#"
                            class="btn-link"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            <span>8:30 AM - 9:30 AM</span>
                            <p>Opening conference</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id="collapseOne"
                        class="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          There arge many variations ohf passages of sorem gpsum
                          ilable, but the majority have suffered alteration in
                          some form, by ected humour, or randomised words
                          whi.rere arge many variations ohf passages of sorem
                          gpsum ilable.
                        </div>
                      </div>
                    </div>
                    {/* <!-- single-three --> */}
                    <div class="card">
                      <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                          <a
                            href="#"
                            class="btn-link collapsed"
                            data-toggle="collapse"
                            data-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            <span>8:30 AM - 9:30 AM</span>
                            <p>Conference ending</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id="collapseThree"
                        class="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          There arge many variations ohf passages of sorem gpsum
                          ilable, but the majority have suffered alteration in
                          some form, by ected humour, or randomised words
                          whi.rere arge many variations ohf passages of sorem
                          gpsum ilable.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Card two --> */}
          <div
            class="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <div class="row">
              <div class="col-lg-11">
                <div class="accordion-wrapper">
                  <div class="accordion" id="accordionExample">
                    {/* <!-- single-one --> */}
                    <div class="card">
                      <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                          <a
                            href="#"
                            class="btn-link collapsed"
                            data-toggle="collapse"
                            data-target="#collapseTwo2"
                            aria-expanded="false"
                            aria-controls="collapseTwo2"
                          >
                            <span>8:30 AM - 9:30 AM</span>
                            <p>Snackes</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id="collapseTwo2"
                        class="collapse show"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          There arge many variations ohf passages of sorem gpsum
                          ilable, but the majority have suffered alteration in
                          some form, by ected humour, or randomised words
                          whi.rere arge many variations ohf passages of sorem
                          gpsum ilable.
                        </div>
                      </div>
                    </div>
                    {/* <!-- single-two --> */}
                    <div class="card">
                      <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                          <a
                            href="#"
                            class="btn-link"
                            data-toggle="collapse"
                            data-target="#collapseOne1"
                            aria-expanded="true"
                            aria-controls="collapseOne1"
                          >
                            <span>8:30 AM - 9:30 AM</span>
                            <p>Opening conference</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id="collapseOne1"
                        class="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          There arge many variations ohf passages of sorem gpsum
                          ilable, but the majority have suffered alteration in
                          some form, by ected humour, or randomised words
                          whi.rere arge many variations ohf passages of sorem
                          gpsum ilable.
                        </div>
                      </div>
                    </div>
                    {/* <!-- single-three --> */}
                    <div class="card">
                      <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                          <a
                            href="#"
                            class="btn-link collapsed"
                            data-toggle="collapse"
                            data-target="#collapseThree3"
                            aria-expanded="false"
                            aria-controls="collapseThree3"
                          >
                            <span>8:30 AM - 9:30 AM</span>
                            <p>Conference ending</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id="collapseThree3"
                        class="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          There arge many variations ohf passages of sorem gpsum
                          ilable, but the majority have suffered alteration in
                          some form, by ected humour, or randomised words
                          whi.rere arge many variations ohf passages of sorem
                          gpsum ilable.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Card three --> */}
          <div
            class="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
          >
            <div class="row">
              <div class="col-lg-11">
                <div class="accordion-wrapper">
                  <div class="accordion" id="accordionExample">
                    {/* <!-- single-one --> */}
                    <div class="card">
                      <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                          <a
                            href="#"
                            class="btn-link collapsed"
                            data-toggle="collapse"
                            data-target="#collapseTwo01"
                            aria-expanded="false"
                            aria-controls="collapseTwo01"
                          >
                            <span>8:30 AM - 9:30 AM</span>
                            <p>Snackes</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id="collapseTwo01"
                        class="collapse show"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          There arge many variations ohf passages of sorem gpsum
                          ilable, but the majority have suffered alteration in
                          some form, by ected humour, or randomised words
                          whi.rere arge many variations ohf passages of sorem
                          gpsum ilable.
                        </div>
                      </div>
                    </div>
                    {/* <!-- single-two --> */}
                    <div class="card">
                      <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                          <a
                            href="#"
                            class="btn-link"
                            data-toggle="collapse"
                            data-target="#collapseOne02"
                            aria-expanded="true"
                            aria-controls="collapseOne02"
                          >
                            <span>8:30 AM - 9:30 AM</span>
                            <p>Opening conference</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id="collapseOne02"
                        class="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          There arge many variations ohf passages of sorem gpsum
                          ilable, but the majority have suffered alteration in
                          some form, by ected humour, or randomised words
                          whi.rere arge many variations ohf passages of sorem
                          gpsum ilable.
                        </div>
                      </div>
                    </div>
                    {/* <!-- single-three --> */}
                    <div class="card">
                      <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                          <a
                            href="#"
                            class="btn-link collapsed"
                            data-toggle="collapse"
                            data-target="#collapseThree03"
                            aria-expanded="false"
                            aria-controls="collapseThree03"
                          >
                            <span>8:30 AM - 9:30 AM</span>
                            <p>Conference ending</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id="collapseThree03"
                        class="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          There arge many variations ohf passages of sorem gpsum
                          ilable, but the majority have suffered alteration in
                          some form, by ected humour, or randomised words
                          whi.rere arge many variations ohf passages of sorem
                          gpsum ilable.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Card Four --> */}
          <div
            class="tab-pane fade"
            id="nav-dinner"
            role="tabpanel"
            aria-labelledby="nav-dinner"
          >
            <div class="row">
              <div class="col-lg-11">
                <div class="accordion-wrapper">
                  <div class="accordion" id="accordionExample">
                    {/* <!-- single-one --> */}
                    <div class="card">
                      <div class="card-header" id="headingTwo">
                        <h2 class="mb-0">
                          <a
                            href="#"
                            class="btn-link collapsed"
                            data-toggle="collapse"
                            data-target="#collapseTwo10"
                            aria-expanded="false"
                            aria-controls="collapseTwo10"
                          >
                            <span>8:30 AM - 9:30 AM</span>
                            <p>Snackes</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id="collapseTwo10"
                        class="collapse show"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          There arge many variations ohf passages of sorem gpsum
                          ilable, but the majority have suffered alteration in
                          some form, by ected humour, or randomised words
                          whi.rere arge many variations ohf passages of sorem
                          gpsum ilable.
                        </div>
                      </div>
                    </div>
                    {/* <!-- single-two --> */}
                    <div class="card">
                      <div class="card-header" id="headingOne">
                        <h2 class="mb-0">
                          <a
                            href="#"
                            class="btn-link"
                            data-toggle="collapse"
                            data-target="#collapseOne20"
                            aria-expanded="true"
                            aria-controls="collapseOne20"
                          >
                            <span>8:30 AM - 9:30 AM</span>
                            <p>Opening conference</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id="collapseOne20"
                        class="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          There arge many variations ohf passages of sorem gpsum
                          ilable, but the majority have suffered alteration in
                          some form, by ected humour, or randomised words
                          whi.rere arge many variations ohf passages of sorem
                          gpsum ilable.
                        </div>
                      </div>
                    </div>
                    {/* <!-- single-three --> */}
                    <div class="card">
                      <div class="card-header" id="headingThree">
                        <h2 class="mb-0">
                          <a
                            href="#"
                            class="btn-link collapsed"
                            data-toggle="collapse"
                            data-target="#collapseThree30"
                            aria-expanded="false"
                            aria-controls="collapseThree30"
                          >
                            <span>8:30 AM - 9:30 AM</span>
                            <p>Conference ending</p>
                          </a>
                        </h2>
                      </div>
                      <div
                        id="collapseThree30"
                        class="collapse"
                        aria-labelledby="headingThree"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          There arge many variations ohf passages of sorem gpsum
                          ilable, but the majority have suffered alteration in
                          some form, by ected humour, or randomised words
                          whi.rere arge many variations ohf passages of sorem
                          gpsum ilable.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Nav Card --> */}
      </div>
    </section>
    {/* <!-- accordion End --> */}
  </main>
);
const Schedule = () => {
  return (
    <>
      <HeroSection />
      <ScheduleContent />
    </>
  );
};

export default Schedule;
