import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components'
import React from 'react'
import appConfig from '../config.json'

export default function ChatPage() {
   const [mensagem, setMensagem] = React.useState('')
   const [listaDeMensagens, setListaDeMensagens] = React.useState([])

   /*
   Usuário
    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem
    
   Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usa o useState (ter if pra caso seja enter pra limpar a variavel)
    - [X] Lista de mensagens 
    */
   function handleNovaMensagem(novaMensagem) {
      const mensagem = {
         id: listaDeMensagens.length + 1,
         de: 'lillow',
         texto: novaMensagem
      }

      setListaDeMensagens([mensagem, ...listaDeMensagens])
      setMensagem('')
   }

   const DeletarMensagem = id => {
      setListaDeMensagens(old => {
         return old.filter(item => item.id !== id)
      })
   }

   return (
      <Box
         styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: `url(https://i.imgur.com/HvcJcQ2.jpg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundBlendMode: 'multiply',
            color: appConfig.theme.colors.neutrals['000']
         }}
      >
         <Box
            styleSheet={{
               display: 'flex',
               flexDirection: 'column',
               flex: 1,
               boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
               borderRadius: '30px',
               backgroundColor: appConfig.theme.colors.primary[950],
               height: '100%',
               maxWidth: '95%',
               maxHeight: '95vh',
               padding: '32px'
            }}
         >
            <Header />
            <Box
               styleSheet={{
                  position: 'relative',
                  display: 'flex',
                  flex: 1,
                  height: '80%',
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                  flexDirection: 'column',
                  borderRadius: '24px',
                  padding: '16px'
               }}
            >
               <MessageList
                  mensagens={listaDeMensagens}
                  onDelete={DeletarMensagem}
               />
               {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
               <Box
                  as="form"
                  styleSheet={{
                     display: 'flex',
                     alignItems: 'stretch'
                  }}
               >
                  <TextField
                     value={mensagem}
                     onChange={event => {
                        const valor = event.target.value
                        setMensagem(valor)
                     }}
                     onKeyPress={event => {
                        console.log()
                        if (event.key === 'Enter') {
                           event.preventDefault()
                           handleNovaMensagem(mensagem)
                        }
                     }}
                     placeholder="Insira sua mensagem aqui..."
                     type="textarea"
                     styleSheet={{
                        width: '100%',
                        border: '0',
                        resize: 'none',
                        borderRadius: '5px',
                        padding: '6px 8px',
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                        marginRight: '12px',
                        color: appConfig.theme.colors.neutrals[200],
                        marginBottom: '-10px'
                     }}
                  />
                  <Button
                     onClick={event => {
                        event.preventDefault()
                        handleNovaMensagem(mensagem)
                     }}
                     label="Enviar"
                     type="submit"
                     buttonColors={{
                        mainColor: appConfig.theme.colors.primary[400],
                        mainColorLight: appConfig.theme.colors.primary[300],
                        mainColorStrong: appConfig.theme.colors.primary[600],
                        contrastColor: appConfig.theme.colors.neutrals['000']
                     }}
                  />
               </Box>
            </Box>
         </Box>
      </Box>
   )
}

function Header() {
   return (
      <>
         <Box
            styleSheet={{
               width: '100%',
               marginBottom: '16px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between'
            }}
         >
            <Text variant="heading5">Chat</Text>
            <Button
               variant="tertiary"
               colorVariant="neutral"
               label="Logout"
               href="/"
            />
         </Box>
      </>
   )
}

function MessageList({ mensagens, onDelete = () => null }) {
   return (
      <Box
         tag="ul"
         styleSheet={{
            overflow: 'scroll',
            display: 'flex',
            flexDirection: 'column-reverse',
            justifyContent: 'end',
            flex: 1,
            color: appConfig.theme.colors.neutrals['000'],
            marginBottom: '16px'
         }}
      >
         {mensagens.map(mensagem => (
            <Text
               tag="li"
               className="message"
               key={mensagem.id}
               styleSheet={{
                  borderRadius: '5px',
                  padding: '6px',
                  marginBottom: '12px',
                  hover: {
                     backgroundColor: appConfig.theme.colors.primary[700]
                  }
               }}
            >
               <Box
                  styleSheet={{
                     display: 'flex',
                     alignItems: 'baseline',
                     marginBottom: '8px'
                  }}
               >
                  <Image
                     styleSheet={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '8px'
                     }}
                     src={`https://github.com/Lillow.png`}
                  />

                  <Text tag="strong">{mensagem.de}</Text>

                  <Text
                     styleSheet={{
                        fontSize: '10px',
                        marginLeft: '8px',
                        color: appConfig.theme.colors.neutrals[300]
                     }}
                     tag="span"
                  >
                     {new Date().toLocaleDateString()}
                  </Text>
                  <Icon
                     name="FaTrash"
                     className="delete-button"
                     onClick={() => onDelete(mensagem.id)}
                     styleSheet={{
                        fontSize: '1.2rem',
                        alignSelf: 'center',
                        marginLeft: 'auto',
                        cursor: 'pointer',
                        display: 'none'
                     }}
                  />
               </Box>
               <Box
                  as="p"
                  styleSheet={{
                     overflowWrap: 'break-word',
                     textIndent: '1rem',
                     paddingLeft: '0.7rem'
                  }}
               >
                  {mensagem.texto}
               </Box>
               <style>{`
						.message:hover > div .delete-button {
							display: block;
						}
					`}</style>
            </Text>
         ))}
      </Box>
   )
}
