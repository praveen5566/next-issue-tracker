'use client';

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod'

// Dynamically import the SimpleMDE component, disabling SSR
//import SimpleMDE from 'react-simplemde-editor'
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false, loading: () => <p>Loading editor...</p> });

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const [error, setError] = useState('')
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  return (
    <div className='max-w-xl'>
      {error &&
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>}
      <form
        className=' space-y-5'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('Something went wrong!')
          }
        }
        )}>
        <TextField.Root placeholder="Add title..." {...register('title')}></TextField.Root>
        {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder='Add description...' {...field} />}
        />
        {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}

        <Button>Submit New Issue</Button>
      </form >
    </div>
  )
}

export default NewIssuePage