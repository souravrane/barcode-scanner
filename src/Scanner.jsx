import React, { Component } from "react";
import Quagga from "quagga";
import imei from 'node-imei';

class Scanner extends Component {
  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment" // or user
          }
        },
        locator: {
          patchSize: "medium",
          halfSample: true
        },
        numOfWorkers: 4,
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader",
            "2of5_reader",
            "code_93_reader"
          ]
        },
        locate: true
      },
      function (err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(this._onDetected);
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected);
  }

  _onDetected = (result) => {
    let IMEI = new imei();
    const res = result.codeResult.code.split('[')[0];
    this.props.onDetected(result);
    if(IMEI.isValid(res)){
      Quagga.stop();
    }
  };

  render() {
    return <div id="interactive" className="viewport" />;
  }
}

export default Scanner;
