'use client';

import { Button, TextField } from '@radix-ui/themes'
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation';

// Dynamically import the SimpleMDE component, disabling SSR
//import SimpleMDE from 'react-simplemde-editor'
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false, loading: () => <p>Loading editor...</p> });

interface IssueForm {
  title: string
  description: string
}


const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>()
  return (
    <form
      className='max-w-xl space-y-5'
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
      }
      )}>
      <TextField.Root placeholder="Add title..." {...register('title')}></TextField.Root>
      <Controller
        name='description'
        control={control}
        render={({ field }) => <SimpleMDE placeholder='Add description...' {...field} />}

      />

      <Button>Submit New Issue</Button>
    </form >
  )
}

export default NewIssuePage