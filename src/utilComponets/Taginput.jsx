import { useEffect, useState } from 'react';

const TagInput = ({ initialTags = [], onChange }) => {

  const [tags, setTags] = useState(initialTags);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed && !tags.includes(trimmed) && !trimmed.includes(' ')) {
        const updated = [...tags, trimmed];
        setTags(updated);
        onChange?.(updated);
        setInputValue('');
      }
    }
  };

  const removeTag = (index) => {
    const updated = tags.filter((_, i) => i !== index);
    setTags(updated);
    onChange?.(updated);
  };

  return (
    <fieldset className="mb-4 space-y-1">
      <legend className="text-sm font-semibold">Skills</legend>
      <div className="border border-gray-300 rounded-md w-full p-2 flex flex-wrap gap-2 min-h-[3rem] bg-base-100">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-white hover:text-red-300"
            >
              &times;
            </button>
          </span>
        ))}

        <input
          type="text"
          className="flex-1 min-w-[100px] bg-transparent focus:outline-none"
          placeholder="Type and press Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </fieldset>
  );
};

export default TagInput;
