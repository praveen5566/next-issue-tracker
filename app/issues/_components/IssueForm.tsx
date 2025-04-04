'use client';

import { ErrorMessage, Spinner } from '@/app/components/index';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';


type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data)
      } else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues');
      router.refresh()
    } catch (error) {
      setIsSubmitting(false)
      setError('Something went wrong!')
    }
  }
  )

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
        onSubmit={onSubmit}>
        <TextField.Root defaultValue={issue?.title} placeholder="Add title..." {...register('title')}></TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMDE placeholder='Add description...' {...field} />}
        />
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'} {isSubmitting && <Spinner />}
        </Button>
      </form >
    </div>
  )
}

export default IssueForm