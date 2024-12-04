import React from 'react';
import AuthProvider from './components/auth/AuthProvider';
import Shell from './components/layout/Shell';

function App() {
  return (
    <AuthProvider>
      <div className="h-screen bg-white">
        <Shell />
      </div>
    </AuthProvider>
  );
}

export default App;