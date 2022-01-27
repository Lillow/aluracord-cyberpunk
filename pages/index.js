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
               color: ${appConfig.theme.colors.primary['400']};
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
   // const userName = 'Lillow'
   const [userName, setUserName] = React.useState('')
   const [userLocation, setLocation] = React.useState('')
   const [name, setName] = React.useState('')
   const roteamento = useRouter()

   const gitHubDadosAPI = fetch(`https://api.github.com/users/${userName}`)
      .then(function (response) {
         return response.json() //convert the http format for json
      })
      .then(function (jsonResponse) {
         let location = jsonResponse.location
         let name = jsonResponse.name
         if (userName.length > 2) {
            setLocation(location)
            setName(name)
            return jsonResponse
         }
      })

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
                  borderRadius: '30px',
                  padding: '32px',
                  margin: '16px',
                  boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                  backgroundColor: appConfig.theme.colors.primary[950],
                  backgroundBlendMode: 'screen'
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
                        setUserName(valor)
                     }}
                  /> */}

                  <TextField
                     placeholder="Login"
                     value={userName}
                     onChange={function (event) {
                        console.log('Usuário digitou', event.target.value)
                        // Onde ta o valor?
                        const valor = event.target.value
                        // Trocar o valor da variável
                        // através do React e avise quem precisa
                        setUserName(valor)
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
                        mainColor: appConfig.theme.colors.primary[400],
                        mainColorLight: appConfig.theme.colors.primary[300],
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
                     minHeight: '240px',
                     opacity: '0.99'
                  }}
               >
                  <Image
                     styleSheet={{
                        borderRadius: '20%',
                        marginBottom: '16px'
                     }}
                     src={
                        userName.length > 2
                           ? `https://github.com/${userName}.png`
                           : `https://i.imgur.com/C0Y6DRB.png`
                     }
                  />
                  <Text
                     variant="body4"
                     styleSheet={{
                        color: appConfig.theme.colors.neutrals[200],
                        backgroundColor: appConfig.theme.colors.primary[500],
                        padding: '3px 10px',
                        borderRadius: '1000px',
                        marginBottom: '5px'
                     }}
                  >
                     {userName}
                  </Text>

                  <Text
                     variant="body4"
                     styleSheet={{
                        color: appConfig.theme.colors.neutrals[200],
                        backgroundColor: appConfig.theme.colors.primary[500],
                        padding: '3px 10px',
                        borderRadius: '1000px',
                        marginBottom: '5px'
                     }}
                  >
                     {name}
                  </Text>
                  <Text
                     variant="body4"
                     styleSheet={{
                        color: appConfig.theme.colors.neutrals[200],
                        backgroundColor: appConfig.theme.colors.primary[500],
                        padding: '3px 10px',
                        borderRadius: '1000px',
                        marginBottom: '5px'
                     }}
                  >
                     {userLocation}
                  </Text>
               </Box>
               {/* Photo Area */}
            </Box>
         </Box>
      </>
   )
}
