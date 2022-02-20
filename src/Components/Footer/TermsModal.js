import React, { Fragment } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled/macro";

function TermsModal({ openModal, setOpenModal }) {
  return (
    <Fragment>
      {/* 모달창 띄웠을 때 뒤에 검정색 화면 */}
      <BackScreen
        openModal={openModal}
        onClick={() => setOpenModal(false)}
      ></BackScreen>
      <Wrapper openModal={openModal}>
        {/* 모달창 닫기 버튼 */}
        <ModalNav>
          <label>Terms of Use</label>
          <img
            src="Images/btn-popup-close.png"
            alt="closeBtn"
            onClick={() => setOpenModal(false)}
          />
        </ModalNav>
        {/* 모달 내용 */}
        <ModalContents>
          <p>
            <span>
              These Terms of use (the &quot;Terms of use&quot; or the
              &quot;Agreement&quot;) set forth the terms and conditions that
              apply to your access and use of TSB Analytics, an innovative
              platform for recording and analyzing game video, and providing
              statistical summaries to players, coaches, scouts, agents, and
              other users around the world. This Agreement is between Team
              Snowball, Inc. (&quot;Team Snowball&quot; or &quot;we&quot; or
              &quot;us&quot;) and the visitor, user, or end customer who
              accesses or uses any of the Team Snowball Services
              (&quot;You&quot; or &quot;User&quot;).
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              As used in this Agreement, the term &quot;TSB Analytics
              Services&quot; includes all websites, pages that are associated or
              within each website and all devices, applications or services that
              TSB Analytics operates or makes available to You. By accepting
              electronically (for example, clicking &quot;I Agree&quot;),
              installing, accessing or using the TSB Analytics Services, You
              agree to be bound by the terms and conditions of this Agreement
              and the Team Snowball Privacy Policy, as they may be amended from
              time to time in the future (see &quot;Modifications to this
              Agreement&quot; below). If You do not agree to this Agreement, You
              may not access the TSB Analytics Services. You may not use any of
              the authorized to accept this Agreement if You are not legally
              authorized to accept and be bound by these terms or are not at
              least 13 years of age and, in any event, of a legal age to form a
              binding contract with Team Snowball. Please note that this
              Agreement governs use of TSB Analytics Services by users located
              in the United States. If you are located outside the United
              States, a different set of terms of conditions may apply to your
              use.
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>1. Description of the TSB Analytics Services.</span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              The TSB Analytics Services allow for the video-based analysis and
              evaluation of League of Legends matches. Sports teams that are in
              a contractual relationship with Team Snowball can utilize such
              analysis or evaluations.
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>2. Registering to Use the TSB Analytics Services.</span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              As a condition to using the TSB Analytics Services, You are
              required to create an account by registering with us directly. In
              that registration process, We require that You provide only Your
              email address or cell phone number, your full name, and your
              nationality. The registration information You provide must be
              accurate, complete, and current at all times. Failure to do so
              constitutes a breach of this Agreement, which may result in
              immediate termination of Your account. You may not share your
              login information with any third party, and you must immediately
              contact us at&nbsp;
            </span>
            <a href="mailto:teamsnowball@teamsnowball.com">
              <span>teamsnowball@teamsnowball.com</span>
            </a>
            <span>
              &nbsp;if you suspect your user login information has been lost or
              disclosed to any third party. You are responsible for all
              activities that occur under your login account information.
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              In registering for the Service, You represent that You are of
              legal age to form a binding contract and are not a person barred
              from receiving products or services under the laws of the united
              States or other applicable jurisdictions.
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>3. Pricing and Billing.</span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              If You elect to use the TSB Analytics Services, You agree to the
              pricing and payment terms that exist in your separate customer
              agreement with TSB Analytics, as well as the terms below.
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              As a result of new features, functionality, or because of changes
              in our business, reserves the right to change the fees and charges
              in effect, or add new fees and charges from time to time. However,
              we will give You at least two weeks (14 days) advance notice of
              these changes by email.
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>4. Your Use of The TSB Analytics Services.</span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              We want the TSB Analytics Services to be useful, stable, and
              secure for You and all of our various users. In order to assist
              with this, we must insist on certain reasonable restrictions
              regarding Your use of the TSB Analytics Services. You represent
              and warrant that You will not use the TSB Analytics Services to:
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <ul>
            <li>
              <span>
                use any robot, spider, site search/retrieval application, or
                other manual or automatic device or process to retrieve, index,
                &quot;data mine&quot;, or in any way reproduce or circumvent the
                presentation of the TSB Analytics Services.
              </span>
            </li>
            <li>
              <span>
                interfere with or disrupt the TSB Analytics Services, or the
                servers or networks connected to the TSB Analytics Services.
              </span>
            </li>
            <li>
              <span>
                modify, adapt, sublicense, translate, sell, reverse engineer,
                decipher, decompile or otherwise disassemble any portion of the
                TSB Analytics Services, or cause others to do so.
              </span>
            </li>
            <li>
              <span>
                &quot;frame&quot; or &quot;mirror&quot; any part of the TSB
                Analytics Services, without our prior written authorization or
                use meta tags or code or other devices containing any reference
                to Us or the TSB Analytics Services in order to direct any
                person to any other websites for any purpose.
              </span>
            </li>
            <li>
              <span>
                upload, post, email, transmit or otherwise make available any
                Content that You do not have a right to make available under any
                law or under contractual or fiduciary relationships.
              </span>
            </li>
            <li>
              <span>
                upload, post, email, transmit or otherwise make available any
                material that contains software viruses Trojan horses, worms,
                time bombs, or any other computer code, files or programs
                designed to interrupt, destroy detrimentally interfere with or
                limit the functionality of any computer software or hardware or
                telecommunications equipment or intercept or expropriate any
                system, data or personal information.
              </span>
            </li>
            <li>
              <span>
                Advertise to, or solicit, any user to buy or sell any products
                or services. It is also a violation of these rules to use any
                information obtained from the TSB Analytics Services to contact,
                advertise to, solicit, or sell to any user without the
                user&apos;s prior explicit consent.
              </span>
            </li>
            <li>
              <span>
                intentionally or unintentionally violate any applicable local,
                state, national or international law.
              </span>
            </li>
          </ul>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              We reserve the right, but are not obligated to, investigate and
              terminate Your participation in the TSB Analytics Services if You
              have misused the TSB Analytics Services, or if You have violated
              (or are suspected of having violated) any of the restrictions
              above.
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>5. Information We Collect From You.</span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              In the course of using the TSB Analytics Services we may collect
              information or personal data from you. You may also have the
              opportunity to upload or add information or data to the TSB
              Analytics Services. A description of how we collect, store, and
              use any information we receive about You is included in our
              Privacy Policy.
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>6. Disclaimer of Warranties</span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              We provide the TSB Analytics Services on an &quot;as is&quot;
              basis and without any warranty or condition, express, implied or
              statutory. We do not guarantee and do not promise any specific
              results from use of the TSB Analytics Services. We and our
              members, directors, and employees specifically disclaim any
              implied warranties of title, merchantability, fitness for a
              particular purpose and non-infringement. Some states do not allow
              the disclaimer of implied warranties, so the foregoing disclaimer
              may not apply to You. You may also have other legal rights that
              vary from state to state. We do not warrant that Your use of the
              TSB Analytics Services will be accurate, complete, reliable,
              current, secure, uninterrupted, always available, or error-free,
              or will meet Your requirements, that any defects in the TSB
              Analytics Services will be corrected, or that the TSB Analytics
              Services are or will be free of viruses or other harmful
              components. We disclaim all liability for, and no warranty is made
              with respect to, connectivity and availability. We do not accept
              responsibility or liability for any Content, communication or
              other use or access of the TSB Analytics Service by anyone in
              violation of this Agreement. We are not responsible or liable in
              any manner for any Content posted on the TSB Analytics Services,
              or for any of the equipment or programming associated with or
              utilized in the TSB Analytics Services. We are not responsible for
              the use of any personal information that You disclose on the TSB
              Analytics Services.
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              The TSB Analytics Services may be temporarily unavailable from
              time to time for maintenance or other reasons. We are not
              responsible for any technical malfunction or other problems of any
              telephone network or service, computer systems, servers or
              providers, computer or mobile phone equipment, software, failure
              on account of technical problems or traffic congestion on the
              Internet, on the TSB Analytics Services, on any website or any
              combination thereof, including injury or damage to Your device,
              data, or other hardware or software, related to or resulting from
              using or downloading materials in connection with the TSB
              Analytics Services.
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              No oral or written information or advice provided by us or our
              employees shall create a warranty or in any way increase the scope
              of any warranty period.
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>7. Indemnification</span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              You shall defend, indemnify and hold harmless Team Snowball and
              its officers, directors, shareholders, and employees, and the Team
              Snowball Entities from and against all claims, suits, proceedings,
              losses, liabilities, and expenses, whether in tort, contract, or
              otherwise, that arise out of or relate, including but not limited
              to attorney&apos;s fees, in whole or in part arising out of or
              attributable to any breach of this Agreement or any activity by
              you in relation to the TSB Analytics Services or your use of the
              TSB Analytics Services.
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>8. Limitation of Liability</span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              TEAM SNOWBALL SHALL IN NO EVENT BE RESPONSIBLE OR LIABLE TO YOU OR
              TO ANY THIRD PARTY, WHETHER IN CONTRACT, WARRANTY, TORT (INCLUDING
              NEGLIGENCE) OR OTHERWISE, FOR ANY INDIRECT, SPECIAL, INCIDENTAL,
              CONSEQUENTIAL, EXEMPLARY, LIQUIDATED OR PUNITIVE DAMAGES,
              INCLUDING BUT NOT LIMITED TO LOSS OF PROFIT, REVENUE OR BUSINESS,
              ARISING IN WHOLE OR IN PART FROM YOUR ACCESS TO THE TSB ANALYTICS
              SERVICES, YOUR USE OF THE TSB ANALYTICS SERVICES, OR THIS
              AGREEMENT, EVEN IF TEAM SNOWBALL HAS BEEN ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE
              CONTRARY IN THIS AGREEMENT, TEAM SNOWBALL&apos;S LIABILITY TO YOU
              FOR ANY CAUSE WHATEVER AND REGARDLESS OF THE FORM OF THE ACTION,
              WILL AT ALL TIMES BE LIMITED TO A MAXIMUM OF $100.00 (ONE HUNDRED
              UNITED STATES DOLLARS).
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>9. Term and Termination</span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              The term of this Agreement begins when you indicate acceptance
              electronically by accessing or using the TSB Analytics Services
              and continues until terminated. Team Snowball may terminate your
              account on the TSB Analytics Services at any time, and you may
              terminate your account by sending an email to&nbsp;
            </span>
            <a href="mailto:teamsnowball@teamsnowball.com">
              <span>teamsnowball@teamsnowball.com</span>
            </a>
            <span>.</span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>10. Team Snowball&apos;s Intellectual Property Rights</span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              The content of the TSB Analytics Services, including its
              &quot;look and feel&quot; (e.g., text, graphics, images, logos and
              button icons), photographs, editorial content, notices, software
              (including html-based computer programs) and other material are
              protected under both United States and other applicable copyright,
              trademark and other laws. The content and intellectual property
              that are contained or embodied in the TSB Analytics Services
              belong or are licensed to Team Snowball Inc. or its software or
              content suppliers. Team Snowball grants you the right to view and
              use the Team Snowball Services subject to these terms. You may
              access and use the TSB Analytics Services for your personal,
              internal and non-commercial use only. Any distribution, reprint or
              electronic reproduction of any content from the TSB Analytics
              Services in whole or in part for any other purpose is expressly
              prohibited without our prior written consent. You agree not to
              use, nor permit any third party to use, the TSB Analytics Services
              or content in a manner that violates any applicable law,
              regulation or this Agreement.
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>12. How We May Communicate With You.</span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              Email communications, in-app or browser-based chat communications,
              and text messages sent from us to You are designed to make Your
              use of the TSB Analytics Services more efficient and enjoyable.
              You specifically agree to accept and consent to receiving email
              communications, in-app or browser-based chat communications, and
              text messages initiated from us, which include, without
              limitation: emails or text messages informing You about potential
              available new products, emails informing You of promotions we run
              and emails informing You of new and existing features we provide,
              or chat messages regarding your use of TSB Analytics Services.
              Standard text messaging charges applied by Your cell phone carrier
              will apply to text messages we send. If You change Your mobile
              phone service provider, the notification service may be
              deactivated for Your phone number and You may need to re-enroll in
              the notification service. We reserve the right to cancel the
              notification service at any time. If You do not wish to receive
              any of our email communications or text messages, You will have
              the opportunity to opt out of receiving communications from us
              (excluding messages targeted directly at You about matters
              regarding the state of Your account, billing, or Your continued
              use of the TSB Analytics Service).
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>13. Miscellaneous Provisions.</span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>
              a. Independent Contractors. No agency, partnership, joint venture,
              or employment relationship is created between Us as a result of
              this Agreement and You do not have any authority of any kind to
              bind Us in any respect whatsoever.&nbsp;
            </span>
          </p>
          <p>
            <span>
              b. Non-Waiver. The failure of either party to exercise in any
              respect any right provided for in this Agreement shall not be
              deemed a waiver of any further rights hereunder.&nbsp;
            </span>
          </p>
          <p>
            <span>
              c. Force Majeure. We shall not be liable for any failure to
              perform our obligations hereunder where such failure results from
              any cause beyond our reasonable control, including, without
              limitation, mechanical, electronic or communications failure or
              degradation.&nbsp;
            </span>
          </p>
          <p>
            <span>
              d. Severability. If any provision of these Terms of use is found
              to be unenforceable or invalid, that provision shall be limited or
              eliminated to the minimum extent necessary so that these Terms of
              use shall otherwise remain in full force and effect and
              enforceable.&nbsp;
            </span>
          </p>
          <p>
            <span>
              e. Assignment. These Terms of use are not assignable, transferable
              or sub-licensable by You except with Our prior written consent. We
              may transfer, assign or delegate these Terms of use and their
              rights and obligations without consent.&nbsp;
            </span>
          </p>
          <p>
            <span>
              f. Governing Law. By using the Service, You agree that these Terms
              of use shall be governed by and construed in accordance with the
              laws of the State of California, United States of America, without
              regards to its conflict of law rules.&nbsp;
            </span>
          </p>
          <p>
            <span>
              g. Arbitration Agreement and Waiver of Class Remedies. All
              disputes arising under or relating to this Agreement shall be
              resolved exclusively through arbitration in Los Angeles County,
              California, United States of America, before a single arbitrator.
              The arbitrator, and not any federal, state or local court or
              agency, shall have the exclusive authority to resolve any dispute
              arising under or relating to the interpretation, applicability,
              enforceability, or formation of this Agreement, including, but not
              limited to, any claim that all of any part of this Agreement is
              void or voidable. You further agree that You may only bring claims
              in Your individual capacity and not as a plaintiff or class member
              in any purported class or representative proceeding.&nbsp;
            </span>
          </p>
          <p>
            <span>
              h. Entire Agreement. This Agreement supersedes all prior and
              contemporaneous agreements, representations and warranties and
              understandings, whether oral or written, with respect to the
              Service, and any Content. We reserve the right, at our sole
              discretion, to modify or replace these Terms of use at any time.
              It is Your responsibility to read and become familiar with any
              modifications that We may make. using the Service following
              notification of a material change to these Terms of use shall
              constitute Your acceptance of the Terms of use as modified.&nbsp;
            </span>
          </p>
          <p>
            <span>
              i. Partial Invalidity. If, at any time, any provision hereof is or
              becomes illegal, invalid or unenforceable in any respect under the
              law of any jurisdiction, neither the legality, validity or
              enforceability of the remaining provisions hereof nor the
              legality, validity or enforceability of such provision under the
              law of any other jurisdiction shall in any way be affected or
              impaired thereby. The invalid provision shall be replaced by a
              valid one which achieves to the extent possible the original
              purpose and commercial goal of the invalid provision.&nbsp;
            </span>
          </p>
          <p>
            <span>
              j. Export Control. You shall comply with all export laws and
              restrictions and regulations of the united States Department of
              Commerce or any other united States or foreign agency or
              authority, and agree not to export, or allow the export or
              re-export of any Content in violation of any such restrictions,
              laws or regulations or unless and until all required licenses and
              authorizations are obtained to the countries specified in the
              applicable U.S. Export Administration Regulations (or any
              successor supplement or regulations). By using the TSB Analytics
              Services, You are agreeing to the foregoing and You are
              representing and warranting that You are not located in, under the
              control of, or a national or resident of any restricted country or
              on any such list.&nbsp;
            </span>
          </p>
          <p>
            <span>
              k. Modifications to the TSB Analytics Services. Team Snowball
              reserves the right at any time and from time to time to modify or
              discontinue, temporarily or permanently, the TSB Analytics
              Services with or without notice. Team Snowball reserves the right
              to change the TSB Analytics Services, including applicable fees,
              in our sole discretion and from time to time. Your use of the TSB
              Analytics Services, after you are notified of any change(s) will
              constitute your agreement to such change(s). You agree that Team
              Snowball shall not be liable to you or to any third party for any
              modification, suspensions, or discontinuance of the TSB Analytics
              Services.&nbsp;
            </span>
          </p>
          <p>
            <span>
              l. Modifications to this Agreement. Team Snowball may modify this
              Agreement from time to time. Any and all changes to this Agreement
              may be provided to you by electronic means (i.e., via email or by
              posting the information on the TSB Analytics Services). In
              addition, the Agreement will always indicate the date it was last
              revised. You are deemed to accept and agree to be bound by any
              changes to the Agreement when you use the TSB Analytics Services
              after those changes are posted.
            </span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>14. Questions and Contact Information.</span>
          </p>
          <p>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>You may contact us by email at&nbsp;</span>
            <a href="mailto:teamsnowball@teamsnowball.com">
              <span>teamsnowball@teamsnowball.com</span>
            </a>
            <span>&nbsp;</span>
          </p>
          <p>
            <span>Last updated May 26, 2021</span>
          </p>
          <p>&nbsp;</p>
        </ModalContents>
      </Wrapper>
    </Fragment>
  );
}

