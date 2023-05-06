import React from 'react';
import Card from './Card';
import { Task, TaskState } from '../App';

export type DomainName = 'Unconfirmed' | 'Confirmed' | 'Completed';

interface Props {
  title: DomainName;
  state: TaskState;
  taskList: Task[];
  addTask: (type: TaskState, task: Task) => void;
  deleteTask: (type: TaskState, index: number) => void;
}
const TaskDomain: React.FC<Props> = ({
  title,
  state,
  taskList,
  addTask,
  deleteTask,
}) => {
  const separateDeleteTask = (state: TaskState, index: number) => {
    switch (state) {
      case TaskState.Unconfirmed:
        deleteTask(TaskState.Unconfirmed, index);
        break;
      case TaskState.Confirmed:
        deleteTask(TaskState.Confirmed, index);
        break;
      case TaskState.Completed:
        deleteTask(TaskState.Completed, index);
        break;
    }
  };
  const separateAddTask = (state: TaskState, task: Task) => {
    switch (state) {
      case TaskState.Unconfirmed:
        addTask(TaskState.Unconfirmed, task);
        break;
      case TaskState.Confirmed:
        addTask(TaskState.Confirmed, task);
        break;
      case TaskState.Completed:
        addTask(TaskState.Completed, task);
        break;
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const draggedJsonData = e.dataTransfer.getData('text/plain');
    const data = JSON.parse(draggedJsonData);
    separateDeleteTask(data.taskData.state, data.index);
    separateAddTask(state, data.taskData);
  };
  return (
    <>
      <div
        className="bg-neutral-300 w-2/6 text-white border-solid border-2 border-black"
        onDragOver={(e) => {
          handleDragOver(e);
        }}
        onDrop={(e) => {
          handleDrop(e);
        }}
      >
        <div className="text-black">{title}</div>
        <div>
          {taskList.map((v, i) => (
            <Card taskData={v} index={i} key={v.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskDomain;
