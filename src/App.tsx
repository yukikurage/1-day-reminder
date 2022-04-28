import type { Component } from "solid-js";

const App: Component = () => {
  return (
    <div class="w-screen h-screen p-1">
      <div
        data-tauri-drag-region
        class="w-full h-full bg-opacity-80 bg-gray-50 rounded-md p-1 shadow shadow-sm shadow-gray-400 font-mono"
      >
        <div class="p-2">
          <button class="font-bold p-1 text-lg bg-opacity-0 hover:bg-opacity-20 bg-dark-50 rounded-md transition-all">
            Today
          </button>
        </div>
        <div class="flex flex-col gap-2 p-2 font-md">
          <div class="flex flex-row gap-2 items-center">
            <input type="checkbox" />
            <div>task1</div>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <input type="checkbox" />
            <div>task2</div>
          </div>
          <div class="flex flex-row gap-2 items-center">
            <input type="checkbox" />
            <div>task3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
