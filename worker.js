const commands = [
  { name: '!abraco', category: 'Interação', permission: 'Everyone' },
  { name: '!apostar', category: 'Jogos e sorteios', permission: 'Everyone' },
  { name: '!bonk', category: 'Interação', permission: 'Everyone' },
  { name: '!chatstats', category: 'Canal e informações', permission: 'Everyone' },
  { name: '!clip', category: 'Canal e informações', permission: 'Everyone' },
  { name: '!comandos', category: 'Canal e informações', permission: 'Everyone' },
  { name: '!competicao', category: 'Jogos e sorteios', permission: 'Everyone' },
  { name: '!corno', category: 'Interação', permission: 'Everyone' },
  { name: '!discord', category: 'Redes e comunidade', permission: 'Everyone' },
  { name: '!doar', category: 'Redes e comunidade', permission: 'Everyone' },
  { name: '!duo', category: 'Jogos e sorteios', permission: 'Everyone' },
  { name: '!elolol', category: 'Jogos e sorteios', permission: 'Everyone' },
  { name: '!elovava', category: 'Jogos e sorteios', permission: 'Everyone' },
  { name: '!emotes', category: 'Canal e informações', permission: 'Everyone' },
  { name: '!exitlag', category: 'Redes e comunidade', permission: 'Everyone' },
  { name: '!followage', category: 'Canal e informações', permission: 'Everyone' },
  { name: '!gado', category: 'Interação', permission: 'Everyone' },
  { name: '!genshin', category: 'Jogos e sorteios', permission: 'Everyone' },
  { name: '!idadedaconta', category: 'Canal e informações', permission: 'Everyone' },
  { name: '!leaderboard', category: 'Jogos e sorteios', permission: 'Everyone' },
  { name: '!leitada', category: 'Interação', permission: 'Everyone' },
  { name: '!lindo', category: 'Interação', permission: 'Everyone' },
  { name: '!loja', category: 'Jogos e sorteios', permission: 'Everyone' },
  { name: '!lurk', category: 'Interação', permission: 'Everyone' },
  { name: '!mentira', category: 'Interação', permission: 'Everyone' },
  { name: '!mira', category: 'Setup e jogos', permission: 'Everyone' },
  { name: '!mortes', category: 'Interação', permission: 'Everyone' },
  { name: '!mouse', category: 'Setup e jogos', permission: 'Everyone' },
  { name: '!musica', category: 'Música', permission: 'Everyone' },
  { name: '!musicaerrada', category: 'Música', permission: 'Everyone' },
  { name: '!pat', category: 'Interação', permission: 'Everyone' },
  { name: '!pc', category: 'Setup e jogos', permission: 'Everyone' },
  { name: '!penis', category: 'Interação', permission: 'Everyone' },
  { name: '!pix', category: 'Redes e comunidade', permission: 'Everyone' },
  { name: '!pontos', category: 'Jogos e sorteios', permission: 'Everyone' },
  { name: '!proxima', category: 'Música', permission: 'Everyone' },
  { name: '!qi', category: 'Interação', permission: 'Everyone' },
  { name: '!quando', category: 'Música', permission: 'Everyone' },
  { name: '!quote', category: 'Canal e informações', permission: 'Everyone' },
  { name: '!resgatar', category: 'Jogos e sorteios', permission: 'Everyone' },
  { name: '!sociais', category: 'Redes e comunidade', permission: 'Everyone' },
  { name: '!solicitarmúsica', category: 'Música', permission: 'Everyone' },
  { name: '!sorteio', category: 'Jogos e sorteios', permission: 'Everyone' },
  { name: '!ticket', category: 'Jogos e sorteios', permission: 'Everyone' },
  { name: '!tiktok', category: 'Redes e comunidade', permission: 'Everyone' },
  { name: '!tinder', category: 'Interação', permission: 'Everyone' },
  { name: '!top', category: 'Jogos e sorteios', permission: 'Everyone' },
  { name: '!troll', category: 'Interação', permission: 'Everyone' },
  { name: '!twitter', category: 'Redes e comunidade', permission: 'Everyone' },
  { name: '!uptime', category: 'Canal e informações', permission: 'Everyone' },
  { name: '!vanish', category: 'Interação', permission: 'Everyone' },
  { name: '!volume', category: 'Música', permission: 'Everyone' },
  { name: '!voteskip', category: 'Música', permission: 'Everyone' },
  { name: '!watchtime', category: 'Canal e informações', permission: 'Everyone' }
];

