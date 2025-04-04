import { Skeleton } from '@/app/components/index'
import { Box } from '@radix-ui/themes'

const NewIssueLoading = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Skeleton height='20rem' />
    </Box>
  )
}

export default NewIssueLoading