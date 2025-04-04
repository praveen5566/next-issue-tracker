import { Box, Card, Flex } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const IssueDetailsLoading = async () => {

  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex gap='4' my='2'>
        <Skeleton width='5rem' />
        <Skeleton width='8rem' />
      </Flex>
      <Card className='prose' mt='4'>
        <Skeleton count={4} />
      </Card>
    </Box>
  )
}

export default IssueDetailsLoading