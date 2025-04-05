// App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import MatchList from "./components/MatchList";
import Tabs from "./components/Tabs";
import LiveScore from "./components/LiveScore";

export default function CricketScores() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("live");
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [liveScoreData, setLiveScoreData] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const [liveRes, recentRes, upcomingRes] = await Promise.all([
          axios.get("http://localhost:5001/api/matches/live"),
          axios.get("http://localhost:5001/api/matches/recent"),
          axios.get("http://localhost:5001/api/matches/upcoming"),
        ]);
        const filterMatches = (raw) =>
          raw.data.typeMatches?.flatMap(
            (type) =>
              type.seriesAdWrapper?.flatMap(
                (wrapper) => wrapper.seriesMatches?.matches || []
              ) || []
          ) || [];
        setLiveMatches(
          filterMatches(liveRes).filter(
            (match) => match.matchInfo?.state !== "Complete"
          )
        );
        console.log("rcnt", recentRes);
        setRecentMatches(filterMatches(recentRes));
        setUpcomingMatches(filterMatches(upcomingRes));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching matches:", err);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);
  const handleMatchClick = async (match) => {
    // console.log(
    //   "clicked",
    //   match,
    //   match.matchInfo,
    //   selectedMatch?.matchInfo?.matchId
    // );
    const matchId =
      match && match.matchInfo
        ? match?.matchInfo?.matchId
        : selectedMatch?.matchInfo?.matchId;
    // console.log("Match ID: ", matchId);
    try {
      const response = await axios.get(
        `http://localhost:5001/api/matches/live-score?matchId=${matchId}`
      );
      // console.log(response);
      setLiveScoreData(response.data);
      setSelectedMatch(match);
      // console.log(response);
    } catch (err) {
      console.error("Error fetching live score:", err);
    }
  };
  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        🏏 Cricket Match Center
        <br />
        <span className="text-sm text-gray-400">
          <a href="https://github.com/ankursingh0313" target="blank">
            @ankursingh0313
          </a>
        </span>
      </h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "live" && (
        <MatchList matches={liveMatches} onSelectMatch={handleMatchClick} />
      )}
      {activeTab === "upcoming" && (
        <MatchList matches={upcomingMatches} onSelectMatch={handleMatchClick} />
      )}
      {activeTab === "recent" && (
        <MatchList matches={recentMatches} onSelectMatch={handleMatchClick} />
      )}
      {liveScoreData && selectedMatch && (
        <LiveScore
          data={liveScoreData}
          onClose={() => setLiveScoreData(null)}
          onReload={handleMatchClick}
        />
      )}
    </div>
  );
}
