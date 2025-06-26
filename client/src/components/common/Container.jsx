import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const Container = ({header, children}) => {
  return (
    <Box sx={{
        marginTop:"5rem",
        marginx:"auto",
        color:"text.primary" 
    }}>
        <Stack spacing={4}>
            {header &&(
                <Box sx={{
                    position:"relative",
                    padding:{xs:"20px",md:"0"},
                    maxWidth:"1366px",
                    marginX:"auto",
                    width:"100%",
                    "&::before":{
                        content:'""',
                        position:"absolute",
                        top:"100%",
                        left:{xs:"20px",md:"0"},
                        width:"100px",
                        height:"5px",
                        backgroundColor:"primary.main"
                    }
                }}>
                    <Typography variant='h5' fontWeight="700" textTransform={"uppercase"}>
                        {header}
                    </Typography>
                </Box>
            )}
            {children}
        </Stack>
    </Box>
  )
}

export default Container