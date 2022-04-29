import type { Component } from "solid-js";

const App: Component = () => {
  return (
    <div class="w-screen h-screen p-1">
      <div class="w-full h-full bg-white rounded-md p-1 shadow shadow-sm shadow-gray-400 font-mono flex flex-col">
        <div data-tauri-drag-region id="header" class="p-2 flex flex-row">
          <button class="font-bold p-1 text-xl bg-opacity-0 hover:bg-opacity-10 bg-dark-50 rounded-md transition-all text-pink-600 flex flex-row items-end">
            Today
            <div class="icon-arrows-exchange" />
          </button>
          <div data-tauri-drag-region class="flex-grow" />
          <button class="font-bold p-1 bg-opacity-0 hover:bg-opacity-10 bg-dark-50 rounded-md transition-all">
            <div class="p-2 icon-close" />
          </button>
        </div>
        <div
          data-tauri-drag-region
          id="main"
          class="flex flex-col gap-2 p-2 font-md flex-grow overflow-y-scroll scrollbar scrollbar-thumb-gray-300"
        >
          {[...Array(10)].map((_, i) => (
            <div
              data-tauri-drag-region
              class="flex flex-row gap-2 items-center"
            >
              <input type="checkbox" class="placeholder-pink-600" />
              <div>{`task${i}`}</div>
            </div>
          ))}
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
