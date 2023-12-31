import React from 'react';

const TextControl = ({ currentText, fontSize, fontFamily, color, onTextChange, onFontSizeChange, onFontFamilyChange, onColorChange, onAddText }) => {
    return (
        <div className="p-4">
            <label className="mb-2">
                Text:
                <input
                    type="text"
                    placeholder='Enter Text to Add'
                    value={currentText}
                    onChange={(e) => onTextChange(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300"
                />
            </label>

            <label className="mb-2">
                Font Size:
                <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => onFontSizeChange(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300"
                />
            </label>

            <label className="mb-2">
                Font Family:
                <select
                    value={fontFamily}
                    onChange={(e) => onFontFamilyChange(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300"
                >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Georgia">Georgia</option>
                    {/* Add more font options as needed */}
                </select>
            </label>

            {/* <label className="mb-2">
                Color:
                <input type="color" value={color} onChange={(e) => onColorChange(e.target.value)} className="w-full p- border border-gray-300" />
            </label> */}

            <button onClick={onAddText} className="w-full mb-4 p-2 bg-blue-500 text-white mt-4">
                Add Text
            </button>
        </div>
    );
};

export default TextControl;
