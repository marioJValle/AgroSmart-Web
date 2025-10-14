import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Phone from "../components/landing/Phone";
import Features from "../components/landing/Features";
import About from "../components/landing/About";

const LandingPage = () => {
  return (
    <div>
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
    </div>
  );
};

export default LandingPage;
