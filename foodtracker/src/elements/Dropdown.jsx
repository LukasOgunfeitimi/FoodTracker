const dropdown = ({ label, options, value, onChange }) => {
    return (
        <div className="flex p-2 items-center gap-2">
          {label}
          <select
            value={value}
            onChange={onChange}
            className="p-2 border border-gray-300 rounded-lg bg-white text-black dark:bg-gray-700 dark:text-white"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
}
export default dropdown;