import React from 'react';

const TextItem = ({ item, index, onTextChange, onDragStart, onDragMove, onDragEnd }) => {
  return (
    <div
      className={`text-${item.fontSize} font-${item.fontFamily} p-2 border mb-2`}
      style={{
        left: `${item.position.left}px`,
        top: `${item.position.top}px`,
        position: 'absolute',
        cursor: 'move',
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
        style={{ fontSize: `${item.fontSize}px`, fontFamily: item.fontFamily }}
      >
        {item.text}
      </div>
    </div>
  );
};

export default TextItem;
