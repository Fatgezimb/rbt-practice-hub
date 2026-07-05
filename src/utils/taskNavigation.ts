export function taskElementId(taskNumber: number) {
  return `task-${taskNumber}`;
}

export function taskMapPath(taskNumber: number) {
  return `/map?task=${taskNumber}`;
}

export function taskPracticePath(taskNumber: number) {
  return `/practice?task=${taskNumber}`;
}
