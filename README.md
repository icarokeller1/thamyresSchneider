# Thamyres Schneider

Site de assessoria executiva e institucional em Next.js (App Router), TypeScript, Motion e Lucide.

## Executar

```bash
npm install
npm run dev
```

Acesse http://localhost:3000. No PowerShell com scripts desabilitados, use `npm.cmd`.

```bash
npm run typecheck
npm run build
npm start
```

## Recursos

- Seis atmosferas visuais, com preferência salva localmente.
- Animações de entrada, parallax do retrato, botões magnéticos e efeitos de luz nos cartões.
- Detalhes de serviços em modal, abas de formação, perguntas frequentes e navegação responsiva.
- Formulário que prepara uma mensagem no WhatsApp: o visitante confirma o envio no aplicativo.
- Links de telefone, e-mail, Instagram e LinkedIn transcritos dos cartões fornecidos.
- Preferência de movimento reduzido, navegação por teclado, foco no modal e metadados em português.
- Fontes hospedadas pelo próprio site, sem dependência de requisições ao Google Fonts.
- Animações ligadas à posição da rolagem: texto que ganha destaque palavra por palavra, ornamentos que giram, parallax dos retratos e cartões com movimentos escalonados.
- Seção de processo com painel fixo durante a rolagem, quatro etapas sequenciais e navegação direta entre elas.
- Composição própria para celulares: retrato e título sobrepostos, serviços em carrossel com gesto de deslizar, perfil em duas colunas, menu inferior e detalhes de serviços em painel inferior.
- Inputs com tamanho adequado ao toque e áreas fixas que respeitam a margem de segurança do aparelho. Em telas baixas ou com movimento reduzido, todas as etapas ficam disponíveis sem fixar o painel.

## Conteúdo e imagens

Os contatos, títulos de atuação e informações de formação vêm dos cartões fornecidos. As descrições de serviços são textos editoriais propostos, com escopo a alinhar no contato inicial. Não há depoimentos ou estatísticas inventados.

`public/thamyres-portrait.png` foi preparado com a ferramenta integrada de geração de imagens, a partir do retrato do primeiro cartão, para substituir o fundo e retirar os elementos do cartão. É uma imagem adaptada por IA; a foto original pode substituí-la nesse mesmo caminho.

Prompt final: extração do retrato da mesma mulher do primeiro cartão, preservando rosto, sorriso, cabelos, roupa e pose; substituição do fundo por azul profundo com iluminação dourada discreta; retrato editorial vertical 3:4; sem texto, marcas ou ornamentos do cartão. O segundo cartão foi usado como referência de cor.

Para configurar o endereço usado nas imagens de compartilhamento, defina `SITE_URL` com o domínio público. Na Vercel, `VERCEL_PROJECT_PRODUCTION_URL` é detectada automaticamente. A publicação pode ser feita em um serviço compatível com Next.js. Nenhuma publicação externa é realizada pelo projeto.
