import { useEffect } from "react";

export default async function Test() {
    useEffect(() => {
          async function fetchData() {
            await fetch('http://localhost:5000/product/9780132350884')
              .then(result => console.log(result))
              .catch(err => console.log(err));
          }
          fetchData();
    });
    return(
        <div></div>
    )
}