"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("");
  const fetchData = async () => {
    const response = await fetch(
      "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
    );
    const resData = await response.json();
    setData(resData[0]);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <main className="">{data}</main>;
}
