import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './MMCalendarBoard.css';

/**
 * MMCalendarBoard - Generic Kanban/Calendar Board
 * 
 * @param {Array} columns - [{ id, title, subtitle, isDropDisabled }]
 * @param {Array} items - [{ id, columnId, content, ...data }]
 * @param {function} onDragEnd - (result) => void
 * @param {function} renderItem - (item, isDragging) => ReactNode
 * @param {function} renderColumnHeader - (column) => ReactNode (optional)
 * @param {boolean} isLoading - Show loading specific columns or whole board
 */
const MMCalendarBoard = ({
    columns = [],
    items = [],
    onDragEnd,
    renderItem,
    renderColumnHeader,
    isLoading = false,
    className = ''
}) => {
    // Helper to get items for a generic column
    const getItemsForColumn = (columnId) => {
        return items.filter(item => String(item.columnId) === String(columnId));
    };

    if (isLoading) {
        return <div className="mm-calendar-loading">Loading Board...</div>;
    }

    return (
        <div className={`mm-calendar-board ${className}`}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="mm-calendar-grid">
                    {columns.map((column) => (
                        <div key={column.id} className="mm-calendar-column">
                            {/* Header */}
                            <div className="mm-calendar-header">
                                {renderColumnHeader ? renderColumnHeader(column) : (
                                    <>
                                        <div className="mm-calendar-title">{column.title}</div>
                                        {column.subtitle && <div className="mm-calendar-subtitle">{column.subtitle}</div>}
                                    </>
                                )}
                            </div>

                            {/* Droppable Area */}
                            <Droppable
                                droppableId={String(column.id)}
                                isDropDisabled={column.isDropDisabled}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`mm-calendar-droppable ${snapshot.isDraggingOver ? 'is-dragging-over' : ''}`}
                                    >
                                        {getItemsForColumn(column.id).map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={String(item.id)}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`mm-calendar-item-wrapper ${snapshot.isDragging ? 'is-dragging' : ''}`}
                                                        style={provided.draggableProps.style}
                                                    >
                                                        {renderItem(item, snapshot.isDragging)}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default MMCalendarBoard;
