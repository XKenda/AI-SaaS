import { motion } from "framer-motion";

const StatsCard = ({ title, count, icon: Icon, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-6 rounded-3xl"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <h3 className="text-4xl font-bold text-white">{count}</h3>
        </div>
        <div className={`p-4 rounded-2xl ${color} bg-opacity-10 ring-1 ring-inset ring-opacity-20`}>
          <Icon size={24} className={"text-white"} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
