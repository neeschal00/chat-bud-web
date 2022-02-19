import { Avatar, Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import img1 from '../../images/1.jpg';
export default function Testimonial() {
  return (
    <Stack
      bg={useColorModeValue('gray.50', 'gray.800')}
      py={16}
      px={8}
      spacing={{ base: 8, md: 10 }}
      align={'center'}
      direction={'column'}>
      <Text
        fontSize={{ base: 'xl', md: '2xl' }}
        textAlign={'center'}
        maxW={'3xl'}>
        We had an incredible experience working with Chat Bud and were
        impressed they made such a big difference. Our team
        is so grateful for the wonderful improvements they made and their
        ability to get familiar with the product concept so quickly. We'd like to join the chatting community 
        and encourage others to do so.
      </Text>
      <Box textAlign={'center'}>
        <Avatar
          src={
            img1
          }
          alt={'Sanjib Limbu'}
          mb={2}
        />

        <Text fontWeight={600}>Jenny Wilson</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.400', 'gray.400')}>
          Vice President
        </Text>
      </Box>
    </Stack>
  );
}