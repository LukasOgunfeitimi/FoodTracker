const dropdown = ({ label, options, value, onChange }) => {
  return (
    <div className="flex p-2 items-center gap-2">
      {label}
      <select
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-lg bg-white text-black dark:bg-gray-700 dark:text-white"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default dropdown;