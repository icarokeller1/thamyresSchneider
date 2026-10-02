# Thamyres Schneider

Site de Thamyres Schneider, Secretária Executiva, em Next.js (App Router), TypeScript, Motion e Lucide.

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
- Apresentação profissional como Secretária Executiva, sem rótulos acima dos títulos. Textos de leitura com 16px e informações de apoio e navegação com pelo menos 14px, incluindo a versão mobile.
- Animações de entrada, parallax do retrato, botões magnéticos e efeitos de luz nos cartões.
- Detalhes de serviços em modal, abas de formação, perguntas frequentes e navegação responsiva.
- Formulário que prepara uma mensagem no WhatsApp: o visitante confirma o envio no aplicativo.
- Número, e-mail, Instagram e LinkedIn transcritos dos cartões fornecidos. O número e os botões do WhatsApp abrem uma conversa; não há links para ligações. A detecção automática de telefone pelo navegador está desativada.
- Textos em primeira pessoa e faixa animada com 14 palavras sobre os valores do meu trabalho.
- Preferência de movimento reduzido, navegação por teclado, foco no modal e metadados em português.
- Fontes hospedadas pelo próprio site, sem dependência de requisições ao Google Fonts.
- Animações ligadas à posição da rolagem: texto que ganha destaque palavra por palavra, ornamentos que giram, parallax dos retratos e cartões com movimentos escalonados.
- Seção de processo com painel fixo durante a rolagem, quatro etapas sequenciais e navegação direta entre elas.
- Composição própria para celulares: retrato e título sobrepostos, serviços em carrossel com gesto de deslizar, perfil em duas colunas, menu inferior e detalhes de serviços em painel inferior.
- A abertura mobile usa retrato em toda a largura, com texto sobreposto e degradê para leitura, inclusive em celulares estreitos. A localização permanece na seção de contato, sem texto sobre a foto.
- Inputs com tamanho adequado ao toque e áreas fixas que respeitam a margem de segurança do aparelho. Em telas baixas ou com movimento reduzido, todas as etapas ficam disponíveis sem fixar o painel.

## Conteúdo e imagens

### Instagram profissional

A seção Instagram exibe as três publicações escolhidas: `Dd2DQYCOJ4b`, `Dd2GM4sh3MA` e `Dd6McKyJRo1`. As imagens reais estão em `public/instagram`; os títulos editoriais, descrições acessíveis e códigos dos posts ficam em `app/instagram-posts.ts`. Cada cartão abre o post original no Instagram. No celular, os cartões formam um carrossel com gesto de deslizar, indicadores e navegação por teclado.

Esta é uma seleção fixa, sem sincronização automática do perfil. Para trocar as publicações, atualize os códigos e imagens nesse arquivo. As fotos são servidas e otimizadas pelo Next.js; a seção não depende de scripts externos do Instagram para carregar.

Os contatos e informações de formação vêm dos cartões fornecidos. A apresentação profissional segue a indicação de Secretária Executiva. As descrições de serviços são textos editoriais propostos, com escopo a alinhar no contato inicial. Não há depoimentos ou estatísticas inventados.

`public/thamyres-portrait.png` é o retrato preparado a partir do primeiro cartão com a ferramenta de geração de imagens, preservando a pose e substituindo o fundo por azul profundo. É uma imagem adaptada por IA. Esse retrato aparece na abertura, na apresentação pessoal e na imagem de compartilhamento.

Para configurar o endereço usado nas imagens de compartilhamento, defina `SITE_URL` com o domínio público. Na Vercel, `VERCEL_PROJECT_PRODUCTION_URL` é detectada automaticamente. A publicação pode ser feita em um serviço compatível com Next.js. Nenhuma publicação externa é realizada pelo projeto.
