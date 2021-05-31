import React, { useRef, useState, useEffect } from "react";
import capture from "../../assets/img/capture.png";
import useUserMedia from "../../hooks/use_camera";
import toBase64 from "../../hooks/use_toBase64";
import "./ScanColor.css";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "environment" },
};

function ScanColor(props) {
  const { onHandlImg } = props;

  const canvasRef = useRef();
  const videoRef = useRef();

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const [touch, setTouch] = useState({
    start: 0,
    end: 0,
  });

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  const handlTouchStart = (event) => {
    setTouch({ ...touch, start: event.changedTouches[0].clientY });
  };

  const handlTouchEnd = (event) => {
    setTouch({ ...touch, end: event.changedTouches[0].clientY });
  };

  useEffect(() => {
    console.log(touch);
    if (
      touch.start > touch.end &&
      touch.end > 0 &&
      touch.start - touch.end > 250
    ) {
      props.handlChangePage(1);
    }
  }, [touch.end, touch.start, touch, props]);

  const handleCanPlay = () => {
    setIsVideoPlaying(true);
    videoRef.current.play();
  };

  const handleCapture = () => {
    // console.log('chup');
    if (!isVideoPlaying) return;
    let context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      videoRef.current.videoWidth * 0.2,
      videoRef.current.videoHeight * 0.45,
      videoRef.current.videoWidth * 0.8,
      videoRef.current.videoHeight * 0.1,
      0,
      0,
      (canvasRef.current.width = videoRef.current.videoWidth * 0.8),
      (canvasRef.current.height = videoRef.current.videoHeight * 0.1)
    );

    canvasRef.current.toBlob(
      (blob) => toBase64(blob, onHandlImg),
      "image/webp",
      0.8
    );
    props.handlChangePage(3);
  };

  return (
    <div
      className="scancolor"
      onTouchStart={handlTouchStart}
      onTouchEnd={handlTouchEnd}
    >
      <canvas
        ref={canvasRef}
        className="canvas"
        style={{ width: "50%", position: "relative", display: "none" }}
      ></canvas>
      <div className="container">
        <div className="textContainer">
          <h1>Veuillez scanner une référence de couleur</h1>
        </div>
        <div className="main-scan-color">
          <div className="scan">
            <video
              ref={videoRef}
              onCanPlay={handleCanPlay}
              autoPlay
              playsInline
            ></video>
          </div>
          <div className="overlay scan-overlay"></div>
          <div className="image-container">
            <div className="btn-capture">
              <div to="listcolor">
                <img onClick={handleCapture} src={capture} alt="Capture"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScanColor;
