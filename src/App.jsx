import { useMemo, useState } from 'react'
import {
  Home, Users, MessageCircle, UserRound, Plus, Search, Bell, Settings,
  Menu, X, Heart, MessageSquare, Share2, MoreHorizontal, Image as ImageIcon,
  Camera, Send, Phone, Video, Paperclip, Smile, CheckCheck, ChevronRight,
  TrendingUp, Wallet, ArrowDownToLine, ArrowUpFromLine, History, Activity,
  ShoppingBag, ShoppingCart, Star, SlidersHorizontal, ShieldCheck, Lock,
  Globe2, Moon, Sun, HelpCircle, LogOut, Bookmark, Hash, Music2, Trophy,
  Bitcoin, Laptop, Headphones, Watch, Sparkles, ArrowLeft, Check, CirclePlus,
  UserPlus, Mail, Smartphone, Eye, EyeOff, Menu as MenuIcon
} from 'lucide-react'

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'communities', label: 'Communities', icon: Users },
  { id: 'chats', label: 'Chats', icon: MessageCircle },
  { id: 'trading', label: 'Trading', icon: TrendingUp },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const people = [
  { name: 'Sarah Chen', initials: 'SC', color: 'violet', online: true, message: 'The new designs look amazing 🔥', time: '9:15 AM', unread: 2 },
  { name: 'David King', initials: 'DK', color: 'blue', online: true, message: 'Okay, no problem.', time: '8:20 AM', unread: 0 },
  { name: 'Queen A.', initials: 'QA', color: 'rose', online: false, message: 'Good morning fam 😊', time: '7:45 AM', unread: 1 },
  { name: 'Jenny Bright', initials: 'JB', color: 'amber', online: true, message: 'Typing...', time: '7:30 AM', unread: 3 },
  { name: 'Silver Sonik', initials: 'SS', color: 'cyan', online: false, message: 'Nice track bro 🎵', time: 'Yesterday', unread: 0 },
]

const communities = [
  { name: 'Chat-X Tech Hub', members: '24.5K', category: 'Tech', description: 'Discuss technology, AI and the future.', icon: '⌘', color: 'blue', joined: true },
  { name: 'Music Vibes', members: '18.7K', category: 'Music', description: 'Share your music and discover new sounds.', icon: '♫', color: 'rose', joined: true },
  { name: 'Football Fans', members: '32.1K', category: 'Sports', description: 'All the latest football conversations.', icon: '⚽', color: 'green', joined: false },
  { name: 'Crypto Traders', members: '27.4K', category: 'Trading', description: 'Learn, share and trade together.', icon: '₿', color: 'amber', joined: false },
]

const products = [
  { name: 'iPhone 16 Pro', price: '$999', rating: '4.8', category: 'Phones', icon: Smartphone, color: 'blue', tag: 'Popular' },
  { name: 'MacBook Air M4', price: '$1,199', rating: '4.9', category: 'Laptops', icon: Laptop, color: 'silver', tag: 'New' },
  { name: 'Studio Headphones', price: '$299', rating: '4.7', category: 'Accessories', icon: Headphones, color: 'violet', tag: '' },
  { name: 'Smart Watch Ultra', price: '$799', rating: '4.8', category: 'Accessories', icon: Watch, color: 'green', tag: '' },
]

const feedPosts = [
  { author: 'Jenny Bright', initials: 'JB', color: 'amber', time: '2h ago', text: 'Good vibes only! 💙 Let’s keep pushing forward together. Every small step counts.', image: 'city', likes: '1.2K', comments: 245, shares: 128, liked: false },
  { author: 'David King', initials: 'DK', color: 'blue', time: '4h ago', text: 'A little reminder: stay focused on your goals. Your future self will thank you. 🚀', image: '', likes: '856', comments: 96, shares: 42, liked: true },
]

const Avatar = ({ initials = 'GS', size = 'md', color = 'blue', online = false }) => (
  <div className={'avatar avatar-' + size + ' avatar-' + color}>
    <span>{initials}</span>
    {online && <i className="online-dot" />}
  </div>
)

function Brand() {
  return <div className="brand-lockup"><div className="brand-mark"><span>C</span><b>✦</b><span>X</span></div><span className="brand-name">Chat-X</span></div>
}

