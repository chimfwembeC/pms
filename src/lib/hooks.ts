import { useEffect } from 'react';
import { auth, db } from './firebase';
import { collection, query, onSnapshot, where, doc, getDoc } from 'firebase/firestore';
import { useStore } from './store';
import type { Task, Project } from '@/types';

export function useAuth() {
  const { currentUser, setCurrentUser } = useStore((state) => ({
    currentUser: state.currentUser,
    setCurrentUser: state.setCurrentUser,
  }));

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Get user role from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        
        setCurrentUser({
          id: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || undefined,
          teams: userData?.teams || [],
          role: userData?.role || 'user', // Default to regular user
        });
      } else {
        setCurrentUser(null);
      }
    });
  }, [setCurrentUser]);

  return { currentUser };
}

export function useTasks(projectId?: string) {
  const setTasks = useStore((state) => state.setTasks);

  useEffect(() => {
    if (!projectId) {
      setTasks([]);
      return;
    }

    const q = query(collection(db, 'tasks'), where('projectId', '==', projectId));

    return onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTasks(tasks);
    });
  }, [projectId, setTasks]);
}

export function useProjects() {
  const setProjects = useStore((state) => state.setProjects);

  useEffect(() => {
    const q = query(collection(db, 'projects'));

    return onSnapshot(q, (snapshot) => {
      const projects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];
      setProjects(projects);
    });
  }, [setProjects]);
}