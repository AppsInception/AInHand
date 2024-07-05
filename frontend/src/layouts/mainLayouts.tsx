import React, { useEffect } from "react";
import { appContext } from "../hooks/provider";
import Header from "../components/header";
import Footer from "../components/footer";
import { navigate } from "gatsby";
import { useSelector } from "react-redux";
import { useLocation } from "@reach/router";
import { Button, Modal, Typography } from "antd";

const MainLayouts = ({ data }: any) => {
  // @ts-ignore
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const hasSeenModal = localStorage.getItem("hasSeenModal");
  useEffect(() => {
    if (loggedIn && !hasSeenModal) {
      setIsModalVisible(true);
    }
  }, [loggedIn, hasSeenModal]);

  const handleOk = () => {
    setIsModalVisible(false);
    localStorage.setItem("hasSeenModal", "true");
  };

  const shouldBeInSignInPage = () =>
    !(location.pathname.includes("/sign-in") || loggedIn);
  const shouldNotBeInSignInPage = () =>
    location.pathname.includes("/sign-in") && loggedIn;

  const location = useLocation();
  const { restricted, showHeader, children, link, title, meta } = data;

  const layoutContent = (
    <div className={`h-full flex flex-col`}>
      {showHeader && <Header meta={meta} link={link} loggedIn={loggedIn} />}
      <div className="flex-1  text-primary ">
        <title>{meta?.title + " | " + title}</title>
        <div className="h-full text-primary">{children}</div>
      </div>
      <Footer />
      {loggedIn && (
        <Modal
          className="disclaimer-modal"
          title={
            <>
              Disclaimer
              <Typography.Paragraph className="disclaimer-note">
                Tips for getting started
              </Typography.Paragraph>
            </>
          }
          open={isModalVisible}
          onOk={handleOk}
          closable={false}
          footer={[
            <Button key="agree" type="primary" onClick={handleOk}>
              Ok Let's Go
            </Button>,
          ]}>
          <div className="discalimer-single-list">
            <div className="flex gap-x-[10px] mb-[12px] items-center discalimer-single-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 24C16.34 24 14.9252 23.4148 13.7556 22.2444C12.586 21.074 12.0008 19.6592 12 18C11.9992 16.3408 12.5844 14.926 13.7556 13.7556C14.9268 12.5852 16.3416 12 18 12C19.6584 12 21.0736 12.5852 22.2456 13.7556C23.4176 14.926 24.0024 16.3408 24 18C23.9976 19.6592 23.4124 21.0744 22.2444 22.2456C21.0764 23.4168 19.6616 24.0016 18 24ZM6 7.2H15.6C15.94 7.2 16.2252 7.0848 16.4556 6.8544C16.686 6.624 16.8008 6.3392 16.8 6C16.7992 5.6608 16.684 5.376 16.4544 5.1456C16.2248 4.9152 15.94 4.8 15.6 4.8H6C5.66 4.8 5.3752 4.9152 5.1456 5.1456C4.916 5.376 4.8008 5.6608 4.8 6C4.7992 6.3392 4.9144 6.6244 5.1456 6.8556C5.3768 7.0868 5.6616 7.2016 6 7.2ZM2.4 21.6C1.74 21.6 1.1752 21.3652 0.7056 20.8956C0.236 20.426 0.0008 19.8608 0 19.2V2.4C0 1.74 0.2352 1.1752 0.7056 0.7056C1.176 0.236 1.7408 0.0008 2.4 0H19.2C19.86 0 20.4252 0.2352 20.8956 0.7056C21.366 1.176 21.6008 1.7408 21.6 2.4V8.94C21.6 9.3 21.45 9.58 21.15 9.78C20.85 9.98 20.53 10.02 20.19 9.9C19.85 9.8 19.4948 9.7248 19.1244 9.6744C18.754 9.624 18.3792 9.5992 18 9.6C17.78 9.6 17.5748 9.6052 17.3844 9.6156C17.194 9.626 16.9992 9.6508 16.8 9.69C16.62 9.65 16.42 9.6252 16.2 9.6156C15.98 9.606 15.78 9.6008 15.6 9.6H6C5.66 9.6 5.3752 9.7152 5.1456 9.9456C4.916 10.176 4.8008 10.4608 4.8 10.8C4.7992 11.1392 4.9144 11.4244 5.1456 11.6556C5.3768 11.8868 5.6616 12.0016 6 12H12.15C11.79 12.34 11.4652 12.71 11.1756 13.11C10.886 13.51 10.6308 13.94 10.41 14.4H6C5.66 14.4 5.3752 14.5152 5.1456 14.7456C4.916 14.976 4.8008 15.2608 4.8 15.6C4.7992 15.9392 4.9144 16.2244 5.1456 16.4556C5.3768 16.6868 5.6616 16.8016 6 16.8H9.69C9.65 17 9.6252 17.1952 9.6156 17.3856C9.606 17.576 9.6008 17.7808 9.6 18C9.6 18.4 9.62 18.78 9.66 19.14C9.7 19.5 9.77 19.85 9.87 20.19C9.97 20.53 9.92 20.85 9.72 21.15C9.52 21.45 9.25 21.6 8.91 21.6H2.4ZM22.6667 17.3333V18.6666H21.266C21.1795 19.0838 21.0139 19.4805 20.778 19.8353L21.7713 20.8286L20.8287 21.7713L19.8353 20.7779C19.4806 21.0138 19.0838 21.1794 18.6667 21.2659V22.6666H17.3333V21.2659C16.9162 21.1794 16.5195 21.0138 16.1647 20.7779L15.1713 21.7713L14.2287 20.8286L15.222 19.8353C14.9862 19.4805 14.8205 19.0838 14.734 18.6666H13.3333V17.3333H14.734C14.8205 16.9161 14.9862 16.5194 15.222 16.1646L14.2287 15.1713L15.1713 14.2286L16.1647 15.2219C16.5195 14.9861 16.9162 14.8204 17.3333 14.7339V13.3333H18.6667V14.7339C19.0838 14.8204 19.4806 14.9861 19.8353 15.2219L20.8287 14.2286L21.7713 15.1713L20.778 16.1646C21.0139 16.5194 21.1795 16.9161 21.266 17.3333H22.6667ZM16.8889 19.6629C17.2178 19.8826 17.6044 19.9999 18 19.9999C18.5303 19.9994 19.0387 19.7885 19.4136 19.4136C19.7886 19.0386 19.9995 18.5302 20 17.9999C20 17.6044 19.8827 17.2177 19.663 16.8888C19.4432 16.5599 19.1308 16.3035 18.7654 16.1522C18.3999 16.0008 17.9978 15.9612 17.6098 16.0384C17.2219 16.1155 16.8655 16.306 16.5858 16.5857C16.3061 16.8654 16.1156 17.2218 16.0384 17.6097C15.9613 17.9977 16.0009 18.3998 16.1523 18.7653C16.3036 19.1308 16.56 19.4431 16.8889 19.6629Z"
                  fill="#0591FF"
                />
              </svg>
              <h4 className="text-[18px] font-bold content-name">
                Service Overview
              </h4>
            </div>
            <p>
              The service is a research preview. It only provides limited safety
              measures and may generate offensive content. It must not be used
              for any illegal, harmful, violent, racist, or sexual purposes.
            </p>
          </div>
          <div className="discalimer-single-list">
            <div className="flex gap-x-[10px] mb-[12px] items-center discalimer-single-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="24"
                viewBox="0 0 22 24"
                fill="none">
                <path
                  d="M11 0L0 4.36364V10.9091C0 16.9636 4.69333 22.6255 11 24C17.3067 22.6255 22 16.9636 22 10.9091V4.36364L11 0ZM9.77778 6.54545H12.2222V8.72727H9.77778V6.54545ZM9.77778 10.9091H12.2222V17.4545H9.77778V10.9091Z"
                  fill="#2DC1F0"
                />
              </svg>
              <h4 className="text-[18px] font-bold content-name">
                Privacy Notice
              </h4>
            </div>
            <p>
              Please do not upload any private information, such as your full
              name, address, phone number or any other sensitive data that could
              compromise your privacy and security.
            </p>
          </div>
          <div className="discalimer-single-list">
            <div className="flex gap-x-[10px] mb-[12px] items-center discalimer-single-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none">
                <path
                  d="M10.6207 9.17647C16.4863 9.17647 21.2414 7.12274 21.2414 4.58884C21.2414 2.05494 16.4863 0 10.6207 0C4.75506 0 0 2.05373 0 4.58884C0 7.12395 4.75506 9.17647 10.6207 9.17647Z"
                  fill="#0591FF"
                />
                <path
                  d="M0 6.35291V9.37272C0 11.996 4.75506 14.1176 10.6207 14.1176C16.4863 14.1176 21.2414 11.996 21.2414 9.37272V6.36166H21.2009C20.7108 8.77476 16.1609 10.6712 10.6207 10.6712C5.08177 10.6712 0.530591 8.77476 0.0405226 6.35291H0Z"
                  fill="#0591FF"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.3331 20.4849C11.7756 20.5251 11.2037 20.546 10.6207 20.546C5.08177 20.546 0.530591 18.6571 0.0405226 16.2352L0 16.2365V19.2538C0 21.8771 4.75506 23.9999 10.6207 23.9999C12.0522 23.9999 13.4176 23.8735 14.6639 23.6442C13.5331 22.8864 12.694 21.7754 12.3331 20.4849Z"
                  fill="#0591FF"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 14.3126V11.2941H0.0405226C0.530591 13.7072 5.08177 15.6049 10.6207 15.6049C11.6422 15.6049 12.6301 15.5407 13.5651 15.4207C12.6849 16.392 12.1504 17.6434 12.1381 19.0106C11.6425 19.0423 11.1359 19.0588 10.6207 19.0588C4.75506 19.0588 0 16.9271 0 14.3126ZM21.2414 14.1672V11.2941H21.2009C21.0344 12.1166 20.3998 12.8776 19.4171 13.524C20.0692 13.6468 20.6834 13.8669 21.2414 14.1672Z"
                  fill="#0591FF"
                />
                <path
                  d="M14.4138 18.7736C14.4138 19.1997 14.504 19.6215 14.6792 20.0151C14.8545 20.4087 15.1113 20.7664 15.435 21.0676C15.7588 21.3689 16.1432 21.6078 16.5662 21.7709C16.9892 21.9339 17.4426 22.0178 17.9004 22.0178C18.3583 22.0178 18.8117 21.9339 19.2347 21.7709C19.6577 21.6078 20.0421 21.3689 20.3658 21.0676C20.6896 20.7664 20.9464 20.4087 21.1216 20.0151C21.2968 19.6215 21.387 19.1997 21.387 18.7736C21.387 18.3476 21.2968 17.9257 21.1216 17.5321C20.9464 17.1385 20.6896 16.7809 20.3658 16.4796C20.0421 16.1784 19.6577 15.9394 19.2347 15.7764C18.8117 15.6133 18.3583 15.5294 17.9004 15.5294C17.4426 15.5294 16.9892 15.6133 16.5662 15.7764C16.1432 15.9394 15.7588 16.1784 15.435 16.4796C15.1113 16.7809 14.8545 17.1385 14.6792 17.5321C14.504 17.9257 14.4138 18.3476 14.4138 18.7736ZM22.0001 22.5882L20.3909 21.0909L22.0001 22.5882Z"
                  fill="white"
                />
                <path
                  d="M22.0001 22.5882L20.3909 21.0909M14.4138 18.7736C14.4138 19.1997 14.504 19.6215 14.6792 20.0151C14.8545 20.4087 15.1113 20.7664 15.435 21.0676C15.7588 21.3689 16.1432 21.6078 16.5662 21.7709C16.9892 21.9339 17.4426 22.0178 17.9004 22.0178C18.3583 22.0178 18.8117 21.9339 19.2347 21.7709C19.6577 21.6078 20.0421 21.3689 20.3658 21.0676C20.6896 20.7664 20.9464 20.4087 21.1216 20.0151C21.2968 19.6215 21.387 19.1997 21.387 18.7736C21.387 18.3476 21.2968 17.9257 21.1216 17.5321C20.9464 17.1385 20.6896 16.7809 20.3658 16.4796C20.0421 16.1784 19.6577 15.9394 19.2347 15.7764C18.8117 15.6133 18.3583 15.5294 17.9004 15.5294C17.4426 15.5294 16.9892 15.6133 16.5662 15.7764C16.1432 15.9394 15.7588 16.1784 15.435 16.4796C15.1113 16.7809 14.8545 17.1385 14.6792 17.5321C14.504 17.9257 14.4138 18.3476 14.4138 18.7736Z"
                  stroke="#0591FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h4 className="text-[18px] font-bold content-name">
                Data Collection
              </h4>
            </div>
            <p>
              The service collects user dialogue data, including both text and
              images, and reserves the right to distribute it under a Creative
              Commons Attribution (CC-BY) or a similar license.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );

  useEffect(() => {
    if (shouldBeInSignInPage()) {
      navigate("/sign-in");
    } else if (shouldNotBeInSignInPage()) {
      navigate("/");
    }
  }, []);

  return (
    <appContext.Consumer>
      {(context: any) => {
        if (shouldBeInSignInPage() || shouldNotBeInSignInPage()) {
          return <></>;
        }
        if (restricted) {
          return <div className="h-full">{loggedIn && layoutContent}</div>;
        } else {
          return layoutContent;
        }
      }}
    </appContext.Consumer>
  );
};

export default MainLayouts;