function IconButton({ icon: Icon, label, onClick, className = '' }) {
  return <button className={'icon-button ' + className} aria-label={label} title={label} onClick={onClick}><Icon size={19} /></button>
}

function PageHeader({ title, subtitle, action }) {
  return <div className="page-header"><div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{action}</div>
}

function HomePage({ onNavigate }) {
  const [liked, setLiked] = useState({})
  const [postText, setPostText] = useState('')
  const [posted, setPosted] = useState([])
  const allPosts = [...posted, ...feedPosts]
  return <div className="page-grid">
    <main className="main-column">
      <PageHeader title="Good morning, Gideon" subtitle="Here's what's happening in your world." action={<IconButton icon={Search} label="Search" onClick={() => onNavigate('chats')} />} />
      <section className="composer panel">
        <div className="composer-top"><Avatar initials="GS" size="md" /><input value={postText} onChange={e => setPostText(e.target.value)} placeholder="What's on your mind?" onKeyDown={e => e.key === 'Enter' && postText.trim() && (setPosted([{ author: 'Gideon Saviour', initials: 'GS', color: 'cyan', time: 'Just now', text: postText, image: '', likes: '0', comments: 0, shares: 0 }, ...posted]), setPostText(''))} /></div>
        <div className="composer-bottom"><button className="subtle-action"><ImageIcon size={17} /> Photo</button><button className="subtle-action"><Video size={17} /> Video</button><button className="subtle-action"><Smile size={17} /> Feeling</button><button className="button button-primary button-small" onClick={() => { if (postText.trim()) { setPosted([{ author: 'Gideon Saviour', initials: 'GS', color: 'cyan', time: 'Just now', text: postText, image: '', likes: '0', comments: 0, shares: 0 }, ...posted]); setPostText('') } }}>Post</button></div>
      </section>
      <section className="stories-row"><div className="story story-create"><div className="story-ring"><Avatar initials="GS" size="lg" /></div><span><b>+</b> Add story</span></div>{people.slice(0, 4).map((p, i) => <button className="story" key={p.name}><div className={'story-ring ring-' + p.color}><Avatar initials={p.initials} size="lg" color={p.color} /></div><span>{p.name.split(' ')[0]}</span></button>)}</section>
      {allPosts.map((post, i) => <article className="post-card panel" key={post.author + post.time + i}>
        <div className="post-head"><Avatar initials={post.initials} color={post.color} /><div className="post-author"><b>{post.author} <span className="verified">✓</span></b><small>{post.time} · <Globe2 size={11} /></small></div><IconButton icon={MoreHorizontal} label="More post options" /></div>
        <p className="post-copy">{post.text}</p>
        {post.image === 'city' && <div className="post-image city-image"><div className="city-glow" /><div className="city-caption">CITY LIGHTS <span>AFTER HOURS</span></div></div>}
        <div className="post-stats"><span><span className="reaction-icons">💙 ❤️</span> {post.likes}</span><span>{post.comments} comments · {post.shares} shares</span></div>
        <div className="post-actions"><button className={liked[i] || post.liked ? 'is-liked' : ''} onClick={() => setLiked({ ...liked, [i]: !liked[i] })}><Heart size={18} /> Like</button><button onClick={() => onNavigate('chats')}><MessageSquare size={18} /> Comment</button><button onClick={() => navigator.clipboard?.writeText('Check out this post on Chat-X')}><Share2 size={18} /> Share</button></div>
      </article>)}
    </main>
    <aside className="right-column">
      <section className="panel side-panel"><div className="panel-heading"><h3>People you may know</h3><button onClick={() => onNavigate('communities')}>See all</button></div>{people.slice(0, 3).map(p => <div className="suggestion" key={p.name}><Avatar initials={p.initials} color={p.color} /><div className="suggestion-info"><b>{p.name}</b><small>Suggested for you</small></div><button className="round-add"><UserPlus size={15} /></button></div>)}</section>
      <section className="panel side-panel trend-panel"><div className="panel-heading"><h3>Trending communities</h3><button onClick={() => onNavigate('communities')}>Explore</button></div>{communities.slice(0, 3).map(c => <button className="trend-item" key={c.name} onClick={() => onNavigate('communities')}><span className={'community-mini ' + c.color}>{c.icon}</span><span><b>{c.name}</b><small>{c.members} members</small></span><ChevronRight size={16} /></button>)}</section>
      <div className="footer-note">About · Privacy · Terms · Help<br />© 2026 Chat-X. Connect. Share. Inspire.</div>
    </aside>
  </div>
}

