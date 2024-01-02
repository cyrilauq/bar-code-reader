import Image from 'next/image'
import { BarcodeScanner } from './barcodeScanner'

export default function Home() {
    console.log(process.env.NEXT_PUBLIC_API_KEY);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <BarcodeScanner></BarcodeScanner>
            </div>
        </main>
    )
}
