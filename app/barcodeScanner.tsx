"use client";

import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";

export const BarcodeScanner = () => {
  const [result, setResult] = useState("");
  const [product, setProduct] = useState("")
  console.log(process.env.NEXT_PUBLIC_API_KEY);
  const base_url = 'https://api.barcodelookup.com/v3/products'
  const { ref } = useZxing({
    async onDecodeResult(result) {
      setResult(result.getText());
      await fetch(base_url + '?barcode=' + result.getText() + '&key=' + process.env.NEXT_PUBLIC_API_KEY)
        .then(result => console.log(result))
        .catch(err => console.log(err));
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