function ChatsPage() {
  const [selected, setSelected] = useState(people[0])
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState([])
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const chats = useMemo(() => people.filter(p => p.name.toLowerCase().includes(query.toLowerCase())), [query])
  return <div className="chats-layout panel">
    <div className="chat-list-pane"><div className="chat-list-header"><h1>Chats</h1><IconButton icon={Plus} label="New chat" /></div><div className="search-box"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search chats..." /></div><div className="filter-pills">{['All', 'Unread', 'Groups'].map(f => <button className={filter === f ? 'active' : ''} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div><div className="chat-list">{chats.filter(p => filter !== 'Unread' || p.unread > 0).map(p => <button className={'chat-list-item ' + (selected.name === p.name ? 'selected' : '')} onClick={() => setSelected(p)} key={p.name}><Avatar initials={p.initials} color={p.color} online={p.online} /><span className="chat-list-copy"><b>{p.name}</b><small className={p.message === 'Typing...' ? 'typing' : ''}>{p.message}</small></span><span className="chat-meta"><small>{p.time}</small>{p.unread > 0 && <i>{p.unread}</i>}</span></button>)}</div></div>
    <div className="chat-conversation"><div className="conversation-head"><Avatar initials={selected.initials} color={selected.color} online={selected.online} /><div><b>{selected.name}</b><small>{selected.online ? 'Online now' : 'Last seen recently'}</small></div><div className="conversation-tools"><IconButton icon={Phone} label="Voice call" /><IconButton icon={Video} label="Video call" /><IconButton icon={MoreHorizontal} label="More" /></div></div><div className="encryption-note"><Lock size={12} /> Messages are end-to-end encrypted</div><div className="message-stream"><div className="date-divider"><span>Today</span></div><div className="bubble bubble-in">Hey! How is everything going?<small>9:02 AM</small></div><div className="bubble bubble-out">All good! Just working on the new Chat-X experience. <small>9:04 AM <CheckCheck size={12} /></small></div><div className="bubble bubble-in">That sounds exciting. Can't wait to see it! <small>9:06 AM</small></div><div className="bubble bubble-out">It's coming together nicely. The new look is much cleaner. 💙 <small>9:08 AM <CheckCheck size={12} /></small></div>{sent.map((m, i) => <div className="bubble bubble-out" key={i}>{m}<small>Just now <Check size={12} /></small></div>)}</div><div className="message-composer"><IconButton icon={Paperclip} label="Attach file" /><input value={message} onChange={e => setMessage(e.target.value)} placeholder="Write a message..." onKeyDown={e => e.key === 'Enter' && message.trim() && (setSent([...sent, message]), setMessage(''))} /><IconButton icon={Smile} label="Emoji" /><button className="send-button" onClick={() => { if (message.trim()) { setSent([...sent, message]); setMessage('') } }}><Send size={17} /></button></div></div>
  </div>
}

function CommunitiesPage() {
  const [category, setCategory] = useState('All')
  const [joined, setJoined] = useState(communities.map(c => c.joined))
  const filters = ['All', 'Tech', 'Music', 'Sports', 'Trading']
  return <div className="content-page"><PageHeader title="Communities" subtitle="Find your people. Share what you love." action={<button className="button button-primary"><CirclePlus size={17} /> Create community</button>} /><div className="filter-pills large">{filters.map(f => <button className={category === f ? 'active' : ''} onClick={() => setCategory(f)} key={f}>{f}</button>)}</div><div className="community-grid">{communities.filter(c => category === 'All' || c.category === category).map(c => <article className="community-card panel" key={c.name}><div className={'community-cover ' + c.color}><span>{c.icon}</span><small>{c.category}</small></div><div className="community-card-body"><h3>{c.name}</h3><small><Users size={13} /> {c.members} members</small><p>{c.description}</p><button className={joined[communities.indexOf(c)] ? 'button button-outline full' : 'button button-primary full'} onClick={() => setJoined(joined.map((v, i) => i === communities.indexOf(c) ? !v : v))}>{joined[communities.indexOf(c)] ? 'Joined' : 'Join community'}</button></div></article>)}</div></div>
}

