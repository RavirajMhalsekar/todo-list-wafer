import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    getDocs,
    getDoc,
    serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

export interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    userId: string;
    createdAt: Date;
}

export const addTodo = async (userId: string, title: string, description: string, completed: boolean = false) => {
    const todosRef = collection(db, 'todos');
    const newTodo = {
        title,
        description,
        completed,
        userId,
        createdAt: serverTimestamp()
    };

    const docRef = await addDoc(todosRef, newTodo);
    return {
        id: docRef.id,
        ...newTodo,
        createdAt: new Date() // Use current date for immediate display
    };
};

export const updateTodoStatus = async (todoId: string, completed: boolean) => {
    const todoRef = doc(db, 'todos', todoId);
    await updateDoc(todoRef, { completed });
};

export const deleteTodo = async (todoId: string) => {
    const todoRef = doc(db, 'todos', todoId);
    await deleteDoc(todoRef);
};

export const getTodo = async (todoId: string) => {
    const todoRef = doc(db, 'todos', todoId);
    const todoSnap = await getDoc(todoRef);
    if (todoSnap.exists()) {
        return { id: todoSnap.id, ...todoSnap.data() } as Todo;
    }
    return null;
};

export const getTodos = async (
    userId: string,
    filter?: 'all' | 'completed' | 'active',
    sortBy?: 'createdAt' | 'title',
    sortOrder?: 'asc' | 'desc',
    searchQuery?: string
) => {
    try {
        const todosRef = collection(db, 'todos');

        // Always filter by userId and add orderBy for the composite index
        const baseQuery = query(
            todosRef,
            where('userId', '==', userId),
            orderBy('createdAt', sortOrder || 'desc')
        );

        const querySnapshot = await getDocs(baseQuery);
        let todos = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate() // Convert Firestore Timestamp to Date
        })) as Todo[];

        // Apply filters in memory to avoid complex indexes
        if (filter === 'completed') {
            todos = todos.filter(todo => todo.completed);
        } else if (filter === 'active') {
            todos = todos.filter(todo => !todo.completed);
        }

        // Apply sorting
        if (sortBy === 'title') {
            todos.sort((a, b) => {
                const comparison = a.title.localeCompare(b.title);
                return sortOrder === 'asc' ? comparison : -comparison;
            });
        }

        // Apply search filter if provided
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            todos = todos.filter(todo =>
                todo.title.toLowerCase().includes(searchLower) ||
                todo.description.toLowerCase().includes(searchLower)
            );
        }

        return todos;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};