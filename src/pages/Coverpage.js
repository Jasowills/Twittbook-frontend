import "../styles/index.css";
import logo from "../images/Group 4.png";
import LoginComponent from "../components/Login"

function Home() {
  return (
    <div className="body">
      <div className="flex">
        <div className="get">
          <div className="logo-text"><h2 className="head">TwittBook</h2></div>
         <div className="text"><h3>Twittbook helps you connect and share with the people in your life.</h3></div>
        </div>
        <LoginComponent/>
     </div>
    </div>
  );
}

export default Home;
