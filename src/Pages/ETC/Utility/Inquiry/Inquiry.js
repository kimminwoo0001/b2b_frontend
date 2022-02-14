import React, { useState } from "react";
import styled from "styled-components";

import FAQ from "./FAQ";

function Inquiry() {
  const [faqs, setFaqs] = useState([
    {
      question: "개인 보고서 관려해서 문의 드립니다",
      answer:
        "개인보고서-선수비교에서 박명준 선수를 선택하려고 했는데요 선택란에 없어서 문의드립니다. 혹시 데이터상에서  빠져있는건가요? 급하니 처리 부탁드려요.",
      open: false
    },
    {
      question: "개인 보고서 관려해서 문의 드립니다",
      answer:
        "개인보고서-선수비교에서 박명준 선수를 선택하려고 했는데요 선택란에 없어서 문의드립니다. 혹시 데이터상에서  빠져있는건가요? 급하니 처리 부탁드려요.",
      open: false
    },
    {
      question: "개인 보고서 관려해서 문의 드립니다",
      answer:
        "개인보고서-선수비교에서 박명준 선수를 선택하려고 했는데요 선택란에 없어서 문의드립니다. 혹시 데이터상에서  빠져있는건가요? 급하니 처리 부탁드려요.",
      open: false
    }
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <InquiryWrapper>
      {faqs.map((faq, index) => {
        return (
          <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
        );
      })}
    </InquiryWrapper>
  );
}

export default Inquiry;

const InquiryWrapper = styled.div`
  margin-top: 26.5px;
`;
