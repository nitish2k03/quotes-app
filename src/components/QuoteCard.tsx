import React from "react";
type QuoteCardProps = {
  quote: string;
};
const QuoteCard = ({ quote }: QuoteCardProps) => {
  return (
    <div className="border-2 border-black rounded-lg p-4 w-auto my-2">
      {quote}
    </div>
  );
};

export default QuoteCard;