function ProfilePage() {
  const [tab, setTab] = useState('Posts')
  return <div className="profile-page panel"><div className="profile-cover"><div className="cover-orbit orbit-one" /><div className="cover-orbit orbit-two" /><span className="cover-wordmark">CHAT-X COMMUNITY</span></div><div className="profile-main"><div className="profile-avatar-wrap"><Avatar initials="GS" size="xxl" color="cyan" /></div><button className="button button-outline edit-profile">Edit profile</button><div className="profile-name"><h1>Gideon Saviour <span className="verified">✓</span></h1><p>@gideon_saviour</p><div className="profile-bio">Dream Big · Work Hard · Achieve More</div></div><div className="profile-stats"><div><b>245</b><small>Posts</small></div><div><b>12.5K</b><small>Friends</small></div><div><b>48.7K</b><small>Likes</small></div></div><div className="profile-tabs">{['Posts', 'Friends', 'Likes', 'About'].map(t => <button className={tab === t ? 'active' : ''} onClick={() => setTab(t)} key={t}>{t}</button>)}</div>{tab === 'Posts' ? <div className="profile-photo-grid"><div className="profile-photo photo-one">CREATIVE<br />MINDSET</div><div className="profile-photo photo-two">KEEP<br />RISING</div><div className="profile-photo photo-three">NEW<br />HORIZONS</div></div> : <div className="profile-tab-content"><Sparkles size={24} /><b>{tab}</b><span>{tab === 'Friends' ? 'Your friends will appear here.' : tab === 'About' ? 'Building, creating and connecting.' : 'Your liked posts will appear here.'}</span></div>}</div></div>
}

function TradingPage() {
  const [period, setPeriod] = useState('1W')
  const [copied, setCopied] = useState(false)
  return <div className="content-page"><PageHeader title="Trading" subtitle="Your portfolio, your strategy, your growth." action={<button className="button button-outline"><History size={16} /> History</button>} /><div className="trading-summary"><div className="balance-card panel"><div className="balance-top"><span>Portfolio balance</span><span className="live-pill"><i /> Live demo</span></div><h2>$2,840.50</h2><div className="balance-change"><TrendingUp size={16} /> +12.5% <span>this week</span></div><div className="balance-chart"><svg viewBox="0 0 600 140" preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#20d9c0" stopOpacity=".32"/><stop offset="1" stopColor="#20d9c0" stopOpacity="0"/></linearGradient></defs><path d="M0 112 C35 106 42 80 75 91 S115 111 145 72 S190 82 220 60 S270 76 300 44 S350 67 380 39 S420 52 455 28 S510 49 545 16 S580 27 600 8 L600 140 L0 140Z" fill="url(#chartFill)"/><path d="M0 112 C35 106 42 80 75 91 S115 111 145 72 S190 82 220 60 S270 76 300 44 S350 67 380 39 S420 52 455 28 S510 49 545 16 S580 27 600 8" fill="none" stroke="#20d9c0" strokeWidth="3"/></svg></div><div className="chart-periods">{['1D', '1W', '1M', '3M', '1Y'].map(p => <button className={period === p ? 'active' : ''} onClick={() => setPeriod(p)} key={p}>{p}</button>)}</div></div><div className="trading-actions panel"><h3>Quick actions</h3><button><ArrowDownToLine size={18} /> Deposit</button><button><ArrowUpFromLine size={18} /> Withdraw</button><button><History size={18} /> History</button><button><Activity size={18} /> Signals</button></div></div><div className="section-heading"><h2>Copy trading</h2><span>Follow experienced traders</span></div><div className="trader-grid">{[{name:'ProTrader',followers:'12.5K',gain:'+48.6%',initials:'PT',color:'blue'},{name:'AlphaTrade',followers:'9.8K',gain:'+37.2%',initials:'AT',color:'green'},{name:'Nova Signals',followers:'7.2K',gain:'+29.4%',initials:'NS',color:'violet'}].map(t => <div className="trader-card panel" key={t.name}><Avatar initials={t.initials} color={t.color} size="lg" /><div className="trader-info"><b>{t.name}</b><small>{t.followers} followers</small></div><strong>{t.gain}</strong><button className="button button-primary button-small" onClick={() => setCopied(!copied)}>{copied ? 'Following' : 'Copy'}</button></div>)}</div><p className="risk-note"><ShieldCheck size={15} /> Demo interface only. Trading involves risk; returns are not guaranteed. Connect a supported broker to enable live trading.</p></div>
}

