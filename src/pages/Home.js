import Aside from "../components/Aside";
import Content from "../components/Content";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import "../styles/Home.css";
import "../styles/mediaqueries.css"
function Home() {
  return (
    <div className="body">
      <Nav />

      <div class="flex-container">
        <Sidebar />
        <Content />
        <Aside />
      </div>
    </div>
  );
}

export default Home;
