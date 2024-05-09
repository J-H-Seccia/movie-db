import { motion } from "framer-motion";
import { useState } from "react";

const tabs = ["Now Playing", "Popular", "Top Rated", "Upcoming"];

const CategoryTabs = ({handleChangeCategory}) => {
  const [selected, setSelected] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setSelected(tab);
    handleChangeCategory(tab);
  };

  return (
    <div className="flex justify-center px-4 py-14 bg-neutral-900 items-center gap-2">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selected === tab}
          onClick={() => handleTabClick(tab)}
          key={tab}
        />
      ))}
    </div>
  );
};

const Chip = ({
  text,
  selected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        selected
          ? "text-white"
          : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
      } text-xl transition-colors px-2.5 py-2.5 rounded-full relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"
        ></motion.span>
      )}
    </button>
  );
};

export default CategoryTabs;