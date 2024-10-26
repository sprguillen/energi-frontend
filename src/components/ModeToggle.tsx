import React, { useEffect, useState } from 'react';
import BulbIcon from '@mui/icons-material/WbIncandescent';

const ModeToggle: React.FC = () => {
  const [mode, setMode] = useState<string | null>(localStorage.getItem('mode'));

  useEffect(() => {
    if (mode) {
      localStorage.setItem('mode', mode);

      document.body.classList.toggle('dark');
    } else {
      setMode('light');
      localStorage.setItem('mode', 'light');
    }
  }, [mode]);

  const toggle = () => {
    const currentMode = mode === 'light' ? 'dark' : 'light';
    setMode(currentMode);
  }

  return (
    <div className="absolute top-10 right-4">
      <BulbIcon className="cursor-pointer dark:text-white" onClick={toggle} />
    </div>
  )
}

export default ModeToggle;
