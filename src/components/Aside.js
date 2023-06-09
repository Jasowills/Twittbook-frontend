import React from "react";
import neuron from "../images/neuron.png";
import wayfarer from "../images/logo-removebg-preview(1).396db16a3623509cacbd.png";
import youtube from "../images/index.jpeg";
import react from "../images/react.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns, faDashboard } from "@fortawesome/free-solid-svg-icons";

const Aside = () => {
  return (
    <div class="aside">
      <h3 className="text-align">
        <FontAwesomeIcon icon={faColumns} /> &thinsp; Web Applications
      </h3>
      <ul>
        <a href="https://cedar-xeros-expense-tracker.vercel.app/">
          <li>
            <img src={react} className="profile-pic" alt="" />
            CedaXeros Expense Tracker
          </li>
        </a>
        <a href="https://neuron-s-quote-generator.vercel.app/">
          <li>
            <img src={neuron} className="profile-pic" alt="neuron" /> Neurons
            quote generator
          </li>
        </a>
        <a href="https://calculator-drab-two.vercel.app/">
          <li>
            <img src={react} alt="" className="profile-pic ad" /> Calculator
          </li>
        </a>
        <a href="https://wayfarer-frontend.onrender.com/">
          <li>
            <img src={wayfarer} alt="" className="profile-pic" /> Book a trip
            with Wayfarer
          </li>
        </a>
        <a href="https://neuron-s-resume-builder.vercel.app/">
          <li>
            <img src={neuron} alt="" className="profile-pic" /> Neuron's Resume
            Builder
          </li>
        </a>
        <a href="https://www.youtube.com/@codewithjace2226">
          <li>
            <img src={youtube} alt="" className="profile-pic" /> CodeWithJace
            youtube channel
          </li>
        </a>
      </ul>
    </div>
  );
};
export default Aside;
