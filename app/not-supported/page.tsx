import React from "react";

type Props = {};

const NotSupportedPage = (props: Props) => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>This app is only available on mobile devices</h1>
    </div>
  );
};

export default NotSupportedPage;
