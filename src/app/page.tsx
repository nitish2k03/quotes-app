"use client";
import QuoteCard from "@/components/QuoteCard";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Home() {
  const [data, setData] = useState("");
  const [savedQuotes, setSavedQuotes] = useState<string[]>([]);
  const [getterSetter, setGetterSetter] = useState(false);
  const [toggleDarkMode, setToggleDarkMode] = useState(false);
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
    <div className={`h-full w-full  ${toggleDarkMode ? "dark" : " "}  `}>
      <div className={`p-4 h-[100vh] bg-white dark:bg-black dark:text-white`}>
        <div className="flex justify-between">
          <div>Current Quote:</div>
          <button
            className="border-2 border-black dark:border-white px-2 rounded"
            onClick={() => {
              setToggleDarkMode(!toggleDarkMode);
            }}
          >
            {toggleDarkMode ? <MdLightMode color="yellow" /> : <MdDarkMode />}
          </button>
        </div>
        <QuoteCard
          quote={data}
          showBin={false}
          setSavedQuotes={setSavedQuotes}
          savedQuotes={savedQuotes}
        />
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
            <div className="mt-10">Saved Quotes: </div>
            {savedQuotes.map((item) => (
              <QuoteCard
                key={item}
                quote={item}
                showBin={true}
                setSavedQuotes={setSavedQuotes}
                savedQuotes={savedQuotes}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
