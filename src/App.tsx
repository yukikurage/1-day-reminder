import type { Component } from "solid-js";

const App: Component = () => {
  return (
    <div data-tauri-drag-region class="w-screen h-screen bg-transparent">
      <button class="btn btn-primary">Button</button>
    </div>
  );
};

export default App;
