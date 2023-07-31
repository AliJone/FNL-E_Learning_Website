import React from 'react';
import { Link } from "react-router-dom";
import './About.css';

function getRandomCircleStyle() {
  const circleSize = Math.random() * 6;
  const startPositionX = Math.random() * 100 + 'vw';
  const startPositionY = Math.random() * 10 + 100 + 'vh';
  const endPositionX = Math.random() * 100 + 'vw';
  const endPositionY = (-1 * parseFloat(startPositionY)) - Math.random() * 30 + 'vh';
  const moveDuration = 28000 + Math.random() * 9000;
  const animationDelay = Math.random() * 20000;
  const scaleDuration = 2000 + Math.random() * 3000;
  const scaleDelay = Math.random() * 4000;
  const fadeDuration = 2000 + Math.random() * 3000;
  const fadeDelay = Math.random() * 2000;
  const scaleDirection = Math.random() > 0.5 ? 'scaleUp' : 'scaleDown'; // Add this line

  return {
    '--circle-size': `${circleSize}px`,
    '--start-position-x': startPositionX,
    '--start-position-y': startPositionY,
    '--end-position-x': endPositionX,
    '--end-position-y': endPositionY,
    '--move-duration': `${moveDuration}ms`,
    '--animation-delay': `${animationDelay}ms`,
    '--scale-duration': `${scaleDuration}ms`,
    '--scale-delay': `${scaleDelay}ms`,
    '--fade-duration': `${fadeDuration}ms`,
    '--fade-delay': `${fadeDelay}ms`,
    '--scale-direction': scaleDirection, // Add this line
  };
}




function LandingPage() {
  const circles = Array.from({ length: 50 }, () => getRandomCircleStyle());

  return (
    <div className="containers" style={{ height: '100vh' }}>
      <div className="background2">

        <div class="mycontainer">
          <div class="topnav">
          <Link to={"/signin"}>Login</Link>
          <Link to={"/signup"}>SignUp</Link>
          </div>
        </div>
        <div class="mycontainer2">
          <div class="topnav">
            <a href="#contact">Demo</a>
          <Link to={"/"}>Home</Link>
          </div>
        </div>
        <div class="wrapperss">
		<ul class="ticker-list">
		  <li><h1> Mission </h1>
At FNL, our mission is to provide accessible, high-quality education to learners worldwide. We believe that everyone should have the opportunity to learn and grow, regardless of their background or circumstances. Our platform connects learners with expert instructors and top universities, allowing them to gain the knowledge and skills they need to succeed in today's rapidly changing world.</li>
		  <li><h1> History</h1>
      FNL was founded in 2023 by a group of educators and entrepreneurs who saw the potential of technology to transform education. Since then, we've grown to become one of the world's leading online learning platforms, with millions of learners in 100 countries. Our platform offers thousands of courses, taught by experts from top universities and organizations around the world.</li>
		  <li><h1> Approach </h1>
At FNL, we believe that learning should be engaging, interactive, and personalized. That's why we've developed a platform that combines cutting-edge technology with expert instruction to create a truly immersive learning experience. Our courses are designed to be flexible and accessible, with a range of formats to suit different learning styles and schedules..</li>
		  <li><h1> Community</h1>
At FNL, owe believe that learning is a collaborative process. That's why we've built a community of learners and instructors from around the world, who come together to share ideas, insights, and support. Our platform offers a range of tools and resources to help learners connect and collaborate, including discussion forums, peer review, and group projects. Whether you're a beginner or an expert, there's always something new to learn and discover on FNL.</li>
		</ul>
	</div>
      </div>
      <div className="circle-container">
        {circles.map((style, index) => (
          <div key={index} className="circle-container" style={style}>
            <div className= {Math.random() > 0.5 ?"circle" : "circle2"}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
