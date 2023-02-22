import React from 'react'
import { Box, Container, SimpleGrid, Flex, Button, Menu, IconButton, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import Image from 'next/image'
import png from '../../../public/panaverse80_80.png'
import Link from 'next/link'
import { HamburgerIcon } from '@chakra-ui/icons'

export default function Header() {
    return (
        <Box boxShadow='lg'>
            <Container maxW={1400}> {/*Containers are used to constrain a content's width to the current breakpoint, while keeping it fluid. They make it easier to create responsive designs 
            that adapt to different screen sizes and device types.
            
            maxW specifies the maximum width of the container*/}

                <SimpleGrid templateColumns={{ sm: 'repeat(3,1fr)', lg: 'repeat(3,1fr)' }}> {/*a layout component in the Chakra UI React component library that provides a simple and easy-to-use grid system for 
                building responsive web layouts
                
                templateColumns prop is used to define the columns of a grid layout. repeat function is used to define three columns with equal widths using 1 fraction (fr) unit
                */}

                    <Box> {/*Box for Logo Image */}

                        <Image src={png} alt='panaverse' /> {/*Image component of nextjs is used. All the images are placed in the public folder */}
                        {/*If  logo is not displayed, alternative panaverse will be displayed. Any space given after <Image> will give error so use <Image/> */}

                    </Box>

                    <Flex display={{ lg: 'flex', base: 'none' }} placeItems='center' gap={10} fontSize='18px' fontWeight='semibold'> {/*it is used for creating flexible layouts that allow the positioning and alignment of child elements in a container. Using it, you can create layouts that are both
                    flexible and responsive, allowing one to easily adjust the layout of the web pages to fit different screen sizes and devices. We will provide 5 links to 5 pages, 
                    so we will include 5 link components
                    
                    gap property places gap between the items in the flex
                    display property is used to display items when large screen and to hide the flex content when screen shrinks
                    placeItems property places the items within the flew to the center*/}

                        <Link href=''>Home</Link>

                        <Link href=''>Syllabus</Link>

                        <Link href=''>Explore</Link>

                        <Link href=''>About</Link>

                        <Link href=''>Contact</Link>

                    </Flex>

                    <Box display={{ base: 'none', lg: 'initial' }} pt='25px'> {/*Separate box for the apply button */}

                        <Button size='lg' colorScheme='teal' float='right' mt='-10px'>Apply</Button> {/*The button will shift to the right side of the page
                        
                    colorScheme* is used to specify the color scheme for the button
                    size sets the size of button to lg
                    mt is used to add margin outside the element of 10px*/}
                    </Box>

                    <Box display={{ base: 'inital', lg: 'none' }}>

                        <Menu >

                            <MenuButton as={IconButton}
                                float='left'
                                aria-label='Options' //provides an accessible name for the menu and is visible when there is no visible label for the menu
                                icon={<HamburgerIcon />} //icon to render before the menu item's label
                                variant='menu' //allows to ustomise the appearance of the menu
                            />

                            <MenuList>

                                <MenuItem>
                                    <Link href='/'></Link>
                                </MenuItem>

                                <MenuItem>Syllabus</MenuItem>

                                <MenuItem>Explore</MenuItem>

                                <MenuItem>About</MenuItem>

                                <MenuItem>Contact</MenuItem>

                            </MenuList>

                        </Menu>

                    </Box>

                </SimpleGrid>
            </Container>
        </Box>
    )
}
