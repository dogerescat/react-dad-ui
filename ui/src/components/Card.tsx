import React from 'react';
import { Task } from '../App';

interface Props {
  index: number;
  taskData: Task;
}
const Card: React.FC<Props> = ({ ...children }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const data = JSON.stringify(children);
    e.dataTransfer.setData('text/plain', data);
  };
  return (
    <>
      <div
        className="block max-w-sm p-6 bg-white text-black border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-2"
        draggable
        onDragStart={(e) => handleDragStart(e)}
      >
        {children.taskData.text}
      </div>
    </>
  );
};

export default Card;
