// components/LiveScore.js
import React, { useState } from "react";

export default function LiveScore({ data, onClose, onReload }) {
  const { overs, scorecard } = data;
  const { miniscore, matchHeaders, overSepList } = overs;
  const [activeTab, setActiveTab] = useState("live");

  const scores = overs?.miniscore?.inningsScores?.[0]?.inningsScore || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full relative overflow-y-auto max-h-[90vh]">
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            className="text-gray-600 hover:text-blue-600"
            onClick={onReload}
            title="Reload"
          >
            🔄
          </button>
          <button
            className="text-gray-600 hover:text-red-500"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <h2 className="text-xl font-bold mb-2">
          {matchHeaders?.teamDetails?.batTeamName}/
          {matchHeaders?.teamDetails?.bowlTeamName} ({matchHeaders?.matchDesc})
        </h2>
        <p className="text-gray-700 font-medium mb-4">{matchHeaders?.status}</p>

        <div className="flex space-x-4 border-b mb-4">
          <button
            className={`pb-2 px-4 ${
              activeTab === "live"
                ? "border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("live")}
          >
            Live
          </button>
          <button
            className={`pb-2 px-4 ${
              activeTab === "scorecard"
                ? "border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("scorecard")}
          >
            Scorecard
          </button>
        </div>

        {activeTab === "live" && (
          <div className="text-sm text-gray-700">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {scores.map((score, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-gray-200 bg-gray-50 text-sm"
                >
                  <p className="font-semibold mb-1">
                    {score.batTeamShortName} - {score.runs}/{score.wickets}
                  </p>
                  <p>Overs: {score.overs}</p>
                  <p>Target: {score.target}</p>
                </div>
              ))}
            </div>

            {matchHeaders?.state !== "Complete" ? (
              <>
                <p>
                  <span className="font-semibold text-green-500">Striker:</span>{" "}
                  {miniscore?.batsmanStriker?.name} -{" "}
                  {miniscore?.batsmanStriker?.runs} (
                  {miniscore?.batsmanStriker?.balls})
                  <span className="ml-2 text-gray-500">
                    SR: {miniscore?.batsmanStriker?.strkRate}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-green-700">
                    Non-Striker:
                  </span>{" "}
                  {miniscore?.batsmanNonStriker?.name} -{" "}
                  {miniscore?.batsmanNonStriker?.runs} (
                  {miniscore?.batsmanNonStriker?.balls})
                  <span className="ml-2 text-gray-500">
                    SR: {miniscore?.batsmanNonStriker?.strkRate}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-purple-700">Bowler:</span>{" "}
                  {miniscore?.bowlerStriker?.name} -{" "}
                  {miniscore?.bowlerStriker?.wickets}/
                  {miniscore?.bowlerStriker?.overs}
                </p>
                <p className="mt-2">Partnership: {miniscore?.partnership}</p>
                <p className="mt-1">Current RR: {miniscore?.crr}</p>
                <p className="mt-1">Required RR: {miniscore?.rrr}</p>
                <p className="mt-2">Last Wicket: {miniscore?.lastWkt}</p>
                <p className="mt-1">Current Over: {miniscore?.curOvsStats}</p>
                {miniscore?.pp?.[0]?.powerPlay?.map((pp, i) => (
                  <p key={i} className="mt-1">
                    Powerplay ({pp.ppType}): {pp.run} runs ({pp.ovrFrom} -{" "}
                    {pp.ovrTo} overs)
                  </p>
                ))}
                {miniscore?.performance?.map((p, i) => (
                  <p key={i} className="mt-1">
                    {p.label}: {p.runs} runs, {p.wickets} wickets
                  </p>
                ))}
              </>
            ) : (
              <p className="mt-2 text-green-800 font-semibold">
                🏆 Man of the Match:{" "}
                {matchHeaders?.momPlayers?.player?.[0]?.name}
              </p>
            )}

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Recent Overs</h3>
              <div className="max-h-[300px] overflow-y-auto border rounded-md p-3 bg-gray-50">
                {overSepList?.[0]?.overSep?.map((over, index) => (
                  <div
                    key={index}
                    className="mb-4 p-2 border-b border-gray-200"
                  >
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      Over {over.overNum}: {over.overSummary}
                    </p>
                    <p className="text-sm text-gray-600">
                      Score: {over.score}/{over.wickets}
                    </p>
                    <p className="text-sm text-gray-600">
                      Batters: {over.ovrBatNames?.join(", ")}
                    </p>
                    <p className="text-sm text-gray-600">
                      Bowler: {over.ovrBowlNames?.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "scorecard" && (
          <div>
            {scorecard.scorecard?.map((inning, idx) => (
              <div
                key={idx}
                className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  {inning?.batTeamName} - {inning.score}/{inning.wickets} (
                  {inning.overs} overs)
                </h3>

                <div>
                  <h4 className="font-semibold mb-1">Batting</h4>
                  <table className="w-full text-sm mb-4">
                    <thead>
                      <tr className="text-left text-gray-600 border-b">
                        <th>Name</th>
                        <th>R</th>
                        <th>B</th>
                        <th>4s</th>
                        <th>6s</th>
                        <th>SR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inning.batsman?.map((batsman, i) => (
                        <tr key={i} className="border-b">
                          <td>
                            {batsman.name}{" "}
                            {batsman.outDec ? (
                              <span className="text-xs text-gray-500">
                                ({batsman.outDec})
                              </span>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>{batsman.runs}</td>
                          <td>{batsman.balls}</td>
                          <td>{batsman.fours}</td>
                          <td>{batsman.sixes}</td>
                          <td>{batsman.outDec ? batsman.strkRate : ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Bowling</h4>
                  <table className="w-full text-sm mb-4">
                    <thead>
                      <tr className="text-left text-gray-600 border-b">
                        <th>Name</th>
                        <th>O</th>
                        <th>M</th>
                        <th>R</th>
                        <th>W</th>
                        <th>Eco</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inning.bowler?.map((bowler, i) => (
                        <tr key={i} className="border-b">
                          <td>{bowler.name}</td>
                          <td>{bowler.overs}</td>
                          <td>{bowler.maidens}</td>
                          <td>{bowler.runs}</td>
                          <td>{bowler.wickets}</td>
                          <td>{bowler.economy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {inning.fow?.length > 0 && (
                  <div className="text-sm mb-2">
                    <span className="font-semibold">Fall of Wickets: </span>
                    {inning.fow[0].fow.map((f, i) => (
                      <span key={i}>
                        {f.runs}/{f.overNbr}
                        {i < inning.fow[0].fow.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                )}

                {inning.extras && (
                  <div className="text-sm">
                    <span className="font-semibold">Extras: </span>
                    {inning.extras.byes ? (
                      <span>
                        Byes: {inning.extras.byes}
                        {", "}
                      </span>
                    ) : (
                      ""
                    )}
                    {inning.extras.legByes ? (
                      <span>
                        Leg Byes: {inning.extras.legByes}
                        {", "}
                      </span>
                    ) : (
                      ""
                    )}
                    {inning.extras.wides ? (
                      <span>
                        Wides: {inning.extras.wides}
                        {", "}
                      </span>
                    ) : (
                      ""
                    )}
                    {inning.extras.noBalls ? (
                      <span>
                        No-Balls: {inning.extras.noBalls}
                        {", "}
                      </span>
                    ) : (
                      ""
                    )}
                    {inning.extras.total ? (
                      <span>Total: {inning.extras.total}</span>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            ))}

            {matchHeaders?.manOfTheMatch && (
              <p className="text-green-800 font-semibold text-sm">
                🏆 Man of the Match: {matchHeaders.manOfTheMatch.name}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
