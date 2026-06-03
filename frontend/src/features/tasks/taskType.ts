export interface Task {
    _id?: string;
    title: string;
    tags: string[];
    deadline?: string | null;
    status: string;
}

export interface TaskInput {
    title: string;
    tags: string[];
    deadline: string | null;
    status: string;
}

export interface TaskState {
    tasks: Task[];
    selectedTask: Task | null;
    filteredTask: Task[];
    loading: boolean;
    error: string | null;
    message: string | null;
}