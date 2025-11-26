'use client';

import { useState, useEffect, useRef } from 'react';

interface Tag {
    id: string;
    name: string;
    slug: string;
}

interface TagInputProps {
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
}

export default function TagInput({ value, onChange, placeholder = "Add tags..." }: TagInputProps) {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<Tag[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Fetch all tags on mount
    useEffect(() => {
        fetch('/api/tags')
            .then(res => res.json() as Promise<{ tags: Tag[] }>)
            .then((data) => setAllTags(data.tags || []))
            .catch(console.error);
    }, []);

    // Filter suggestions based on input
    useEffect(() => {
        if (input.trim()) {
            const filtered = allTags.filter(tag =>
                tag.name.toLowerCase().includes(input.toLowerCase().trim()) &&
                !value.includes(tag.name)
            );
            setSuggestions(filtered);
            setShowSuggestions(filtered.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [input, allTags, value]);

    const addTag = (tagName: string) => {
        const normalized = tagName.toLowerCase().trim();
        if (normalized && !value.includes(normalized)) {
            onChange([...value, normalized]);
            setInput('');
            setShowSuggestions(false);
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (suggestions.length > 0 && showSuggestions) {
                addTag(suggestions[0].name);
            } else if (input.trim()) {
                addTag(input);
            }
        } else if (e.key === 'Backspace' && !input && value.length > 0) {
            removeTag(value[value.length - 1]);
        }
    };

    return (
        <div className="relative">
            <div className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white focus-within:border-purple-500 transition-colors min-h-[48px] flex flex-wrap gap-2 items-center">
                {value.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm border border-purple-500/30"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-purple-100 transition-colors"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </span>
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => input.trim() && setShowSuggestions(suggestions.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder={value.length === 0 ? placeholder : ''}
                    className="flex-1 min-w-[120px] bg-transparent outline-none placeholder-gray-500"
                />
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
                <div className="absolute z-10 w-full mt-2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-xl">
                    {suggestions.map((tag) => (
                        <button
                            key={tag.id}
                            type="button"
                            onClick={() => addTag(tag.name)}
                            className="w-full px-4 py-2 text-left hover:bg-white/5 transition-colors text-white"
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>
            )}

            <p className="text-xs text-gray-500 mt-1">
                Press Enter to add a tag. Tags are automatically normalized (lowercase).
            </p>
        </div>
    );
}
