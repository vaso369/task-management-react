import React from "react";

const Error404 = () => {
  return (
    <div className="wrapper404">
      <div>
        <h1 className="heading404">404</h1>
        <div className="divError">
          <h2 className="headingErrorText">This page could not be found</h2>
        </div>
        <style jsx>{`
          .wrapper404 {
            padding: 200px;
            width: 100%;
            color: #000;
            background: #fff;
            height: 100vh;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          .heading404 {
            display: inline-block;
            border-right: 1px solid rgba(0, 0, 0, 0.3);
            margin: 0;
            margin-right: 20px;
            padding: 10px 23px 10px 0;
            font-size: 24px;
            font-weight: 500;
            vertical-align: top;
          }
          .divError {
            display: inline-block;
            text-align: left;
            line-height: 49px;
            height: 49px;
            vertical-align: middle;
          }
          .headingErrorText {
            font-size: 14px;
            font-weight: normal;
            line-height: inherit;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </div>
    </div>
  );
};
export default Error404;
