import './App.css';
import Input from './components/Input';
import Button from './components/Button';
import TaskDomain from './components/TaskDomain';
import { useState } from 'react';

export enum TaskState {
  Unconfirmed,
  Confirmed,
  Completed,
}
export interface Task {
  id: string;
  text: string;
  state: TaskState;
}
function App() {
  const [UnconfirmedState, setUnconfirmedState] = useState<Task[]>([
    { id: 'abc', text: 'eat breakfast', state: TaskState.Unconfirmed },
    { id: 'def', text: 'check task', state: TaskState.Unconfirmed },
  ]);
  const [ConfirmedState, setConfirmedState] = useState<Task[]>([
    { id: 'hij', text: 'get up', state: TaskState.Confirmed },
  ]);
  const [CompletedState, setCompletedState] = useState<Task[]>([]);
  const createNewArray = <T,>(type: T): Task[] => {
    let newArray: Task[] = [];
    switch (type) {
      case TaskState.Unconfirmed:
        newArray = [...UnconfirmedState];
        break;
      case TaskState.Confirmed:
        newArray = [...ConfirmedState];
        break;
      case TaskState.Completed:
        newArray = [...CompletedState];
        break;
    }
    return newArray;
  };
  const deleteTask = <T,>(type: T, index: number) => {
    const newTaskArray = createNewArray<T>(type);
    newTaskArray.splice(index, 1);
    switch (type) {
      case TaskState.Unconfirmed:
        setUnconfirmedState(newTaskArray);
        break;
      case TaskState.Confirmed:
        setConfirmedState(newTaskArray);
        break;
      case TaskState.Completed:
        setCompletedState(newTaskArray);
        break;
    }
  };
  const addTask = <T,>(type: T, task: Task) => {
    const newTaskArray = createNewArray<T>(type);
    newTaskArray.push(task);
    switch (type) {
      case TaskState.Unconfirmed:
        setUnconfirmedState(newTaskArray);
        break;
      case TaskState.Confirmed:
        setConfirmedState(newTaskArray);
        break;
      case TaskState.Completed:
        setCompletedState(newTaskArray);
        break;
    }
  };
  return (
    <>
      <div className="display: flex justify-center m-0 w-full h-4/5">
        <TaskDomain
          title="Unconfirmed"
          state={TaskState.Unconfirmed}
          taskList={UnconfirmedState}
          addTask={addTask}
          deleteTask={deleteTask}
        />
        <TaskDomain
          title="Confirmed"
          state={TaskState.Confirmed}
          taskList={ConfirmedState}
          addTask={addTask}
          deleteTask={deleteTask}
        />
        <TaskDomain
          title="Completed"
          state={TaskState.Completed}
          taskList={CompletedState}
          addTask={addTask}
          deleteTask={deleteTask}
        />
      </div>
      <Input />
      <Button />
    </>
  );
}

export default App;