export default TermsModal;

const BackScreen = styled.div`
  display: ${(props) => (props.openModal ? "block" : "none")};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 1;
`;

const Wrapper = styled.div`
  display: ${(props) => (props.openModal ? "block" : "none")};
  width: 700px;
  height: 600px;
  overflow-y: auto;
  border: solid 1px #3a3745;
  background-color: #2f2d38;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  opacity: 1;
  position: fixed;
  z-index: 3;
  &::-webkit-scrollbar {
    width: 5px;
    height: 10px;

    border-radius: 3px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #696777;
    border-radius: 3px;
  }
`;

const ModalNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 15px;
  label {
    width: auto;
    font-family: NotoSansKR, Apple SD Gothic Neo;
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
  img {
    width: 24px;
    height: 24px;

    cursor: pointer;
  }
`;

const ModalContents = styled.div`
  padding: 0 19px;
  > p {
    font-family: Poppins;
    font-size: 12px;
    line-height: 16px;
    text-align: left;
    color: rgb(107, 105, 121);
  }
  > span {
    font-size: 16px;
    line-height: 16px;
    text-align: left;
    font-family: Poppins;
    color: rgb(107, 105, 121);
  }
  > ul {
    font-size: 13px;
    line-height: 16px;
    text-align: left;
    font-family: Poppins;
    color: rgb(107, 105, 121);
    padding: 0 19px;
    list-style: circle;
  }
`;
