import { Box } from '@skynexui/components'
import React from 'react'
import appConfig from '../config.json'

export default function Teste() {
   return (
      <Box
         styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[300],
            backgroundImage: `url(https://i.imgur.com/WNPJnXf.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundBlendMode: 'multiply',
            color: appConfig.theme.colors.neutrals['000']
         }}
      ></Box>
   )
}
