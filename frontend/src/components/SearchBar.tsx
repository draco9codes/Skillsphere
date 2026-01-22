import { http } from "@/utility/HTTPUtility";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await http.get<{ title: string }[]>(
          `/modules/autocomplete?q=${encodeURIComponent(query)}`,
        );
        setSuggestions(res.map((s) => s.title));
      } catch (err) {
        console.error("Autocomplete error:", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  return (
    <div
      className="absolute top-11 left-1/2 -translate-x-1/2 w-96 
             bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
             rounded-md shadow-lg p-3 z-50"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 
               dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#5b8db0]"
      />

      {loading && <div className="mt-1 text-xs text-gray-500">Loading...</div>}

      {suggestions.length > 0 && (
        <ul className="mt-1 bg-white dark:bg-gray-800 rounded-md shadow">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                setQuery(s);
                setSuggestions([]);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
