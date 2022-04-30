export const parseTasks = (str: string) => {
  const lines = str.split(/\r\n|\r|\n/g);
  const tasks: Task[] = [];

  lines.forEach((line) => {
    const lineTrimmed = line.trim();

    if (lineTrimmed.startsWith('o ')) {
      const task = { finished: false, content: lineTrimmed.substring(2) };
      tasks.push(task);
    } else if (lineTrimmed.startsWith('x ')) {
      const task = { finished: true, content: lineTrimmed.substring(2) };
      tasks.push(task);
    } else if (lineTrimmed !== '' && tasks.length > 0) {
      tasks[tasks.length - 1].content += '\n' + lineTrimmed;
    } else if (lineTrimmed !== '' && tasks.length === 0) {
      tasks.push({ finished: false, content: lineTrimmed });
    }
  });

  return tasks;
};
