import React, {useState} from "react";
import FormAbout from "../components/About/FormAbout";
import ShowAbout from "../components/About/ShowAbout";
import {PostButton} from "../components/ChildComponents/PostButton";

function About() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <PostButton onClick={() => setShow((prev) => !prev)} content="About Yarat" align="justify-start" />
      {show && <FormAbout setShow={setShow} />}

      <ShowAbout />
    </div>
  );
}

export default About;
