// import Cards from "../components/common/Cards";
import Carousel from "../components/common/Carousel";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Cards from "../components/common/Cards"

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      {/* <Cards /> */}
      <Cards/>
      <Footer />
    </div>
  );
}