const list = document.getElementById('command-list');
const search = document.getElementById('filter');
const count = document.getElementById('count');
const categoryList = document.getElementById('category-list');
const statusFilter = document.getElementById('status-filter');
const availableCount = document.getElementById('available-count');
const playerCard = document.getElementById('player-card');
const minimizeButton = document.getElementById('minimize-player');

let selectedCategory = 'Todas';
const categories = ['Todas', ...new Set(commands.map((command) => command.category))];

function renderCategoryFilters() {
  categoryList.replaceChildren();

  categories.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'category-chip';
    button.setAttribute('aria-pressed', String(selectedCategory === category));

    const label = document.createElement('span');
    label.textContent = category;

    const amount = document.createElement('span');
    amount.className = 'chip-count';
    amount.textContent = category === 'Todas' ? commands.length : commands.filter((command) => command.category === category).length;

    button.append(label, amount);
    button.addEventListener('click', () => {
      selectedCategory = category;
      renderCategoryFilters();
      renderCommands();
    });

    categoryList.append(button);
  });
}

function renderCommands() {
  const query = search.value.trim().toLocaleLowerCase('pt-BR');
  const permission = statusFilter.value;
  const found = commands.filter((command) => {
    const matchesText = !query || command.name.toLocaleLowerCase('pt-BR').includes(query);
    const matchesCategory = selectedCategory === 'Todas' || command.category === selectedCategory;
    const matchesPermission = permission === 'all' || command.permission === permission;
    return matchesText && matchesCategory && matchesPermission;
  });

  count.innerHTML = `Exibindo <strong>${found.length}</strong> de <strong>${commands.length}</strong> comandos`;
  availableCount.textContent = `${commands.length} comandos liberados`;
  list.replaceChildren();

  if (!found.length) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.innerHTML = '<div class="empty-icon">⌕</div><strong>Nenhum comando encontrado</strong><br>Tente outro termo ou escolha uma categoria diferente.';
    list.append(empty);
    return;
  }

  found.forEach((command) => {
    const card = document.createElement('article');
    card.className = 'command-card';

    const info = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'command-name';
    name.textContent = command.name;

    const meta = document.createElement('div');
    meta.className = 'command-meta';

    const categoryTag = document.createElement('span');
    categoryTag.className = 'category-tag';
    categoryTag.textContent = command.category;

    const permissionTag = document.createElement('span');
    permissionTag.className = 'permission-tag';
    permissionTag.textContent = command.permission;

    meta.append(categoryTag, permissionTag);
    info.append(name, meta);

    const button = document.createElement('button');
    button.className = 'copy';
    button.type = 'button';
    button.textContent = 'Copiar';
    button.setAttribute('aria-label', `Copiar ${command.name}`);
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(command.name);
        button.textContent = 'Copiado!';
      } catch {
        button.textContent = 'Selecione: ' + command.name;
      }
      setTimeout(() => { button.textContent = 'Copiar'; }, 1400);
    });

    card.append(info, button);
    list.append(card);
  });
}

search.addEventListener('input', renderCommands);
statusFilter.addEventListener('change', renderCommands);
renderCategoryFilters();
renderCommands();

minimizeButton.addEventListener('click', () => {
  const minimized = playerCard.classList.toggle('is-minimized');
  minimizeButton.textContent = minimized ? '+' : '−';
  minimizeButton.setAttribute('aria-expanded', String(!minimized));
  minimizeButton.setAttribute('aria-label', minimized ? 'Expandir player' : 'Minimizar player');
});

const host = location.hostname;
if (host && host !== 'localhost' && host !== '127.0.0.1') {
  const iframe = document.createElement('iframe');
  iframe.src = `https://player.twitch.tv/?channel=ivachuk&parent=${encodeURIComponent(host)}&autoplay=false&muted=true`;
  iframe.title = 'Player ao vivo do canal Ivachuk na Twitch';
  iframe.allow = 'autoplay; fullscreen';
  iframe.allowFullscreen = true;
  document.getElementById('player').replaceChildren(iframe);
} else {
  const player = document.getElementById('player');
  player.querySelector('strong').textContent = 'Player pronto para hospedagem';
  player.querySelector('.player-fallback > div').childNodes[1].textContent = 'Publique este arquivo em um domínio para carregar a embed. ';
}
