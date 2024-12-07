import React, { useState } from 'react';
import ProjectList from './ProjectList';
import TaskPanel from '../tasks/TaskPanel';
import DetailPanel from '../tasks/DetailPanel';
import { useStore } from '@/lib/store';

function Projects() {
  const selectedProject = useStore((state) => state.selectedProject);
  
  // Define the search query state


  return (    
    <div className="h-screen w-full border-r flex flex-row">
      {!selectedProject ? (
        <ProjectList />
      ) : (
        <>
          {/* Pass the search query to TaskPanel */}
          <TaskPanel />
          <DetailPanel />

        </>
      )}
    </div>  
  );
}

export default Projects;
