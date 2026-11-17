import { useEffect, useMemo, useState } from 'react';

const commands = [
  { name: '!abraco', category: 'Interação' },
  { name: '!apostar', category: 'Jogos e sorteios' },
  { name: '!bonk', category: 'Interação' },
  { name: '!chatstats', category: 'Canal e informações' },
  { name: '!clip', category: 'Canal e informações' },
  { name: '!comandos', category: 'Canal e informações' },
  { name: '!competicao', category: 'Jogos e sorteios' },
  { name: '!corno', category: 'Interação' },
  { name: '!discord', category: 'Redes e comunidade' },
  { name: '!doar', category: 'Redes e comunidade' },
  { name: '!duo', category: 'Jogos e sorteios' },
  { name: '!elolol', category: 'Jogos e sorteios' },
  { name: '!elovava', category: 'Jogos e sorteios' },
  { name: '!emotes', category: 'Canal e informações' },
  { name: '!exitlag', category: 'Redes e comunidade' },
  { name: '!followage', category: 'Canal e informações' },
  { name: '!gado', category: 'Interação' },
  { name: '!genshin', category: 'Jogos e sorteios' },
  { name: '!idadedaconta', category: 'Canal e informações' },
  { name: '!leaderboard', category: 'Jogos e sorteios' },
  { name: '!leitada', category: 'Interação' },
  { name: '!lindo', category: 'Interação' },
  { name: '!loja', category: 'Jogos e sorteios' },
  { name: '!lurk', category: 'Interação' },
  { name: '!mentira', category: 'Interação' },
  { name: '!mira', category: 'Setup e jogos' },
  { name: '!mortes', category: 'Interação' },
  { name: '!mouse', category: 'Setup e jogos' },
  { name: '!musica', category: 'Música' },
  { name: '!musicaerrada', category: 'Música' },
  { name: '!pat', category: 'Interação' },
  { name: '!pc', category: 'Setup e jogos' },
  { name: '!penis', category: 'Interação' },
  { name: '!pix', category: 'Redes e comunidade' },
  { name: '!pontos', category: 'Jogos e sorteios' },
  { name: '!proxima', category: 'Música' },
  { name: '!qi', category: 'Interação' },
  { name: '!quando', category: 'Música' },
  { name: '!quote', category: 'Canal e informações' },
  { name: '!resgatar', category: 'Jogos e sorteios' },
  { name: '!sociais', category: 'Redes e comunidade' },
  { name: '!solicitarmúsica', category: 'Música' },
  { name: '!sorteio', category: 'Jogos e sorteios' },
  { name: '!ticket', category: 'Jogos e sorteios' },
  { name: '!tiktok', category: 'Redes e comunidade' },
  { name: '!tinder', category: 'Interação' },
  { name: '!top', category: 'Jogos e sorteios' },
  { name: '!troll', category: 'Interação' },
  { name: '!twitter', category: 'Redes e comunidade' },
  { name: '!uptime', category: 'Canal e informações' },
  { name: '!vanish', category: 'Interação' },
  { name: '!volume', category: 'Música' },
  { name: '!voteskip', category: 'Música' },
  { name: '!watchtime', category: 'Canal e informações' },
].map((command) => ({ ...command, permission: 'Everyone' }));

const categories = ['Todas', ...new Set(commands.map((command) => command.category))];

