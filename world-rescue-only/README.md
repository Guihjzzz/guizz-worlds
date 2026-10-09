# Guizz World Rescue

Esta entrada abre a cópia completa da ferramenta original em tools/guizz-world-rescue.html. A página mantém o seletor de idiomas, as abas com instruções para iPhone/iPad, Android, Windows e console, o tema claro/escuro, o envio de arquivo e o fluxo original de recuperação. O português fica selecionado na primeira abertura; depois, sua escolha de idioma é salva.

## Iniciar

Para o Next.js carregar todos os arquivos locais e para o seletor salvar o idioma, inicie o servidor a partir da pasta raiz do site.

~~~powershell
Set-Location "D:\site holograma\createtextures-world-rescue"
node serve-local.cjs
~~~

Com o terminal aberto, acesse:

http://127.0.0.1:8000/tools/guizz-world-rescue.html

Para encerrar, use Ctrl+C no terminal onde o servidor foi iniciado.

O arquivo world-rescue-only/index.html encaminha para essa página. Se quiser continuar usando a versão simples criada antes, abra world-rescue-only/recovery-basic.html.

## Identidade visual

- tools/guizz-theme.css: tema azul, marca e ajustes visuais.
- world-rescue-only/assets/minecraft_title.png: título Guizz usado no cabeçalho.
- world-rescue-only/assets/capa-guizz.png: capa e marca d'água visual.

O HTML original e os arquivos JavaScript da ferramenta permanecem como base da versão completa. A página personalizada guarda sua própria cópia em tools/guizz-world-rescue.html; o tools/world-rescue.html original foi mantido.
