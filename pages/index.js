import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import React from 'react'
import { useRouter } from 'next/router'
import appConfig from '../config.json'

function Titulo(props) {
   const Tag = props.tag || 'h1'
   return (
      <>
         <Tag>{props.children}</Tag>
         <style jsx>{`
            ${Tag} {
               color: ${appConfig.theme.colors.neutrals['200']};
               font-size: 24px;
               font-weight: 600;
               line-height: 1.5;
               margin-bottom: 20px;
            }
         `}</style>
      </>
   )
}

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
   // const username = 'Lillow'
   const [username, setUsername] = React.useState('')
   const roteamento = useRouter()

   return (
      <>
         <Box
            styleSheet={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               backgroundColor: appConfig.theme.colors.primary[300],
               backgroundImage: 'url(https://i.imgur.com/3VpNAJs.gif)',

               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
               backgroundBlendMode: 'multiply'
            }}
         >
            <Box
               styleSheet={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: {
                     xs: 'column',
                     sm: 'row'
                  },
                  width: '100%',
                  maxWidth: '700px',
                  borderRadius: '12px',
                  padding: '32px',
                  margin: '16px',
                  boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                  backgroundColor: appConfig.theme.colors.primary[900],
                  opacity: '0.9'
               }}
            >
               {/* Formulário */}
               <Box
                  as="form"
                  onSubmit={function (infosDoEvento) {
                     infosDoEvento.preventDefault()
                     roteamento.push('/chat')
                     // window.location.href = '/chat'
                  }}
                  styleSheet={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     justifyContent: 'center',
                     width: { xs: '100%', sm: '50%' },
                     textAlign: 'center',
                     marginBottom: '32px'
                  }}
               >
                  <Titulo tag="h2">
                     Boas vindas <span>Novamente!</span>
                  </Titulo>
                  <Text
                     variant="body3"
                     styleSheet={{
                        marginBottom: '10px',
                        color: appConfig.theme.colors.neutrals[300]
                     }}
                  >
                     {appConfig.name}
                  </Text>

                  {/* <input
                     type="text"
                     
                     onChange={function (event) {
                        console.log('Usuário digitou', event.target.value)
                        // Onde ta o valor?
                        const valor = event.target.value
                        // Trocar o valor da variável
                        // através do React e avise quem precisa
                        setUsername(valor)
                     }}
                  /> */}

                  <TextField
                     value={username}
                     value={username}
                     onChange={function (event) {
                        console.log('Usuário digitou', event.target.value)
                        // Onde ta o valor?
                        const valor = event.target.value
                        // Trocar o valor da variável
                        // através do React e avise quem precisa
                        setUsername(valor)
                     }}
                     fullWidth
                     textFieldColors={{
                        neutral: {
                           textColor: appConfig.theme.colors.neutrals[200],
                           mainColor: appConfig.theme.colors.neutrals[900],
                           mainColorHighlight:
                              appConfig.theme.colors.primary[500],
                           backgroundColor: appConfig.theme.colors.neutrals[800]
                        }
                     }}
                  />

                  <Button
                     type="submit"
                     label="Entrar"
                     fullWidth
                     buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals['100'],
                        mainColor: appConfig.theme.colors.primary[500],
                        mainColorLight: appConfig.theme.colors.primary[400],
                        mainColorStrong: appConfig.theme.colors.primary[600]
                     }}
                  />
               </Box>
               {/* Formulário */}

               {/* Photo Area */}
               <Box
                  styleSheet={{
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     maxWidth: '200px',
                     padding: '16px',
                     backgroundColor: appConfig.theme.colors.neutrals[800],
                     border: '1px solid',
                     borderColor: appConfig.theme.colors.neutrals[999],
                     borderRadius: '10px',
                     flex: 1,
                     minHeight: '240px'
                  }}
               >
                  <Image
                     styleSheet={{
                        borderRadius: '50%',
                        marginBottom: '16px'
                     }}
                     src={
                        username.length > 2
                           ? `https://github.com/${username}.png`
                           : `https://i.imgur.com/mf4gWmN.png`
                     }
                  />
                  <Text
                     variant="body4"
                     styleSheet={{
                        color: appConfig.theme.colors.neutrals[200],
                        backgroundColor: appConfig.theme.colors.neutrals[900],
                        padding: '3px 10px',
                        borderRadius: '1000px'
                     }}
                  >
                     {username}
                  </Text>
               </Box>
               {/* Photo Area */}
            </Box>
         </Box>
      </>
   )
}
