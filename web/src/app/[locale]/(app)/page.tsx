import { Heading, Stack } from '@chakra-ui/react'
import { getTranslations } from 'next-intl/server'

export default async function Index() {
  const t = await getTranslations('home')

  return (
    <Stack flex={1} w="full" gap={20} textAlign="center">
      <Heading>{t('title')}</Heading>
      <Heading>TODO: List of events here</Heading>
    </Stack>
  )
}
