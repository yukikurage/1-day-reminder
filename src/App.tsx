import { Component, createMemo, createSignal, onMount, Show } from 'solid-js';
import Editor from './components/Editor';
import { parseTasks } from './utils/parseTasks';
import { printTasks } from './utils/printTasks';
import RenderTasks from './components/RenderTasks';

const milliSecondsInDay = 24 * 60 * 60 * 1000;
const getDayNum = () => {
  const now = Date.now();
  const start = new Date('Jan 01 2000').getTime();
  const diff = now - start;
  return Math.floor(diff / milliSecondsInDay);
};

const App: Component = () => {
  let editor: HTMLTextAreaElement | undefined = undefined;
  const [todayTasks, setTodayTasks] = createSignal<Task[]>([]);
  const [tomorrowTasks, setTomorrowTasks] = createSignal<Task[]>([]);
  const [isOpenEditor, setIsOpenEditor] = createSignal(false);
  const [isToday, setIsToday] = createSignal(true);

  const tasks = () => (isToday() ? todayTasks() : tomorrowTasks());
  const setTasks = (tasks: Task[]) => {
    if (isToday()) {
      setTodayTasks(tasks);
      localStorage.setItem('tasks-today', printTasks(tasks));
    } else {
      setTomorrowTasks(tasks);
      localStorage.setItem('tasks-tomorrow', printTasks(tasks));
    }
  };

  const toNextDay = () => {
    const prevDayNumAsString = localStorage.getItem('day-num');
    const prevDayNum = prevDayNumAsString
      ? parseInt(prevDayNumAsString, 10)
      : 0;
    const nowDayNum = getDayNum();

    console.log(nowDayNum - prevDayNum);

    if (nowDayNum - prevDayNum > 1) {
      setTodayTasks([]);
      setTomorrowTasks([]);
    }
    if (nowDayNum - prevDayNum === 1) {
      setTodayTasks(tomorrowTasks());
      setTomorrowTasks([]);
    }

    localStorage.setItem('day-num', nowDayNum.toString());
  };

  onMount(() => {
    const today = localStorage.getItem('tasks-today');
    const tomorrow = localStorage.getItem('tasks-tomorrow');

    if (today) {
      setTodayTasks(parseTasks(today));
    }
    if (tomorrow) {
      setTomorrowTasks(parseTasks(tomorrow));
    }

    const remainingTime = milliSecondsInDay - (Date.now() % milliSecondsInDay);
    setTimeout(toNextDay, 0);
    setTimeout(toNextDay, remainingTime + 10000);
  });

  return (
    <div class="w-screen h-screen p-1">
      <div class="w-full h-full bg-white rounded-md p-1 shadow shadow-sm shadow-gray-400 font-mono flex flex-col overflow-hidden">
        <div data-tauri-drag-region id="header" class="p-2 flex flex-row">
          <button
            class="p-1 bg-opacity-0 hover:bg-opacity-10 bg-dark-50 rounded-md transition-all text-pink-600 flex flex-row items-end"
            onClick={() => {
              setIsToday(!isToday());
            }}
          >
            <div class="font-bold text-xl">
              {isToday() ? 'Today' : 'Tomorrow'}
            </div>
            <div class="fa-solid fa-arrow-right-arrow-left text-sm px-1" />
          </button>
          <div data-tauri-drag-region class="flex-grow" />
          <button
            class="font-bold p-1 bg-opacity-0 hover:bg-opacity-10 bg-dark-50 rounded-md transition-all"
            onClick={() => window.close()}
          >
            <div class="p-2 icon-close" />
          </button>
        </div>
        <div data-tauri-drag-region id="main" class="flex-grow">
          <Show
            when={isOpenEditor()}
            fallback={
              <div class="h-full w-full overflow-hidden p-2 font-md relative">
                <RenderTasks
                  tasks={tasks()}
                  onChange={(newTasks) => {
                    setTasks(newTasks);
                  }}
                />
                <button
                  class="absolute right-3 bottom-3 h-8 w-10 rounded-md bg-pink-600 hover:bg-pink-700 transition"
                  onClick={() => {
                    setIsOpenEditor(true);
                    editor?.focus();
                  }}
                >
                  <div class="fa-solid fa-pen text-white" />
                </button>
              </div>
            }
          >
            <div class="h-full w-full p-2 font-md relative">
              <Editor
                ref={editor}
                value={printTasks(tasks())}
                onClose={(value) => {
                  setTasks(parseTasks(value));
                  setIsOpenEditor(false);
                }}
              />
              <button
                class="absolute right-3 bottom-3 h-8 w-10 rounded-md bg-pink-600 hover:bg-pink-700 transition"
                onClick={() => {
                  if (editor) {
                    setTasks(parseTasks(editor.value));
                  }
                  setIsOpenEditor(false);
                }}
              >
                <div class="fa-solid fa-check text-white" />
              </button>
            </div>
          </Show>
        </div>
        <div class="h-[1px] w-full bg-gray-300" />
        <div
          data-tauri-drag-region
          id="footer"
          class="p-2 font-display text-pink-600"
        >
          1 Day Reminder
        </div>
      </div>
    </div>
  );
};

export default App;
