import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const LoadingScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
      className="loading-container"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            color: "#333333",
            marginTop: "0.9rem",
            marginRight: "-5px",
          }}
        >
          Loading...
        </span>
        <PuffLoader
          color="#333333"
          loading={true}
          // cssOverride={override}
          size={32}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={4}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
