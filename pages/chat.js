import {
    Box,
    Text,
    TextField,
    Image,
    Button,
    Icon
} from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import { Loading } from '../src/components/Loading';

const SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQyMDQ4MCwiZXhwIjoxOTU4OTk2NDgwfQ.n_DGkhoT6fK9bUDNge7GNldfOz00ClevDRyHhdJMHBg';
const SUPABASE_URL = 'https://duprhhmrvjkawuvaanqp.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('tb_mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('tb_mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                // console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
            });

        escutaMensagensEmTempoReal((novaMensagem) => {
            console.log('Nova mensagem:', novaMensagem);
            console.log('listaDeMensagens', listaDeMensagens);

            setListaDeMensagens((valorAtualDaLista) => {
                console.log('listaDeMensagens', listaDeMensagens);
                return [novaMensagem, ...valorAtualDaLista];
            });
        });
    }, []);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem
        };
        supabaseClient
            .from('tb_mensagens')
            .insert([mensagem])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data);
            });
        setMensagem('');
    }

    const DeletarMensagem = (id) => {
        setListaDeMensagens((old) => {
            return old.filter((item) => item.id !== id);
        });
    };

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
                    {/* <MessageList
                        mensagens={listaDeMensagens}
                        onDelete={DeletarMensagem}
                        usuarioLogado={usuarioLogado}
                    /> */}

                    {listaDeMensagens.length == 0 ? (
                        <Loading />
                    ) : (
                        <MessageList
                            mensagens={listaDeMensagens}
                            onDelete={DeletarMensagem}
                            usuarioLogado={usuarioLogado}
                        />
                    )}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'stretch'
                        }}
                    >
                        <Image
                            styleSheet={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '24%',
                                display: 'inline-block',
                                marginRight: '8px'
                            }}
                            src={`https://github.com/${usuarioLogado}.png`}
                        />

                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                console.log();
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    if (mensagem.length > 0) {
                                        handleNovaMensagem(mensagem);
                                    } else {
                                        alert(
                                            'sua mensagem não pode ser vazia'
                                        );
                                    }
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                height: '50px',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                                marginBottom: '-10px'
                            }}
                        />

                        <Button
                            disabled={mensagem.length == 0}
                            onClick={(event) => {
                                event.preventDefault();
                                mensagem.length > 0 &&
                                    handleNovaMensagem(mensagem);
                            }}
                            iconName="paperPlane"
                            rounded="none"
                            buttonColors={{
                                contrastColor: `${appConfig.theme.colors.primary[500]}`,
                                mainColor: `${appConfig.theme.colors.neutrals[800]}`,
                                mainColorLight: `${appConfig.theme.colors.neutrals[600]}`,
                                mainColorStrong: `${appConfig.theme.colors.neutrals[900]}`
                            }}
                            styleSheet={{
                                borderRadius: '50%',
                                padding: '0 3px 0 0',
                                minWidth: '50px',
                                minHeight: '50px',
                                fontSize: '20px',
                                margin: '0 8px',
                                lineHeight: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        />
                        {/* Callback */}
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                console.log(
                                    '[USANDO O COMPONENTE] Salva esse sticker no banco de dados',
                                    sticker
                                );
                                handleNovaMensagem(`:sticker: ${sticker}`);
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
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
    );
}

function MessageList({ usuarioLogado, mensagens, onDelete = () => null }) {
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
            {mensagens.map((mensagem) => (
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
                            src={`https://github.com/${mensagem.de}.png`}
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
                            onClick={() => {
                                console.log('quem clicou foi:', usuarioLogado);
                                if (usuarioLogado == mensagem.de) {
                                    onDelete(mensagem.id);

                                    supabaseClient
                                        .from('tb_mensagens')
                                        .delete([mensagem])
                                        .match({ id: `${mensagem.id}` })
                                        .then(() => {});
                                } else {
                                    alert(
                                        '"Você só pode apagar suas proprias mensagens!!"'
                                    );
                                }
                            }}
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
                        {/* Declarativo */}
                        {mensagem.texto.startsWith(':sticker:') ? (
                            <Image
                                styleSheet={{ maxWidth: '9rem' }}
                                src={mensagem.texto.replace(':sticker:', '')}
                            />
                        ) : (
                            mensagem.texto
                        )}
                        {/* {mensagem.texto} */}
                    </Box>
                    <style>{`
						.message:hover > div .delete-button {
							display: block;
						}
					`}</style>
                </Text>
            ))}
        </Box>
    );
}
