import { motion } from "framer-motion";
import { Crown } from "lucide-react";

function Podium({ top3 }) {
  // Order on screen: 2nd (left), 1st (center), 3rd (right)
  const order = [top3[1], top3[0], top3[2]];
  const meta = [
    { place: 2, height: 110, medal: "🥈", gradient: "from-slate-300 to-gray-400" },
    { place: 1, height: 150, medal: "🥇", gradient: "from-amber-400 to-yellow-500" },
    { place: 3, height: 85, medal: "🥉", gradient: "from-amber-600 to-orange-700" },
  ];

  return (
    <div className="flex items-end justify-center gap-3 md:gap-6 mb-8">
      {order.map((player, i) => {
        if (!player) return <div key={i} className="w-20 md:w-28" />;
        const m = meta[i];
        return (
          <motion.div
            key={player.name}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 120 }}
            className="flex flex-col items-center w-20 md:w-28"
          >
            <div className="text-3xl md:text-4xl mb-1">{m.medal}</div>
            {m.place === 1 && (
              <Crown className="text-yellow-300 mb-1" size={26} />
            )}
            <span className="text-white font-bold text-sm md:text-base text-center truncate w-full">
              {player.name}
            </span>
            <span className="text-white/80 text-xs md:text-sm mb-2">
              {player.score}
            </span>
            <div
              className={`w-full rounded-t-xl bg-gradient-to-b ${m.gradient} shadow-lg flex items-start justify-center`}
              style={{ height: m.height }}
            >
              <span className="text-2xl md:text-3xl font-extrabold text-slate-900/80 mt-2">
                {m.place}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Leaderboard({ leaderboard, podium = false }) {
  const getRankColor = (rank) => {
    switch (rank) {
      case 0:
        return "bg-gradient-to-r from-amber-400 to-yellow-500";
      case 1:
        return "bg-gradient-to-r from-slate-300 to-gray-400";
      case 2:
        return "bg-gradient-to-r from-amber-600 to-orange-700";
      default:
        return "bg-white/10";
    }
  };

  const getRankTextColor = (rank) =>
    rank <= 2 ? "text-slate-900" : "text-white";

  if (podium) {
    const top3 = leaderboard.slice(0, 3);
    const rest = leaderboard.slice(3);
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          🏆 Leaderboard
        </h2>
        {top3.length > 0 && <Podium top3={top3} />}
        {rest.length > 0 && (
          <ul className="space-y-3">
            {rest.map((player, index) => (
              <motion.li
                key={player.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="flex items-center justify-between p-3 rounded-lg shadow bg-white/10 text-white"
              >
                <div className="flex items-center">
                  <span className="text-lg font-bold w-8">{index + 4}</span>
                  <span className="text-base font-semibold">{player.name}</span>
                </div>
                <span className="text-lg font-bold">{player.score}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">Leaderboard</h2>
      <ul className="space-y-4">
        {leaderboard.map((player, index) => (
          <motion.li
            key={player.name}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-lg shadow-lg ${getRankColor(index)} ${getRankTextColor(index)}`}
          >
            <div className="flex items-center">
              <span className="text-xl font-bold w-8">{index + 1}</span>
              <span className="text-lg font-semibold">{player.name}</span>
              {index < 3 && <Crown className="ml-2" size={20} />}
            </div>
            <span className="text-xl font-bold">{player.score}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
