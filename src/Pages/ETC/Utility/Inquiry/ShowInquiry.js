import React, { useState } from "react";
import styled from "styled-components";

import Write from "./Write";
import NewInquiry from "./NewInquiry";

function ShowInquiry() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const writeInquiry = {
    0: <NewInquiry setCurrentIndex={setCurrentIndex} />,
    1: <Write />
  };
  return <ShowInquiryWrapper>{writeInquiry[currentIndex]}</ShowInquiryWrapper>;
}

export default ShowInquiry;

const ShowInquiryWrapper = styled.div``;
