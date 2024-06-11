import React from "react";
import { IoTrashBin } from "react-icons/io5";
type QuoteCardProps = {
  quote: string;
  showBin: boolean;
  setSavedQuotes: (quote: string[]) => void;
  savedQuotes: string[];
};
const QuoteCard = ({
  quote,
  showBin,
  setSavedQuotes,
  savedQuotes,
}: QuoteCardProps) => {
  const deleteQuote = (quote: string) => {
    const newSavedQuotes = savedQuotes.filter((item) => item !== quote);
    setSavedQuotes(newSavedQuotes);
  };
  return (
    <div className="border-2 border-black dark:border-white rounded-lg flex justify-between items-center p-4 w-auto my-2">
      {quote}

      {showBin && (
        <button
          onClick={() => {
            deleteQuote(quote);
          }}
        >
          <IoTrashBin />
        </button>
      )}
    </div>
  );
};

export default QuoteCard;
