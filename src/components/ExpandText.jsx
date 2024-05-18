import React, { useState } from 'react';

function ExpandableText({ text, initialWordLimit }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const words = text.split(' ');

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const displayedText = isExpanded ? text : words.slice(0, initialWordLimit).join(' ') + (words.length > initialWordLimit ? '...' : '');

    return (
        <div>
            <p className="mt-5">{displayedText}</p>
            {words.length > initialWordLimit && (
                <div class="flex justify-center">
                    <button
                    className="mt-3 px-2 py-1 rounded-full bg-primary text-l w-22 text-center text-white-500 no-underline m-2"
                    onClick={handleToggle}
                >
                {isExpanded ? 'Show Less' : 'Show More'}
            </button>
        </div>
            )}
        </div>
    );
}

export default ExpandableText;
