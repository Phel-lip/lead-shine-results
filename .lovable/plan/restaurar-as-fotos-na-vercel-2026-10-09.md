# Restaurar as fotos na Vercel

## Objetivo
Recuperar todas as fotos reais que já aparecem corretamente na versão Lovable e torná-las parte do próprio projeto, eliminando os endereços exclusivos da hospedagem Lovable que hoje retornam erro na Vercel.

## Alterações
- Baixar as imagens originais atualmente válidas: foto principal, sete fotos de serviços, duas imagens de antes/depois e demais fotos importadas.
- Salvar os arquivos em `src/assets` e trocar somente os imports/referências de imagem.
- Manter integralmente o FAQ atualizado, textos, design, contatos, botões e fluxo de solicitação pelo WhatsApp.
- Remover do uso da página os ponteiros de imagem incompatíveis com hospedagem externa, sem apagar fotos remotas antigas.

## Verificação
- Confirmar que todas as imagens carregam com dimensões reais e nenhuma requisição retorna erro.
- Conferir visualmente a foto principal, os serviços e o comparador antes/depois.
- Executar os testes existentes e confirmar que o projeto continua compilando.

## Detalhes técnicos
- Causa confirmada: os caminhos `/__l5e/assets-v1/...` funcionam na Lovable, mas retornam 404 no domínio da Vercel.
- Os binários serão importados pelo Vite a partir de `src/assets`, gerando URLs versionadas e portáveis para Vercel.
- O repositório antigo não está publicamente acessível; a recuperação usará os mesmos binários originais ainda disponíveis na versão Lovable, com dimensões e conteúdo preservados.