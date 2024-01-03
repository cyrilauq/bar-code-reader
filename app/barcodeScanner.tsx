"use client";

import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import axios from "axios";

export const BarcodeScanner = () => {
    const [result, setResult] = useState("");
    const [product, setProduct] = useState({ title: "" });
    const [hasProduct, setHasProduct] = useState(false);
    const base_url = 'https://api.barcodelookup.com/v3/products'
    const { ref } = useZxing({
        async onDecodeResult(result) {
            setResult(result.getText());
            try {
                const found = (await axios.get('https://bar-code-reader-api.onrender.com/product/' + result.getText())).data as { title: "" };
                setProduct(found);
                setHasProduct(true);
            } catch(error) {
                setHasProduct(false);
                const err = (error as any).response.data.error;
                if(err.message) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
            }
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
            {hasProduct ? <p>{product.title}</p> : <p>No product found</p>}
        </>
    );
};
