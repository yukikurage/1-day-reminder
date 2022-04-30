import { For } from 'solid-js';

const RenderTasks = (props: {
  tasks: Task[];
  onChange: (tasks: Task[]) => void;
}) => (
  <div class="w-full h-full">
    <div class="w-full h-full flex flex-col gap-2 overflow-y-scroll scrollbar scrollbar-thumb-gray-300">
      <For each={props.tasks}>
        {({ finished, content }, i) => (
          <div data-tauri-drag-region class="flex flex-row gap-2 items-start">
            <input
              type="checkbox"
              class="placeholder-pink-600 w-4 h-4 m-1"
              checked={finished}
              onChange={() =>
                props.onChange(
                  props.tasks.map((task, j) =>
                    j === i() ? { ...task, finished: !task.finished } : task
                  )
                )
              }
            />
            <div>{renderString(content)}</div>
          </div>
        )}
      </For>
    </div>
  </div>
);

const renderString = (str: string) => (
  <div>
    {str.split(/(\r\n|\n|\r)/).map((line) => (
      <div>{line}</div>
    ))}
  </div>
);

export default RenderTasks;
