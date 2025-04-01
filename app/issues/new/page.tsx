import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-5'>
      <TextField.Root placeholder="Add title..."></TextField.Root>
      <TextArea placeholder='Add description...'></TextArea>
      <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage