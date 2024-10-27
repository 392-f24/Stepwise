import GoalTracker from '@components/Home/GoalTracker';
import { Box } from '@mui/material';
import { useState } from 'react';

const Home = () => {
  const [goals, setGoals] = useState([
    {
      id: '1',
      title: 'Improve Coding Skills',
      expanded: true,
      microGoals: [
        {
          id: '1-1',
          title: 'Learn React',
          expanded: true,
          tasks: [
            { id: '1-1-1', title: 'Complete React tutorial', completed: true },
            { id: '1-1-2', title: 'Build a small project', completed: false },
          ],
        },
        {
          id: '1-2',
          title: 'Master JavaScript',
          expanded: false,
          tasks: [
            { id: '1-2-1', title: 'Study ES6+ features', completed: false },
            { id: '1-2-2', title: 'Practice coding challenges', completed: false },
          ],
        },
      ],
    },
  ]);

  const handleToggleTask = (macroGoalId, microGoalId, taskId) => {
    setGoals((prevGoals) =>
      prevGoals.map((macroGoal) =>
        macroGoal.id === macroGoalId
          ? {
              ...macroGoal,
              microGoals: macroGoal.microGoals.map((microGoal) =>
                microGoal.id === microGoalId
                  ? {
                      ...microGoal,
                      tasks: microGoal.tasks.map((task) =>
                        task.id === taskId ? { ...task, completed: !task.completed } : task,
                      ),
                    }
                  : microGoal,
              ),
            }
          : macroGoal,
      ),
    );
  };

  const handleToggleExpand = (goalId, goalType) => {
    setGoals((prevGoals) =>
      prevGoals.map((macroGoal) =>
        goalType === 'macro' && macroGoal.id === goalId
          ? { ...macroGoal, expanded: !macroGoal.expanded }
          : {
              ...macroGoal,
              microGoals: macroGoal.microGoals.map((microGoal) =>
                goalType === 'micro' && microGoal.id === goalId
                  ? { ...microGoal, expanded: !microGoal.expanded }
                  : microGoal,
              ),
            },
      ),
    );
  };

  return (
    <Box sx={{ width: '90%', margin: 'auto' }}>
      <GoalTracker
        macroGoals={goals}
        onToggleTask={handleToggleTask}
        onToggleExpand={handleToggleExpand}
      />
    </Box>
  );
};

export default Home;