function MarketplacePage() {
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([])
  const categories = ['All', 'Phones', 'Laptops', 'Accessories']
  return <div className="content-page"><PageHeader title="Marketplace" subtitle="Discover products from trusted sellers." action={<button className="button button-outline"><ShoppingCart size={17} /> Cart <span className="cart-count">{cart.length}</span></button>} /><div className="market-tools"><div className="search-box market-search"><Search size={16} /><input placeholder="Search products..." /></div><button className="button button-outline"><SlidersHorizontal size={16} /> Filters</button></div><div className="filter-pills large">{categories.map(c => <button className={category === c ? 'active' : ''} onClick={() => setCategory(c)} key={c}>{c}</button>)}</div><div className="product-grid">{products.filter(p => category === 'All' || p.category === category).map(p => <article className="product-card panel" key={p.name}><div className={'product-art ' + p.color}>{p.tag && <span className="product-tag">{p.tag}</span>}<p.icon size={76} strokeWidth={1.1} /></div><div className="product-info"><small>{p.category}</small><h3>{p.name}</h3><div className="product-rating"><Star size={13} fill="currentColor" /> {p.rating} <span>· In stock</span></div><div className="product-buy"><b>{p.price}</b><button onClick={() => setCart([...cart, p.name])}><Plus size={15} /> Add</button></div></div></article>)}</div></div>
}

function NotificationsPage() {
  const items = [{icon:Heart,color:'rose',title:'Jenny Bright liked your post',detail:'Your post is getting noticed.',time:'2m ago'},{icon:MessageCircle,color:'blue',title:'David King commented',detail:'“Great post! Keep it up.”',time:'15m ago'},{icon:Users,color:'violet',title:'Sarah Love started following you',detail:'You have a new follower.',time:'1h ago'},{icon:Trophy,color:'amber',title:'You won the weekly challenge!',detail:'Your community badge is ready.',time:'3h ago'},{icon:UserPlus,color:'green',title:'Chat-X Group added a new member',detail:'There are 18 people in the group.',time:'Yesterday'}]
  return <div className="content-page narrow-page"><PageHeader title="Notifications" subtitle="Stay up to date with your activity." action={<IconButton icon={Settings} label="Notification settings" />} /><div className="notification-tabs"><button className="active">All <span>24</span></button><button>Likes</button><button>Comments</button><button>Mentions</button></div>{items.map((n, i) => <div className="notification-item panel" key={n.title}><div className={'notification-icon ' + n.color}><n.icon size={20} /></div><div className="notification-copy"><b>{n.title}</b><p>{n.detail}</p><small>{n.time}</small></div>{i === 0 && <i className="unread-dot" />}</div>)}</div>
}

function SettingsPage() {
  const [dark, setDark] = useState(true)
  const [privacy, setPrivacy] = useState(true)
  return <div className="content-page narrow-page"><PageHeader title="Settings" subtitle="Manage your account and preferences." /><div className="settings-profile panel"><Avatar initials="GS" color="cyan" size="lg" /><div><b>Gideon Saviour</b><small>@gideon_saviour</small></div><ChevronRight size={18} /></div><div className="settings-group panel"><h3>Account</h3><button><UserRound /> Account information <ChevronRight /></button><button><Lock /> Privacy & security <ChevronRight /></button><button><Bell /> Notifications <ChevronRight /></button></div><div className="settings-group panel"><h3>Preferences</h3><div className="settings-row"><span><Moon /> Dark mode</span><button className={'toggle ' + (dark ? 'on' : '')} onClick={() => setDark(!dark)}><i /></button></div><div className="settings-row"><span><ShieldCheck /> Profile privacy</span><button className={'toggle ' + (privacy ? 'on' : '')} onClick={() => setPrivacy(!privacy)}><i /></button></div><button><Globe2 /> Language <span className="setting-value">English</span><ChevronRight /></button></div><div className="settings-group panel"><h3>Support</h3><button><HelpCircle /> Help & support <ChevronRight /></button><button><ShieldCheck /> About Chat-X <ChevronRight /></button><button className="logout"><LogOut /> Log out</button></div></div>
}

