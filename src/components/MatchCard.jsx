// components/MatchCard.js
import React from "react";

export default function MatchCard({ match, onClick }) {
  return (
    <li
      className="bg-white rounded-xl shadow-md p-4 mb-4 border border-gray-200"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-gray-800">
        {match.matchInfo?.team1?.teamName} vs {match.matchInfo?.team2?.teamName}
      </h3>
      <p className="text-sm text-blue-600 font-medium mt-1">
        {match.matchInfo?.status}
      </p>
      <p className="text-sm text-gray-600">
        Venue: {match.matchInfo?.venueInfo?.ground}
      </p>
      <p className="text-sm text-gray-600">
        Start: {new Date(match.matchInfo?.startDate).toLocaleString()}
      </p>
    </li>
  );
}
