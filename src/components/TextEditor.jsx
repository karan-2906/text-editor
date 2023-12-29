import React, { useState, useRef, useEffect } from 'react';
import TextItem from './TextItem';
import TextControl from './Textcontrol';
import '../index.css';

const TextEditor = () => {
    const [textList, setTextList] = useState([]);
    const [currentText, setCurrentText] = useState('');
    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState('Arial');
    const [draggedItem, setDraggedItem] = useState(null);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const containerRef = useRef();

    useEffect(() => {
        // Scroll to the bottom of the container when textList changes
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [textList]);

    const handleTextChange = (event, index) => {
        const newTextList = [...textList];
        newTextList[index] = { ...newTextList[index], text: event.target.innerText };
        setTextList(newTextList);

        // Update history
        updateHistory(newTextList);
    };

    const handleFontSizeChange = (value) => {
        const newSize = parseInt(value, 10);
        setFontSize(isNaN(newSize) ? '' : newSize);
    };

    const handleFontFamilyChange = (value) => {
        setFontFamily(value);
    };

    const handleAddText = () => {
        const newTextList = [
            ...textList,
            {
                text: currentText,
                fontSize,
                fontFamily,
                position: { left: 0, top: 0 },
            },
        ];
        setTextList(newTextList);
        setCurrentText('');

        // Update history
        updateHistory(newTextList);
    };

    const updateHistory = (newTextList) => {
        const newHistory = [...history.slice(0, historyIndex + 1), newTextList];
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const handleUndo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setTextList(history[historyIndex - 1]);
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setTextList(history[historyIndex + 1]);
        }
    };

    const handleDragStart = (event, index) => {
        const clientX = event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX;
        const clientY = event.type.startsWith('touch') ? event.touches[0].clientY : event.clientY;

        setDraggedItem({ index, startX: clientX, startY: clientY });
    };

    const handleDragMove = (event) => {
        if (draggedItem) {
            const clientX = event.type.startsWith('touch') ? event.touches[0].clientX : event.clientX;
            const clientY = event.type.startsWith('touch') ? event.touches[0].clientY : event.clientY;

            const { index, startX, startY } = draggedItem;
            const offsetX = clientX - startX;
            const offsetY = clientY - startY;

            const newTextList = [...textList];
            newTextList[index] = {
                ...newTextList[index],
                position: {
                    left: newTextList[index].position.left + offsetX,
                    top: newTextList[index].position.top + offsetY,
                },
            };

            setTextList(newTextList);
            setDraggedItem({ ...draggedItem, startX: clientX, startY: clientY });
        }
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row  p-4 border-2 my-3 mx-10 justify-center">
            {/* Left side - Container */}
            <div className='lg:w-1/2'>
            <div
                ref={containerRef}
                className="flex-1  h-[750px] lg:w-[500px] border-2 border-blue-300 relative"
                style={{ maxHeight: '100%',maxWidth:'100%', overflowY: 'auto' }}
            >
                {textList.map((item, index) => (
                    <TextItem
                        key={index}
                        item={item}
                        index={index}
                        onTextChange={handleTextChange}
                        onDragStart={handleDragStart}
                        onDragMove={handleDragMove}
                        onDragEnd={handleDragEnd}
                    />
                ))}
            </div>
            </div>

            {/* Right side - Controls */}
            <div className='lg:w-1/2 p-4 m-2 flex flex-col justify-center'>
                <TextControl
                    currentText={currentText}
                    fontSize={fontSize}
                    fontFamily={fontFamily}
                    onTextChange={setCurrentText}
                    onFontSizeChange={handleFontSizeChange}
                    onFontFamilyChange={handleFontFamilyChange}
                    onAddText={handleAddText}
                />
                <div className='flex gap-4 mx-4'>
                    <button onClick={handleUndo} className=" w-1/2 p-2 bg-red-500 text-black" disabled={historyIndex === 0}>
                        Undo
                    </button>

                    <button onClick={handleRedo} className=" w-1/2 p-2 bg-green-500 text-black" disabled={historyIndex === history.length - 1}>
                        Redo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextEditor;
