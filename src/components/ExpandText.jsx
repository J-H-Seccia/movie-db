import React, { useState } from 'react';
import overviewIcon from '../images/overviewIcon.png';

function ExpandableText({ text, initialWordLimit }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const words = text.split(' ');

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const displayedText = isExpanded ? text : words.slice(0, initialWordLimit).join(' ') + (words.length > initialWordLimit ? '...' : '');

    return (
        <div>
            <p className="mt-3">{displayedText}</p>
            {words.length > initialWordLimit && (
                <div className="flex justify-center">
                    <button
                        className="mt-3 px-3 py-1 rounded-full bg-primary text-l w-22 text-center text-white-500 no-underline m-2 flex items-center" // Added 'flex items-center' class
                        onClick={handleToggle}
                    >
                        <img src={overviewIcon} alt="Overview Icon" className="w-6 h-6 mr-2" />
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            )}
        </div>


    );
}

export default ExpandableText;