function App() {
  const [active, setActive] = useState('home')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pageTitles = { home: 'Home', chats: 'Chats', communities: 'Communities', trading: 'Trading', marketplace: 'Marketplace', notifications: 'Notifications', profile: 'Profile', settings: 'Settings' }
  const navigate = id => { setActive(id); setMobileMenu(false); window.scrollTo?.(0, 0) }
  const renderPage = () => {
    switch (active) {
      case 'home': return <HomePage onNavigate={navigate} />
      case 'chats': return <ChatsPage />
      case 'communities': return <CommunitiesPage />
      case 'trading': return <TradingPage />
      case 'marketplace': return <MarketplacePage />
      case 'notifications': return <NotificationsPage />
      case 'profile': return <ProfilePage />
      case 'settings': return <SettingsPage />
      default: return <HomePage onNavigate={navigate} />
    }
  }
  return <div className="app-shell">
    <aside className={'sidebar ' + (mobileMenu ? 'sidebar-open' : '')}>
      <div className="sidebar-brand"><Brand /><button className="mobile-close" onClick={() => setMobileMenu(false)}><X size={20} /></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="side-nav">{navItems.map(item => <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => navigate(item.id)}><item.icon size={19} /><span>{item.label}</span>{item.id === 'notifications' && <i className="nav-count">2</i>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-upgrade"><Sparkles size={17} /><b>Make more happen</b><p>Discover everything Chat-X can do.</p><button onClick={() => navigate('marketplace')}>Explore features <ChevronRight size={14} /></button></div><button className="sidebar-user" onClick={() => navigate('profile')}><Avatar initials="GS" size="sm" color="cyan" /><span><b>Gideon Saviour</b><small>Personal account</small></span><MoreHorizontal size={18} /></button></div>
    </aside>
    {mobileMenu && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setMobileMenu(false)} />}
    <div className="app-main"><header className="topbar"><div className="topbar-left"><button className="mobile-menu" onClick={() => setMobileMenu(true)}><Menu size={21} /></button><span className="mobile-brand"><Brand /></span><div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><b>{pageTitles[active]}</b></div></div><div className="topbar-actions"><button className="top-search" onClick={() => setSearchOpen(!searchOpen)}><Search size={16} /><span>Search anything...</span><kbd>⌘ K</kbd></button><IconButton icon={Bell} label="Notifications" onClick={() => navigate('notifications')} /><Avatar initials="GS" size="sm" color="cyan" /></div></header>
      {searchOpen && <div className="global-search panel"><Search size={18} /><input autoFocus placeholder="Search Chat-X..." onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)} /><button onClick={() => setSearchOpen(false)}><X size={17} /></button></div>}
      <div className="page-content">{renderPage()}</div>
    </div>
    <nav className="mobile-bottom-nav">{[{id:'home',label:'Home',icon:Home},{id:'communities',label:'Communities',icon:Users},{id:'create',label:'Create',icon:Plus},{id:'marketplace',label:'Feed',icon:MessageSquare},{id:'profile',label:'Profile',icon:UserRound}].map(item => <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => item.id === 'create' ? setShowCreate(true) : navigate(item.id)}><span className={item.id === 'create' ? 'mobile-create' : ''}><item.icon size={item.id === 'create' ? 23 : 19} /></span><small>{item.label}</small></button>)}</nav>
    {showCreate && <div className="modal-backdrop" onClick={() => setShowCreate(false)}><div className="create-modal panel" onClick={e => e.stopPropagation()}><div className="modal-heading"><h2>Create something</h2><button onClick={() => setShowCreate(false)}><X size={19} /></button></div><button onClick={() => { setShowCreate(false); navigate('home') }}><MessageSquare /> Create a post <ChevronRight /></button><button onClick={() => { setShowCreate(false); navigate('communities') }}><Users /> Create a community <ChevronRight /></button><button onClick={() => { setShowCreate(false); navigate('chats') }}><MessageCircle /> Start a conversation <ChevronRight /></button></div></div>}
  </div>
}

export default App
