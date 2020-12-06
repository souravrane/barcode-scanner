import React, { useEffect } from "react";
import Quagga from "quagga";

const Scanner = (props) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#yourElement"), // Or '#yourElement' (optional)
        },
        decoder: {
          readers: ["code_128_reader"],
        },
      },
      (err) => {
        if (err) {
          console.log(err, "error msg");
          return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );
  }, []);
  return <div id="interactive" className="viewport" />;
};

export default Scanner;
