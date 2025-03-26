const InputField = ({ label, type, placeholder, value, onChange }) => (
    <div className="flex flex-row justify-between items-center">
      <div className="flex p-2 w-1/3 text-left">{label}:</div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-lg w-2/3 bg-white text-black dark:bg-gray-700 dark:text-white"
      />
    </div>
  );

  export default InputField