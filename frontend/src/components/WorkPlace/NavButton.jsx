import React from 'react'
import { Stack } from '@mui/material'
import GetBackToTopButton from './GetBackToTopButton'
import MiniChatbot from './MiniChatbot'
function NavButton() {
  return (
    <div className='fixed bottom-0 right-5 z-50'>
        <Stack direction='column' spacing={1} alignItems='flex-end'>
            <GetBackToTopButton/>
            <MiniChatbot/>
        </Stack>
    </div>
  )
}

export default NavButton