export const parseTasks = (str: string) => {
  const lines = str.split(/\r\n|\r|\n/g);
  const tasks: Task[] = [];

  lines.forEach((line) => {
    if (line.startsWith('o ')) {
      const task = { finished: false, content: line.substring(2) };
      tasks.push(task);
    } else if (line.startsWith('x ')) {
      const task = { finished: true, content: line.substring(2) };
      tasks.push(task);
    } else if (line !== '') {
      tasks[tasks.length - 1].content += '\n' + line;
    }
  });

  return tasks;
};
