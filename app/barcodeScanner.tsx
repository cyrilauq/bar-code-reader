"use client";

import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";

export const BarcodeScanner = () => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  useEffect(() => {
    const isMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    const requestCameraAccess = async () => {
        try {            
            if (navigator.mediaDevices) {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: isMobileDevice() ? { facingMode: 'environment' } : true
                });
                if (ref.current) {
                    ref.current.srcObject = stream;
                    ref.current.setAttribute("autoplay", "true");
                    ref.current.setAttribute("muted", "true");
                    ref.current.setAttribute("playsinline", "true");
                }
            } else {
                // navigator.getUserMedia(
                //     { audio: true, video: { width: 1280, height: 720 } },
                //     (stream: MediaProvider | null) => {
                //         const video = document.querySelector("video");
                //         if(ref.current) {
                //             ref.current.srcObject = stream;
                //         }
                //     },
                //     (err: { name: any; }) => {
                //         console.error(`The following error occurred: ${err.name}`);
                //     },
                // );
                console.error("getUserMedia is not supported");
            }
        } catch (error) {
            console.error("Error accessing the camera:", (error as { message: String }).message);
        }
    };

    requestCameraAccess();

    // Cleanup when component unmounts
    return () => {};
  }, [ref]);

  return (
    <>
      <video ref={ref} autoPlay muted playsInline />
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
};
