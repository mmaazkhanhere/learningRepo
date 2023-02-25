import React from 'react'
import { Box, Container, Heading } from '@chakra-ui/react'

export default function Home(hello: any) {
    return (
        <Box bgImage={hello.src} py='200px' bgSize='cover' bgAttachment='fixed' > {/*Since we want to keep the design for all page but want to change image only, a hello prop is used which where we will provide the src 
    of the image only. So the design will remain same but the background image will change */}

            <Container maxW='1600px'>

                <Heading px='30px' size='2xl'>{hello.title} </Heading>

            </Container>
        </Box>
    )
}
