let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Documents/Development/javascript/Projects/_shopping-list
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +158 src/script.js
badd +83 src/index.html
badd +99 src/style.css
argglobal
%argdel
$argadd src/script.js
edit src/script.js
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 90 + 90) / 180)
exe '2resize ' . ((&lines * 22 + 19) / 38)
exe 'vert 2resize ' . ((&columns * 89 + 90) / 180)
exe '3resize ' . ((&lines * 13 + 19) / 38)
exe 'vert 3resize ' . ((&columns * 89 + 90) / 180)
argglobal
balt src/style.css
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 158 - ((25 * winheight(0) + 18) / 36)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 158
normal! 014|
wincmd w
argglobal
if bufexists("src/index.html") | buffer src/index.html | else | edit src/index.html | endif
if &buftype ==# 'terminal'
  silent file src/index.html
endif
balt src/script.js
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 83 - ((12 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 83
normal! 040|
wincmd w
argglobal
if bufexists("src/style.css") | buffer src/style.css | else | edit src/style.css | endif
if &buftype ==# 'terminal'
  silent file src/style.css
endif
balt src/index.html
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 99 - ((6 * winheight(0) + 6) / 13)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 99
normal! 0
wincmd w
exe 'vert 1resize ' . ((&columns * 90 + 90) / 180)
exe '2resize ' . ((&lines * 22 + 19) / 38)
exe 'vert 2resize ' . ((&columns * 89 + 90) / 180)
exe '3resize ' . ((&lines * 13 + 19) / 38)
exe 'vert 3resize ' . ((&columns * 89 + 90) / 180)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0&& getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOFA
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
