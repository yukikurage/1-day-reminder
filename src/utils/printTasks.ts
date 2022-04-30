export const printTasks = (tasks: Task[]) => {
  const lines = tasks.map((task) => {
    if (task.finished) {
      return `x ${task.content}`;
    } else {
      return `o ${task.content}`;
    }
  });

  return lines.join('\n');
};
