import React from 'react';

const TextItem = ({ item, index, onTextChange, onDragStart, onDragMove, onDragEnd, onColorChange, onSizeChange, onFontChange }) => {
    return (
        <div
            className={`text-${item.fontSize} font-${item.fontFamily} p-2 border mb-2`}
            style={{
                left: `${item.position.left}px`,
                top: `${item.position.top}px`,
                position: 'absolute',
                cursor: 'move',
                color: item.color || 'black', // Added color style
            }}
            onTouchStart={(e) => onDragStart(e, index)}
            onTouchMove={onDragMove}
            onTouchEnd={onDragEnd}
            onMouseDown={(e) => onDragStart(e, index)}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
        >
            <div
                contentEditable
                onInput={(e) => onTextChange(e, index)}
                suppressContentEditableWarning={true} // Suppress the warning
                style={{ fontSize: `${item.fontSize}px`, fontFamily: item.fontFamily, color: item.color || 'black' }}
            >
                {item.text}
            </div>

            <div className="flex items-center mt-2">
                <div className="flex items-center mt-2">
                    <label className="mr-2">
                        Color:
                        <input
                            type="color"
                            value={item.color || '#000000'}
                            onChange={(e) => onColorChange(e.target.value, index)}
                            className="ml-2"
                        />
                    </label>

                    <label className="mr-2">
                        Size:
                        <div
                            contentEditable
                            onInput={(e) => onSizeChange(e.target.innerText, index)}
                            onBlur={(e) => handleBlur(e.target.innerText, onSizeChange)}
                            suppressContentEditableWarning={true}
                            style={{ display: 'inline-block', minWidth: '30px', textAlign: 'center' }}
                        >
                            {item.fontSize}
                        </div>
                    </label>
{/* 
                    <label>
                        Font:
                        <select
                            value={item.fontFamily}
                            onChange={(e) => onFontChange(e.target.value, index)}
                            className="w-32 p-2 border border-gray-300"
                        >
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Courier New">Courier New</option>
                            Add more font options as needed
                        </select>
                    </label> */}
                </div>
            </div>
        </div>
    );
};

export default TextItem;
