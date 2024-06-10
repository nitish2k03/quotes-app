"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("");
  const [savedQuotes, setSavedQuotes] = useState<string[]>([]);
  const [getterSetter, setGetterSetter] = useState(false);
  const fetchData = async () => {
    const response = await fetch(
      "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
    );
    const resData = await response.json();
    setData(resData[0]);
  };
  useEffect(() => {
    fetchData();
    if (window.location !== undefined && !getterSetter) {
      setSavedQuotes(JSON.parse(localStorage.getItem("savedQuotes") || "[]"));
      setGetterSetter(true);
      console.log("getterSetter");
    }
  }, []);
  useEffect(() => {
    if (!getterSetter) return;
    localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));
  }, [savedQuotes]);

  const checkQuoteInSaved = (quote: string) => {
    return savedQuotes.includes(quote);
  };
  return (
    <main className="p-4">
      <div className="">Current Quote: </div>
      <div className="border-2 border-black rounded-lg p-4 w-auto my-2">
        {data}
      </div>
      <div>
        <button
          className="p-2 text-white bg-orange-500 rounded mr-2"
          onClick={fetchData}
        >
          New
        </button>
        <button
          className="bg-green-600 text-white rounded  p-2"
          onClick={() => {
            if (checkQuoteInSaved(data)) return;
            setSavedQuotes([...savedQuotes, data]);
          }}
        >
          Save
        </button>
      </div>
      {savedQuotes.length > 0 && (
        <div>
          <div className="">Saved Quotes: </div>
          {savedQuotes.map((item) => (
            <div className="border-2 border-black rounded-lg p-4 w-auto my-2">
              {item}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
