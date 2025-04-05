// components/MatchList.js
import React from "react";
import MatchCard from "./MatchCard";

export default function MatchList({ matches, onSelectMatch }) {
  console.log("Matches: ", matches);
  if (!matches.length)
    return <p className="text-gray-500 text-center">No matches available.</p>;

  return (
    <ul className="space-y-4">
      {matches.map((match, index) => (
        <MatchCard
          key={index}
          match={match}
          onClick={() => onSelectMatch(match)}
        />
      ))}
    </ul>
  );
}
