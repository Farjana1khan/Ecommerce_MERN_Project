import React, {Fragment} from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
function Contact() {
    return (
        <Fragment>
          <div className="mainContactContainer1">
          <div className="mainContainer">
            <div className="contactContainer1">
           
           <h3>If you have any queries related to job for
            MERN Full Stack Developer Contact Me On Email</h3>
            </div>
            <div className="contactContainer3"></div>
    <div className="contactContainer2"> 
    <a className="mailBtn"
      href="mailto:farjana09khan@gmail.com">
       <Button>Contact: farjana09khan@gmail.com</Button>
     </a>
   </div>
            </div>
          </div>
        </Fragment>
    )
}

export default Contact
