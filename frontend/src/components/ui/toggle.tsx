import { useState } from "react";

interface ToggleProps {
  options?: string[];
  onChange?: (selected: string) => void;
}

function Toggle({ options = ["Option A", "Option B"], onChange }: ToggleProps) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="inline-flex rounded-md shadow-sm border border-gray-300 overflow-hidden">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => {
            setSelected(option);
            if (onChange) onChange(option);
          }}
          className={`px-4 py-2 text-sm font-medium transition-all duration-300
            ${
              selected === option
                ? "bg-[#5b8db0] text-white shadow-inner"
                : "bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Toggle;
