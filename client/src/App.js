import "./App.css";
import Footer from "./components/footer/Footer"
import Navbar from "./components/header/Navbar";
import Maincomponent from "./components/home/Maincomponent";
import Newnav from "./components/newnavbaar/Newnav";

function App() {
  return (
    <>
      <Navbar />
      <Newnav />
      <Maincomponent />
      <Footer />
    </>
  );
}

export default App;
