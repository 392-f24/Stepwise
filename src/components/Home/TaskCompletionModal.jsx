import { useUser } from '@/contexts/UserContext' // Import useUser hook
import { Box, Button, Modal, Typography, useTheme } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import Confetti from 'react-confetti'

const TaskCompletionModal = ({ open, handleClose }) => {
  const { user } = useUser()
  const theme = useTheme() // Access the theme for colors
  const todayCount = user?.streak?.todayCount || 0 // Get the daily task completion count

  const [confetti, setConfetti] = useState(false)
  const videoRef = useRef(null) // Reference to the video element

  // Define the start and end times for each stage in seconds
  const timeRanges = [
    { start: 0, end: 1.5 },
    { start: 1.45, end: 3.2 },
    { start: 2.95, end: 4.5 },
    { start: 3.9, end: 5.5 },
    { start: 5, end: 8.5 },
  ]

  // Show confetti when exactly 5 tasks are completed
  useEffect(() => {
    if (todayCount === 5) {
      setConfetti(true)
      setTimeout(() => setConfetti(false), 5000)
    }
  }, [todayCount])

  // Control video playback based on `todayCount`
  useEffect(() => {
    const video = videoRef.current
    if (open && video && todayCount <= 5) {
      const { start, end } = timeRanges[todayCount - 1] || { start: 0, end: 0 } // Get time range based on task count
      video.currentTime = start // Set video start time
      video.play()

      // Stop video at the specified end time
      const handleTimeUpdate = () => {
        if (video.currentTime >= end) {
          video.pause()
        }
      }

      video.addEventListener('timeupdate', handleTimeUpdate)

      // Clean up event listener when the component unmounts or task count changes
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [open, todayCount])

  // Only render the modal content if todayCount is 5 or fewer
  if (todayCount === 6 && todayCount > 5) {
    return null // Prevent modal from rendering if more than 5 tasks are completed
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 3,
          bgcolor: theme.palette.primary.light, // Light purple background
          borderRadius: 2,
          textAlign: 'center',
          width: '80%', // Make modal wider
          maxWidth: 600,
          mx: 'auto',
          my: '20vh',
        }}
      >
        {/* Full-screen confetti with purple and white colors */}
        {confetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            colors={[
              theme.palette.primary.main,
              '#FFFFFF',
              theme.palette.primary.light,
            ]} // Purple and white confetti
          />
        )}

        <Box
          component='video'
          src='/tree.mov'
          alt='Growing Tree'
          ref={videoRef}
          controls={false}
          muted
          sx={{
            width: '100%', // Full width of the modal
            borderRadius: 1,
          }}
        />

        <Typography variant='body1' sx={{ mt: 2 }}>
          {todayCount === 4
            ? 'Just one more task to go, you got this!!'
            : todayCount < 5
              ? `Complete ${5 - todayCount} more tasks to grow your tree today!` // General message for counts less than 5
              : 'Congratulations! You Completed 5 tasks today!'}
        </Typography>

        <Button onClick={handleClose} sx={{ mt: 2 }} variant='contained'>
          Keep Going!
        </Button>
      </Box>
    </Modal>
  )
}

export default TaskCompletionModal