export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [permission, setPermission] = useState('all');
  const [host, setHost] = useState('');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    setHost(window.location.hostname);
  }, []);

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
    return commands.filter((command) => {
      const matchesQuery = !normalizedQuery || command.name.toLocaleLowerCase('pt-BR').includes(normalizedQuery);
      const matchesCategory = category === 'Todas' || command.category === category;
      const matchesPermission = permission === 'all' || command.permission === permission;
      return matchesQuery && matchesCategory && matchesPermission;
    });
  }, [query, category, permission]);

  async function copyCommand(name) {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(name);
      window.setTimeout(() => setCopied(''), 1400);
    } catch {
      setCopied('');
    }
  }

  const twitchSrc = host
    ? `https://player.twitch.tv/?channel=ivachuk&parent=${encodeURIComponent(host)}&autoplay=false&muted=true`
    : '';

  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <div className="shade" aria-hidden="true" />
      <header className="siteHeader">
        <a className="brand" href="#home" aria-label="Ivachuk, início"><span className="brandIcon">I</span><span>IVACHUK<span className="brandAccent">.TV</span></span></a>
        <nav><a href="#live">Ao vivo</a><a href="#commands">Comandos</a><a href="https://www.twitch.tv/ivachuk" target="_blank" rel="noreferrer">Twitch ↗</a></nav>
      </header>

      <main className="container" id="home">
        <section className="hero">
          <span className="eyebrow"><i /> COMUNIDADE IVACHUK</span>
          <h1>O chat tem <span>comando.</span></h1>
          <p>Encontre seu comando favorito e participe da live.</p>
          <a className="primaryButton" href="https://www.twitch.tv/ivachuk" target="_blank" rel="noreferrer">▶ <span>Abrir canal na Twitch</span></a>
        </section>

        <section className="liveSection" id="live" aria-label="Live do canal Ivachuk">
          <div className="sectionTitle"><div><span className="sectionKicker">TRANSMISSÃO</span><h2>Assista à live</h2></div><span className="liveBadge"><i /> CANAL IVACHUK</span></div>
          <div className="playerShell">
            {twitchSrc ? <iframe title="Player ao vivo do canal Ivachuk na Twitch" src={twitchSrc} allow="autoplay; fullscreen" allowFullScreen /> : <div className="playerPlaceholder">O player da Twitch aparecerá quando a página estiver hospedada.</div>}
          </div>
        </section>

        <section className="commandsSection" id="commands">
          <div className="sectionTitle commandsHeading"><div><span className="sectionKicker">EXPLORE O CHAT</span><h2>Comandos disponíveis</h2><p>Busque, filtre e copie os comandos para usar na live.</p></div><div className="totalPill"><span />{commands.length} comandos públicos</div></div>

          <div className="filters">
            <label className="searchBox"><span className="searchGlyph" aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por comando… ex.: !discord" aria-label="Buscar comando" /><kbd>⌘ K</kbd></label>
            <label className="permissionFilter"><span>Permissão</span><select value={permission} onChange={(event) => setPermission(event.target.value)}><option value="all">Todos os status</option><option value="Everyone">Liberados para todos</option></select></label>
          </div>

          <div className="categoryHeading"><span>CATEGORIAS</span><span>{filteredCommands.length} resultados</span></div>
          <div className="categoryFilters" role="group" aria-label="Filtrar por categoria">
            {categories.map((item) => {
              const amount = item === 'Todas' ? commands.length : commands.filter((command) => command.category === item).length;
              return <button type="button" key={item} className={`categoryChip ${category === item ? 'selected' : ''}`} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}<span>{amount}</span></button>;
            })}
          </div>

          {filteredCommands.length ? <div className="commandGrid">
            {filteredCommands.map((command) => <article className="commandCard" key={command.name}>
              <div className="cardTop"><span className="commandIcon">!</span><span className="permissionTag"><i /> Everyone</span></div>
              <h3>{command.name}</h3>
              <div className="cardBottom"><span className="categoryTag">{command.category}</span><button type="button" className="copyButton" onClick={() => copyCommand(command.name)} aria-label={`Copiar ${command.name}`}>{copied === command.name ? 'Copiado ✓' : 'Copiar ↗'}</button></div>
            </article>)}
          </div> : <div className="emptyState"><span>⌕</span><h3>Nenhum comando encontrado</h3><p>Tente outro termo ou selecione uma categoria diferente.</p><button type="button" onClick={() => { setQuery(''); setCategory('Todas'); setPermission('all'); }}>Limpar filtros</button></div>}
        </section>
      </main>

      <footer className="siteFooter"><span>Feito para a comunidade do Ivachuk <b>♥</b></span><a href="https://www.twitch.tv/ivachuk" target="_blank" rel="noreferrer">twitch.tv/ivachuk ↗</a></footer>

      <style jsx>{`
        :global(*){box-sizing:border-box} :global(html){scroll-behavior:smooth;scroll-padding-top:90px} :global(body){margin:0;background:#100b0e;color:#f7f3f4;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;min-height:100vh}
        .backdrop{position:fixed;inset:-22px;z-index:-2;background-image:url('https://i.imgur.com/t4lZTdc.png');background-size:cover;background-position:center 35%;filter:blur(15px) brightness(.31) saturate(.8);transform:scale(1.05)}.shade{position:fixed;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(13,8,11,.58),rgba(12,9,12,.84) 48%,#100b0e 100%),linear-gradient(90deg,rgba(8,5,8,.35),transparent 50%,rgba(8,5,8,.35));pointer-events:none}
        .siteHeader{height:74px;padding:0 clamp(18px,5vw,72px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #ffffff12;background:#100b0eb8;backdrop-filter:blur(16px);position:sticky;top:0;z-index:20}.brand{display:flex;align-items:center;gap:11px;color:#fff;text-decoration:none;font-size:15px;font-weight:850;letter-spacing:.08em}.brandIcon{height:35px;width:35px;border-radius:11px;background:linear-gradient(145deg,#fa3a39,#a90e18);display:grid;place-items:center;box-shadow:0 6px 24px #e7191644;font-size:17px}.brandAccent{color:#ff6965}.siteHeader nav{display:flex;gap:26px}.siteHeader nav a,.siteFooter a{font-size:13px;color:#d6cdd0;text-decoration:none;transition:color .18s}.siteHeader nav a:hover,.siteFooter a:hover{color:#ff6b66}
        .container{width:min(1120px,calc(100% - 40px));margin:auto}.hero{text-align:center;padding:70px 0 42px}.eyebrow,.sectionKicker{color:#ff9d98;font-size:10px;font-weight:850;letter-spacing:.16em}.eyebrow{display:inline-flex;align-items:center;gap:9px;padding:8px 13px;border:1px solid #ff5b5640;border-radius:999px;background:#a3191b38;backdrop-filter:blur(8px)}.eyebrow i,.liveBadge i{width:7px;height:7px;border-radius:50%;background:#ff3833;box-shadow:0 0 12px #ff2722;display:inline-block}.hero h1{font-size:clamp(42px,8vw,76px);letter-spacing:-.065em;line-height:1;margin:22px 0 14px;text-shadow:0 4px 30px #0008}.hero h1 span{color:#ff625d}.hero p{margin:0;color:#d2c7ca;font-size:16px}.primaryButton{display:inline-flex;align-items:center;gap:10px;margin-top:26px;padding:12px 18px;border:1px solid #ff6a6048;border-radius:11px;background:linear-gradient(135deg,#f1322e,#b4131d);color:white;text-decoration:none;font-size:13px;font-weight:800;box-shadow:0 8px 28px #d1151e38;transition:transform .18s,filter .18s}.primaryButton:hover{transform:translateY(-2px);filter:brightness(1.12)}
        .liveSection,.commandsSection{margin-top:22px}.sectionTitle{display:flex;align-items:end;justify-content:space-between;gap:18px;margin:0 0 15px}.sectionTitle h2{margin:5px 0 0;font-size:24px;letter-spacing:-.04em}.sectionTitle p{margin:6px 0 0;color:#bdb2b6;font-size:13px}.liveBadge,.totalPill{display:flex;align-items:center;gap:8px;padding:8px 11px;border:1px solid #ffffff18;border-radius:999px;background:#140f12a8;color:#e3d9dc;font-size:10px;font-weight:800;letter-spacing:.07em;white-space:nowrap;backdrop-filter:blur(10px)}.liveBadge i{width:6px;height:6px}.playerShell{width:min(760px,100%);margin:0 auto;aspect-ratio:16/9;overflow:hidden;border:1px solid #ff51452b;border-radius:16px;background:#080708;box-shadow:0 18px 70px #0008}.playerShell iframe{display:block;width:100%;height:100%;border:0}.playerPlaceholder{height:100%;display:grid;place-items:center;padding:20px;text-align:center;color:#aaa0a4;font-size:13px}
        .commandsSection{padding:42px 0 64px}.commandsHeading{margin-bottom:20px}.totalPill{font-size:11px;letter-spacing:0}.totalPill span{height:7px;width:7px;background:#ff4d48;border-radius:50%;box-shadow:0 0 10px #ff3935}.filters{display:flex;gap:12px;padding:12px;border:1px solid #ffffff18;border-radius:15px;background:#160f13c9;backdrop-filter:blur(14px);box-shadow:0 12px 36px #0003}.searchBox{height:46px;min-width:0;flex:1;display:flex;align-items:center;gap:10px;padding:0 13px;border:1px solid #ffffff17;border-radius:10px;background:#08070888}.searchGlyph{font-size:25px;line-height:1;color:#ff6a64}.searchBox input{min-width:0;flex:1;border:0;outline:0;background:transparent;color:#fff;font:inherit;font-size:13px}.searchBox input::placeholder{color:#877d81}.searchBox kbd{padding:4px 6px;border:1px solid #ffffff1c;border-radius:5px;color:#93898d;font-size:10px}.permissionFilter{display:flex;align-items:center;gap:9px;padding:0 10px;border:1px solid #ffffff17;border-radius:10px;background:#08070888}.permissionFilter span{color:#aa9fa3;font-size:10px;white-space:nowrap}.permissionFilter select{max-width:180px;border:0;outline:0;background:#151014;color:#eee;font:inherit;font-size:12px;padding:10px 4px}.categoryHeading{display:flex;justify-content:space-between;margin:23px 2px 10px;color:#a89da1;font-size:10px;font-weight:850;letter-spacing:.13em}.categoryHeading span+span{font-weight:500;letter-spacing:0}.categoryFilters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:17px}.categoryChip{display:inline-flex;align-items:center;gap:9px;padding:8px 11px;border:1px solid #ffffff19;border-radius:999px;background:#170f13a8;color:#c9bec2;font:inherit;font-size:11px;cursor:pointer;transition:all .16s}.categoryChip:hover{border-color:#f34a4866;color:#fff}.categoryChip.selected{border-color:#ff514d88;background:#b71b203c;color:#ffe5e3;box-shadow:0 0 18px #ee29221a}.categoryChip span{color:#94878c;font-size:10px}.categoryChip.selected span{color:#ffaaa5}
        .commandGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}.commandCard{min-width:0;padding:16px;border:1px solid #ffffff19;border-radius:14px;background:linear-gradient(145deg,#1d1418d9,#100d10e8);backdrop-filter:blur(12px);box-shadow:0 10px 32px #0002;transition:transform .18s,border-color .18s,box-shadow .18s}.commandCard:hover{transform:translateY(-3px);border-color:#ff4a4666;box-shadow:0 16px 38px #0005,0 0 20px #ec252315}.cardTop,.cardBottom{display:flex;align-items:center;justify-content:space-between;gap:8px}.commandIcon{width:28px;height:28px;display:grid;place-items:center;border:1px solid #fa49463d;border-radius:9px;background:#dc25221c;color:#ff817a;font-weight:900}.permissionTag{display:inline-flex;align-items:center;gap:6px;color:#d5c9cc;font-size:9px}.permissionTag i{width:6px;height:6px;border-radius:50%;background:#ff5752;box-shadow:0 0 8px #f33}.commandCard h3{margin:14px 0 17px;color:#fff;font-size:20px;letter-spacing:-.04em}.cardBottom{padding-top:11px;border-top:1px solid #ffffff10}.categoryTag{max-width:65%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#c0aeb3;font-size:10px}.copyButton{padding:6px 9px;border:1px solid #ff565033;border-radius:7px;background:#e1292419;color:#ffaaa5;font:inherit;font-size:10px;font-weight:750;cursor:pointer;white-space:nowrap;transition:all .15s}.copyButton:hover{border-color:#ff625d;color:#fff;background:#df2d2838}.emptyState{padding:48px 20px;text-align:center;border:1px dashed #ffffff24;border-radius:15px;background:#140e12aa}.emptyState>span{font-size:30px;color:#ff6a64}.emptyState h3{margin:8px 0;color:#fff}.emptyState p{margin:0 0 16px;color:#b5a9ae;font-size:13px}.emptyState button{border:1px solid #ff514d66;border-radius:8px;background:#b71b203c;color:#ffd2cf;padding:9px 13px;cursor:pointer}
        .siteFooter{display:flex;justify-content:space-between;gap:14px;padding:20px clamp(18px,5vw,72px);border-top:1px solid #ffffff12;background:#100b0e9c;color:#a99ea2;font-size:11px}.siteFooter b{color:#ff5752}
        @media(max-width:760px){.commandGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.container{width:min(100% - 32px,1120px)}.hero{padding-top:55px}}
        @media(max-width:520px){.siteHeader{height:64px;padding:0 16px}.brand{font-size:12px}.brandIcon{height:31px;width:31px}.siteHeader nav{gap:13px}.siteHeader nav a{font-size:11px}.container{width:calc(100% - 28px)}.hero{padding:45px 0 30px}.hero h1{font-size:clamp(39px,12vw,58px)}.hero p{font-size:14px}.sectionTitle{align-items:flex-start;flex-direction:column}.sectionTitle h2{font-size:21px}.liveBadge{align-self:flex-start}.playerShell{width:100%;border-radius:12px}.filters{flex-direction:column;padding:10px}.searchBox{flex:auto;width:100%}.permissionFilter{min-height:42px;justify-content:space-between}.permissionFilter select{flex:1;max-width:none;text-align:right}.categoryFilters{gap:7px}.categoryChip{padding:7px 9px;font-size:10px}.commandGrid{grid-template-columns:1fr 1fr;gap:9px}.commandCard{padding:12px}.commandCard h3{font-size:17px;margin:12px 0 14px}.categoryTag{font-size:9px}.copyButton{padding:6px 7px;font-size:9px}.totalPill{font-size:10px}.siteFooter{padding:18px 14px;font-size:10px}}
        @media(max-width:360px){.commandGrid{grid-template-columns:1fr}.siteHeader nav{gap:9px}.siteHeader nav a{font-size:10px}.searchBox kbd{display:none}}
      `}</style>
    </>
  );
}
