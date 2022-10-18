import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import GitHub from "@material-ui/icons/GitHub";
import LinkedIn from "@material-ui/icons/LinkedIn";
const About = () => {
  const visitLinkedIn = () => {
    window.location = "https://www.linkedin.com/in/farjana-fateh-mohd-17a8441a0/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
            src="https://res.cloudinary.com/farjana123/image/upload/v1662954692/avatars/hgrqyxejc8gu3aycrf1d.png"
              alt="avatar"
              target="blank"
            />
            <Typography>Farjana Fatehmohd</Typography>
            <Button onClick={visitLinkedIn} color="primary">
              Visit LinkedIn
            </Button>
            <span>
              This is a sample Ecommerce wesbite made by @Farjana Fatehmohd. Only with the
              purpose of to learn MERN Stack and to show my knowledge and experience in organization.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Folllow Me Here</Typography>
            <a
              href="https://github.com/Farjana1khan"
              target="blank"
            >
              <GitHub className="gitHubIcon" />
            </a>

            <a href="https://www.linkedin.com/in/farjana-fateh-mohd-17a8441a0/" target="blank">
              <LinkedIn className="linkedInIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
