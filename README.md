# DEDEX Dedetizadora

Landing page de controle de pragas. O objetivo da página é levar o visitante para o WhatsApp.

Site estático em HTML, CSS e JavaScript puros, sem framework e sem build. Para rodar, basta
abrir o `index.html` no navegador.

## Estrutura

```
index.html        página inteira
css/style.css     estilos, mobile first
js/script.js      menu, animações, contadores, accordion e vídeos
assets/           logos, ícones, fotos e vídeos
```

## Seções

Header, hero, pragas, serviços, descupinização de solo, escorpião, onde atendemos,
como funciona, por que escolher, depoimentos, dúvidas, quem atende, CTA e rodapé.

## Contato configurado

WhatsApp (19) 98103-8053 em 9 pontos da página, todos com a mesma mensagem automática.
A seção de descupinização de solo usa uma mensagem própria, para identificar quem chega por obra.

## Antes de publicar

A página tem 22 marcações `SUBSTITUIR` no HTML, com dados que o dono precisa confirmar.
Para encontrar todas:

```bash
grep -n "SUBSTITUIR" index.html
```

As mais sensíveis, porque viram compromisso com o cliente:

- Prazo e regras da garantia
- Segurança dos produtos e qualificação da equipe
- Retorno em até 24h no WhatsApp
- Os 3 depoimentos, que hoje são fictícios
- Texto de apresentação e cargo do responsável técnico

Os demais são dados cadastrais: CNPJ, Instagram, horário, cidade de atendimento e o domínio
usado no SEO e no JSON-LD.

## Acessibilidade

Contraste conferido no WCAG AA, navegação por teclado com foco visível, alvos de toque de 44px
ou mais e `prefers-reduced-motion` respeitado: com animações desativadas nada fica invisível e
o vídeo em loop para de rodar sozinho.

## Arquivos de trabalho

Os originais sem tratamento, os vídeos sem compressão e a referência de design ficam fora do
repositório (veja o `.gitignore`). Os vídeos publicados foram comprimidos de 21 MB para 7 MB.
