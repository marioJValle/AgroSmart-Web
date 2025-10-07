import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Phone from "../components/Phone";
import Features from "../components/Features";
import About from "../components/About";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <Hero />
          </div>
          <div className="col-md-6">
            <Phone />
          </div>
        </div>
      </div>
      <Features />
      <About />
      <Footer />
    </div>
  );
};

export default LandingPage;
