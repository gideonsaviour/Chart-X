import { useEffect, useMemo, useRef, useState } from 'react'
import { DemoScreen, useDemoState, demoPosts, demoUsers, canAccess } from './socialCore.jsx'
import { referencePortrait, referenceCity, referenceJenny, referenceSarah, referenceDavid, referenceQueen, referencePhone, referenceMac, referenceHeadphones, referenceWatch } from './designAssets.js'
import {
  Home, Users, MessageCircle, UserRound, Plus, Search, Bell, Settings, X,
  Heart, MessageSquare, Share2, MoreHorizontal, Image as ImageIcon, Camera,
  Send, Phone, Video, Paperclip, Smile, CheckCheck, ChevronRight, TrendingUp,
  Wallet, ArrowDownToLine, ArrowUpFromLine, History, Activity, ShoppingBag,
  ShoppingCart, Star, ShieldCheck, Lock, Globe2, Moon, Sun, LogOut, Bookmark,
  Music2, Trophy, Bitcoin, Laptop, Headphones, Watch, Sparkles, ArrowLeft,
  Check, CirclePlus, UserPlus, Mail, Smartphone, Eye, EyeOff, Menu, Compass,
  Zap, Copy, Edit3, MessageCircleMore, Shield, HelpCircle, ExternalLink
} from 'lucide-react'

const faces = {
  gideon: referencePortrait,
  sarah: referenceSarah,
  jenny: referenceJenny,
  david: referenceDavid,
  queen: referenceQueen,
  daniel: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=240&h=240&fit=crop&crop=faces',
  silver: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1?w=240&h=240&fit=crop&crop=faces',
  family: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=240&h=240&fit=crop',
  friends: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=240&h=240&fit=crop'
}
const people = [
  {id:'jenny', name:'Jenny Bright', text:'Typing...', time:'9:15 AM', unread:3, online:true},
  {id:'group', name:'Chat-X Group', text:'Welcome to the group!', time:'8:50 AM', unread:12, group:true},
  {id:'david', name:'David King', text:'Okay, no problem.', time:'8:20 AM', unread:0},
  {id:'family', name:'Family Circle', text:'Good morning fam 😊', time:'7:45 AM', unread:1, group:true},
  {id:'silver', name:'Silver Sonik', text:'Nice track bro 🎵', time:'Yesterday', unread:0, online:true},
  {id:'signals', name:'Trading Signals', text:'📈 Market is up today!', time:'Yesterday', unread:0, group:true},
  {id:'friends', name:'Friends Forever', text:'Let’s hang out! 😊', time:'Mon', unread:0, group:true}
]
const initialPosts = [
  {id:1, name:'Jenny Bright', avatar:'jenny', time:'2h ago', text:'Good vibes only! 💙\nLet’s keep pushing forward together.', picture:true, likes:1200, comments:245, shares:128}
]
const groups = [
  {name:'Chat-X Tech Hub', about:'Discuss tech, AI and the future', count:'24.5K', emoji:'⌘', tone:'blue'},
  {name:'Music Vibes', about:'Share your sound with the world', count:'18.7K', emoji:'♫', tone:'pink'},
  {name:'Football Fans', about:'Matchday, news and football talk', count:'32.1K', emoji:'⚽', tone:'green'},
  {name:'Crypto Traders', about:'Learn and trade together', count:'27.4K', emoji:'₿', tone:'gold'}
]
const products = [
  {name:'iPhone 16 Pro', price:'$999', category:'Phones', image:referencePhone, rating:'4.8'},
  {name:'MacBook Air', price:'$1,199', category:'Laptops', image:referenceMac, rating:'4.9'},
  {name:'Studio Headphones', price:'$299', category:'Accessories', image:referenceHeadphones, rating:'4.7'},
  {name:'Smart Watch', price:'$799', category:'Accessories', image:referenceWatch, rating:'4.8'}
]
function Brand({large=false}) { return <div className={'brand '+(large?'brand-large':'')}><span className="brand-symbol" aria-label="CX logo"><svg viewBox="0 0 190 130" aria-hidden="true"><defs><linearGradient id="chromeLogo" x1="0" y1="0" x2="0.93" y2="1"><stop stopColor="#f0f9ff"/><stop offset=".28" stopColor="#80cdff"/><stop offset=".57" stopColor="#126fe5"/><stop offset=".78" stopColor="#c5d0e4"/><stop offset="1" stopColor="#0673fa"/></linearGradient><linearGradient id="chromeX" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e7f7ff"/><stop offset=".45" stopColor="#83bafb"/><stop offset=".7" stopColor="#0e66db"/><stop offset="1" stopColor="#cdd8ed"/></linearGradient></defs><ellipse cx="93" cy="70" rx="98" ry="20" transform="rotate(-25 93 70)" fill="none" stroke="#0a82fa" strokeWidth="6"/><path d="M100 22C70 18 38 39 31 68c-9 31 16 49 44 43l14-18C67 99 51 89 55 72c4-19 21-33 41-33h23Z" fill="url(#chromeLogo)" stroke="#7fd8ff" strokeWidth="1.5"/><path d="M106 25h35l-31 34 36 49h-35L92 81l-25 27H35l41-47-17-23h32l8 12Z" fill="url(#chromeX)" stroke="#80b5f3" strokeWidth="1"/><path d="M102 68 170 16l-44 68-13-5Z" fill="#edf6ff" opacity=".8"/></svg></span>{!large&&<span className="brand-word">Chat-<em>X</em></span>}</div> }
function Avatar({id='gideon',name='',size='md',badge=false}) { return <span className={'avatar avatar-'+size+(badge?' has-badge':'')+(id==='group'||id==='family'||id==='signals'||id==='friends'?' group-avatar':'')}>{id==='group'?<Users size={size==='lg'?26:22} fill="currentColor"/>:id==='signals'?<TrendingUp size={22}/>:<img src={faces[id]||faces.gideon} alt={name||'Profile'} onError={e=>{e.currentTarget.style.display='none'}} />}{badge&&<span className="verified"><Check size={10} strokeWidth={4}/></span>}</span> }
function TabButton({active,onClick,icon:Icon,children}) {return <button type="button" className={'tab-button '+(active?'active':'')} onClick={onClick}>{Icon&&<Icon size={18}/>}<span>{children}</span></button>}
function PageTop({title,right,back}) {return <><header className="screen-top">{back&&<button className="icon-btn" onClick={back} aria-label="Back"><ArrowLeft size={21}/></button>}<strong>{title}</strong><div className="screen-top-right">{right}</div></header></>}
function SignIn({onEnter}) {
 const [mode,setMode]=useState('create')
 const [fullName,setFullName]=useState('')
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
 const [showPassword,setShowPassword]=useState(false)
 const [status,setStatus]=useState('')
 const [imageFailed,setImageFailed]=useState(false)
 const submit=e=>{
  e.preventDefault()
  if(mode==='create'&&!fullName.trim()){setStatus('Enter your full name.');return}
  if(!email.trim()||!password){setStatus('Enter your email and password.');return}
  if(password.length<8){setStatus('Use at least 8 characters for your password.');return}
  // Existing application is a UI preview, not a registered-account service.
  // Enter the demo app without claiming that an actual account was created.
  onEnter()
 }
 const social=provider=>setStatus(provider+' login: Feature coming soon.')
 return <section className="signup-page">
  {imageFailed&&<div className="signup-art-error">Sign-up artwork could not be loaded.</div>}
  <div className="signup-artboard">
   <img className="signup-artwork" src="/assets/Chat-X%20Futuristic%20Sign-Up%20Screen.png" alt="" aria-hidden="true" onError={()=>setImageFailed(true)} />
   {mode==='create'&&<form className="signup-hitarea" onSubmit={submit} autoComplete="on">
    {mode==='create'&&<label className="signup-input signup-full-name"><span className="sr-only">Full Name</span><input type="text" name="name" aria-label="Full Name" placeholder=" " autoComplete="name" required value={fullName} onChange={e=>setFullName(e.target.value)} /></label>}
    <label className="signup-input signup-email"><span className="sr-only">Email Address</span><input type="email" name="email" aria-label="Email Address" placeholder=" " autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} /></label>
    <label className="signup-input signup-password"><span className="sr-only">Password</span><input type={showPassword?'text':'password'} name="password" aria-label="Password" placeholder=" " autoComplete={mode==='create'?'new-password':'current-password'} minLength={8} required value={password} onChange={e=>setPassword(e.target.value)} /></label>
    <button type="button" className="signup-eye" onClick={()=>setShowPassword(x=>!x)} aria-label={showPassword?'Hide password':'Show password'} aria-pressed={showPassword}></button>
    <button className="signup-submit" type="submit" aria-label="Sign Up - open Chat-X preview" />
   </form>}
   <div className="signup-social">
    <button className="signup-social-google" aria-label="Continue with Google" onClick={()=>social('Google')}></button>
    <button className="signup-social-facebook" aria-label="Continue with Facebook" onClick={()=>social('Facebook')}></button>
    <button className="signup-social-apple" aria-label="Continue with Apple" onClick={()=>social('Apple')}></button>
   </div>
   {mode==='create'&&<button className="signup-signin-link" type="button" onClick={()=>{setMode('signin');setStatus('');setShowPassword(false)}} aria-label="Sign In" />}
   {mode==='signin'&&<div className="signup-login-overlay">
    <div className="signup-login-top"><h2>Welcome Back</h2><p>Sign in to your Chat-X account</p></div>
    <form className="signup-login-form" onSubmit={submit} autoComplete="on">
     <label>Email Address<input type="email" name="email" required autoComplete="email" placeholder="Enter email address" value={email} onChange={e=>setEmail(e.target.value)}/></label>
     <label>Password<span className="signup-login-password"><input type={showPassword?'text':'password'} name="password" required minLength={8} autoComplete="current-password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)}/><button type="button" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword?'Hide password':'Show password'}>{showPassword?<EyeOff size={20}/>:<Eye size={20}/>}</button></span></label>
     <button className="signup-login-submit" type="submit">Sign In</button>
    </form>
    <p className="signup-login-disclaimer">Demo preview: signing in opens the app without verifying an account. Real authentication is coming soon.</p>
    <p className="signup-login-or">or continue with</p>
    <div className="signup-login-social">
     <button type="button" onClick={()=>social('Google')} aria-label="Google login coming soon">Google</button>
     <button type="button" onClick={()=>social('Facebook')} aria-label="Facebook login coming soon">Facebook</button>
     <button type="button" onClick={()=>social('Apple')} aria-label="Apple login coming soon">Apple</button>
    </div>
    <button className="signup-login-back" type="button" onClick={()=>{setMode('create');setStatus('')}}>Don't have an account? <strong>Sign Up</strong></button>
   </div>}}
   {status&&<div className="signup-message" role="status">{status}<button onClick={()=>setStatus('')} aria-label="Dismiss message">×</button></div>}
  </div>
 </section>
}
function Welcome({next}) {
 const [imageSettled,setImageSettled]=useState(false)
 const [imageMissing,setImageMissing]=useState(false)
 useEffect(()=>{
  if(!imageSettled)return
  // Draw the trading sign, hold the completed artwork, and enter after seven seconds.
  const id=window.setTimeout(next,7000)
  return ()=>window.clearTimeout(id)
 },[imageSettled,next])
 return <div className="exact-splash-screen">
  <div className="exact-splash-tap" aria-label="Chat-X loading screen" role="status">
   {!imageMissing&&<div className="exact-splash-art">
    <img src="/assets/Chat-X%20Neon%20Skyline%20Splash%20Screen-1.png" alt="" draggable="false" onLoad={()=>setImageSettled(true)} onError={()=>{setImageMissing(true);setImageSettled(true)}}/>
    <span className={'exact-splash-loader'+(imageSettled?' is-running':'')} aria-label="Loading">
     <svg className="exact-splash-trading-draw" viewBox="120 96 1285 770" aria-hidden="true" focusable="false">
      <path className="exact-splash-trading-stroke" pathLength="100" d="M157 836 L335 655 L415 707 L581 494 L716 584 L894 342 L1028 440 L1261 219 L1375 128"/>
      <path className="exact-splash-trading-tip" pathLength="100" d="M1169 194 L1375 128 L1327 329"/>
     </svg>
     <img className="exact-splash-trading-complete" src="/assets/chatx-loading-sign.svg" alt="" aria-hidden="true"/>
    </span>
   </div>}
   {imageMissing&&<span className="splash-missing">Splash artwork has not been uploaded yet.<small>Opening Chat-X in seven seconds.</small></span>}
  </div>
 </div>
}
function Post({post,liked,onLike,onComment,onShare}) {
 return <article className="post-card"><div className="post-person"><Avatar id={post.avatar} size="md"/><div className="person-details"><div><b>{post.name}</b><span className="blue-check"><Check size={9}/></span></div><small>{post.time} · <Globe2 size={11}/></small></div><button className="icon-btn post-more" aria-label="More post options" onClick={()=>onShare('Post by '+post.name)}><MoreHorizontal size={20}/></button></div><p className="post-text">{post.text}</p>{post.picture&&<div className="post-photo"><img src={referenceCity} alt="City skyline at night"/><div className="photo-caption">CITY LIGHTS<small>AFTER HOURS</small></div></div>}<div className="post-counts"><span><span className="reactions">💙❤️</span> {post.likes+(liked?1:0)>=1000?((post.likes+(liked?1:0))/1000).toFixed(1)+'K':post.likes+(liked?1:0)}</span><span>{post.comments} comments · {post.shares} shares</span></div><div className="post-actions"><button className={liked?'post-liked':''} onClick={onLike}><Heart size={17} fill={liked?'currentColor':'none'}/> Like</button><button onClick={onComment}><MessageSquare size={17}/> Comment</button><button onClick={()=>onShare(post.text)}><Share2 size={17}/> Share</button></div></article>
}
function SponsorCard({navigate}) {return <button className="sponsor-card" onClick={()=>navigate('trading')}><div className="sponsor-heading"><span className="sponsor-logo"><Brand large/></span><span><b>Chat-X Official</b><small>Sponsored · Connect. Trade and Earn more!</small></span><MoreHorizontal size={18}/></div><div className="sponsor-content"><div><h3>Start Copy Trading<br/>Today</h3><p>Discover the future of trading.</p></div><svg viewBox="0 0 165 100" aria-hidden="true"><polyline points="0,87 20,71 39,78 57,48 79,59 98,34 120,42 148,8" fill="none" stroke="#17efcf" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/><path d="M136 8 L149 7 L147 23" fill="none" stroke="#17efcf" strokeWidth="5"/><circle cx="138" cy="73" r="25" fill="#ffb32c" stroke="#ffe88f" strokeWidth="4"/><text x="138" y="85" fontSize="34" textAnchor="middle" fill="#fff">₿</text></svg></div></button>}
/* The original dashboard artwork is rendered unchanged. Transparent interactive
   hotspots scale with the image's source coordinates (941 × 1672). */
function HomeArtwork({navigate,notify,create}) {
 const [liked,setLiked]=useState(false)
 const [draft,setDraft]=useState('')
 const [showPost,setShowPost]=useState(false)
 const [showComment,setShowComment]=useState(false)
 const [comment,setComment]=useState('')
 const [newPosts,setNewPosts]=useState([])
 const [feedLiked,setFeedLiked]=useState({})
 const [feedComment,setFeedComment]=useState(null)
 const tap=(label,cls,fn)=> <button type="button" className={'home-art-hit '+cls} aria-label={label} onClick={fn}/>
 const story=name=>notify(name==='Add Story'?'Story uploads need storage integration':name+' story preview is not yet connected to media storage')
 const share=async()=>{try{await navigator.clipboard.writeText(window.location.href);notify('Chat-X page link copied')}catch{notify('Sharing is unavailable in this browser')}}
 return <div className="home-art-page">
  <div className="home-art-viewport"><div className="home-art-canvas">
   <img className="home-art-img" src="/assets/CX%20Social%20Dashboard%20UI.png" alt="Chat-X home dashboard with stories, a post, trading, marketplace, communities and navigation"/>
   {tap('Search Chat-X','home-art-search',()=>navigate('search'))}
   {tap('Notifications','home-art-alerts',()=>navigate('notifications'))}
   {tap('Open profile','home-art-avatar',()=>navigate('profile'))}
   {tap('Write a post','home-art-compose',()=>setShowPost(true))}
   {tap('Add a photo','home-art-camera',()=>notify('Photo uploads require storage integration'))}
   {['Add Story','Sarah','David','Queen','Silver'].map((name,i)=>tap('View '+name,'home-art-story home-art-story-'+i,()=>story(name)))}
   {tap('Post options','home-art-more',()=>notify('Post options are coming soon'))}
   {tap(liked?'Unlike Jenny Bright post':'Like Jenny Bright post','home-art-like',()=>{setLiked(v=>!v);notify(liked?'Like removed':'Post liked')})}
   {tap('Comment on Jenny Bright post','home-art-comment',()=>setShowComment(true))}
   {tap('Share Jenny Bright post','home-art-share',share)}
   {tap('Open trading','home-art-trading',()=>navigate('trading'))}
   {tap('Open marketplace','home-art-marketplace',()=>navigate('marketplace'))}
   {tap('Explore communities','home-art-communities',()=>navigate('communities'))}
   {tap('Home','home-art-home',()=>navigate('home'))}
   {tap('Communities','home-art-community-tab',()=>navigate('communities'))}
   {tap('Create','home-art-plus',create)}
   {tap('Chats','home-art-chats',()=>navigate('chats'))}
   {tap('Profile','home-art-profile',()=>navigate('profile'))}
  </div>
  </div>
  <div className="home-art-more-feed" aria-label="Scrollable community feed">
   <div className="home-art-more-heading"><h2>More from your community</h2><p>Scroll to explore posts and updates.</p></div>
   {[...newPosts,
     {id:'sample-sarah',name:'Sarah',avatar:'sarah',time:'Preview post',text:'Welcome to the Chat-X community! 💙',picture:false,likes:12,comments:0,shares:0},
     {id:'sample-david',name:'David',avatar:'david',time:'Preview post',text:'Connect. Share. Inspire. More updates will appear here.',picture:false,likes:8,comments:0,shares:0}
   ].map(post=><div key={post.id}>
    <Post post={post} liked={!!feedLiked[post.id]}
     onLike={()=>setFeedLiked(v=>({...v,[post.id]:!v[post.id]}))}
     onComment={()=>setFeedComment(feedComment===post.id?null:post.id)}
     onShare={async message=>{try{await navigator.clipboard.writeText(message);notify('Post copied to clipboard')}catch{notify('Sharing unavailable in this browser')}}}/>
    {feedComment===post.id&&<form className="comment-composer" onSubmit={e=>{e.preventDefault();setFeedComment(null);notify('Comment added in this preview')}}><input required aria-label="Your comment" placeholder="Write a comment…"/><button aria-label="Send comment" type="submit"><Send size={16}/></button></form>}
   </div>)}
  </div>
  <nav className="home-art-fixed-nav" aria-label="Home navigation">
   {tap('Home','home-art-nav home-art-nav-home',()=>navigate('home'))}
   {tap('Communities','home-art-nav home-art-nav-communities',()=>navigate('communities'))}
   {tap('Create','home-art-nav home-art-nav-create',create)}
   {tap('Chats','home-art-nav home-art-nav-chats',()=>navigate('chats'))}
   {tap('Profile','home-art-nav home-art-nav-profile',()=>navigate('profile'))}
  </nav>

  {showPost&&<div className="home-art-dialog-backdrop" onClick={()=>setShowPost(false)}><form className="home-art-dialog" onClick={e=>e.stopPropagation()} onSubmit={e=>{e.preventDefault();if(draft.trim()){setNewPosts(v=>[{id:Date.now(),name:'You',avatar:'gideon',time:'Now',text:draft.trim(),picture:false,likes:0,comments:0,shares:0},...v]);setDraft('');setShowPost(false);notify('Post added to local preview')}}}>
   <div><strong>Create a post</strong><button type="button" aria-label="Close" onClick={()=>setShowPost(false)}>×</button></div>
   <textarea autoFocus rows={4} placeholder="What's on your mind?" value={draft} onChange={e=>setDraft(e.target.value)} required/>
   <button className="home-art-dialog-submit" type="submit">Post</button>
  </form></div>}
  {showComment&&<div className="home-art-dialog-backdrop" onClick={()=>setShowComment(false)}><form className="home-art-dialog" onClick={e=>e.stopPropagation()} onSubmit={e=>{e.preventDefault();if(comment.trim()){setComment('');setShowComment(false);notify('Comment added in local preview')}}}>
   <div><strong>Leave a comment</strong><button type="button" aria-label="Close" onClick={()=>setShowComment(false)}>×</button></div>
   <textarea autoFocus rows={3} placeholder="Write a comment…" value={comment} onChange={e=>setComment(e.target.value)} required/>
   <button className="home-art-dialog-submit" type="submit">Comment</button>
  </form></div>}
 </div>
}
function Feed({navigate,notify,create,demoStore}) {
 // A real, responsive DOM layout based on the approved Chat-X dashboard artwork.
 // Local drafts are clearly a device-only preview until backend setup is approved.
 const [posts,setPosts]=useState(()=>{
  try {const saved=JSON.parse(localStorage.getItem('chatx_demo_posts')||'[]');return [...(Array.isArray(saved)?saved:[]),...initialPosts]}catch{return initialPosts}
 })
 const [draft,setDraft]=useState('')
 const [liked,setLiked]=useState(()=>{try{return JSON.parse(localStorage.getItem('chatx_demo_likes')||'{}')}catch{return {}}})
 const [commentId,setCommentId]=useState(null)
 const [reply,setReply]=useState('')
 const [comments,setComments]=useState(()=>{try{return JSON.parse(localStorage.getItem('chatx_demo_comments')||'{}')}catch{return {}}})
 const [activeStory,setActiveStory]=useState(null)
 const [photo,setPhoto]=useState(null)
 const [menuPost,setMenuPost]=useState(null)
 const [saved,setSaved]=useState(()=>{try{return JSON.parse(localStorage.getItem('chatx_demo_saved')||'{}')}catch{return {}}})
 useEffect(()=>{localStorage.setItem('chatx_demo_posts',JSON.stringify(posts.filter(p=>p.local)))},[posts])
 useEffect(()=>{localStorage.setItem('chatx_demo_likes',JSON.stringify(liked))},[liked])
 useEffect(()=>{localStorage.setItem('chatx_demo_comments',JSON.stringify(comments))},[comments])
 useEffect(()=>{localStorage.setItem('chatx_demo_saved',JSON.stringify(saved))},[saved])
 const publish=()=>{
  if(!draft.trim()&&!photo){notify('Write a post or attach a photo first');return}
  const p={id:Date.now(),name:'You',avatar:'gideon',time:'Just now',text:draft.trim(),photo:photo||null,likes:0,comments:0,shares:0,local:true}
  setPosts(v=>[p,...v]);setDraft('');setPhoto(null);notify('Post saved on this device (preview only)')
 }
 const share=async text=>{
  if(navigator.share){try{await navigator.share({title:'Chat-X post',text});return}catch{}}
  try{await navigator.clipboard.writeText(text);notify('Post copied for sharing')}catch{notify('Sharing not supported')}
 }
 const storyPeople=[{id:'gideon',name:'Add Story'},{id:'sarah',name:'Sarah'},{id:'david',name:'David'},{id:'queen',name:'Queen'},{id:'silver',name:'Silver'}]
 const addPhoto=e=>{const f=e.target.files?.[0];if(!f)return;if(!f.type.startsWith('image/')){notify('Please choose an image');return}if(f.size>2*1024*1024){notify('For this preview, select an image smaller than 2 MB');return}const rd=new FileReader();rd.onload=()=>setPhoto(String(rd.result));rd.readAsDataURL(f)}
 const openPhoto=()=>document.getElementById('chatx-home-photo')?.click()
 return <section className="cx-home">
  <header className="cx-home-header">
   <Brand large/>
   <div className="cx-home-tools">
    <button className="icon-btn" aria-label="Search" onClick={()=>navigate('search')}><Search size={23}/></button>
    <button className="icon-btn notification-trigger" aria-label="Notifications" onClick={()=>navigate('notifications')}><Bell size={22}/><i/></button>
    <button className="cx-home-profile" aria-label="Open your profile" onClick={()=>navigate('profile')}><Avatar id="gideon" size="sm"/></button>
   </div>
  </header>
  <form className="cx-composer" onSubmit={e=>{e.preventDefault();publish()}}>
   <Avatar id="gideon" size="sm"/>
   <input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="What's on your mind?" aria-label="Write a post"/>
   <input id="chatx-home-photo" className="sr-only" type="file" accept="image/*" onChange={addPhoto}/>
   <button type="button" onClick={openPhoto} aria-label="Add a photo"><Camera size={22}/></button>
   <button type="submit" aria-label="Publish post"><Send size={19}/></button>
  </form>
  {photo&&<div className="cx-photo-preview"><img src={photo} alt="Selected post attachment"/><button onClick={()=>setPhoto(null)}>Remove photo</button></div>}
  <div className="cx-stories" aria-label="Stories">
   {storyPeople.map((p,i)=><button type="button" className="cx-story" key={p.id} onClick={()=>i===0?notify('Story uploads need a connected media storage service'):setActiveStory(p)}>
    <span className="cx-story-ring"><Avatar id={p.id} size="lg"/>{i===0&&<span className="cx-story-add"><Plus size={13}/></span>}</span>
    <span>{p.name}</span>
   </button>)}
  </div>
  <div className="cx-timeline" aria-label="Community posts">
   {posts.filter(post=>post.local||canAccess(demoUsers[post.avatar]||demoUsers.jenny,'me',demoStore.state)).map(post=><article className="cx-feed-post" key={post.id}>
    <div className="cx-post-top"><button type="button" className="cx-post-author" onClick={()=>navigate('profile/'+(post.local?'me':post.avatar))} aria-label={'View '+post.name+' profile'}><Avatar id={post.avatar} size="md"/></button><div><button type="button" className="cx-post-author-name" onClick={()=>navigate('profile/'+(post.local?'me':post.avatar))}><b>{post.name}</b></button><small>{post.time} · <Globe2 size={12}/></small></div>
     <button className="icon-btn cx-post-options" onClick={()=>setMenuPost(menuPost===post.id?null:post.id)} aria-label="Post options"><MoreHorizontal size={22}/></button>
    </div>
    {menuPost===post.id&&<div className="cx-post-menu">
     <button onClick={()=>{setSaved(v=>({...v,[post.id]:!v[post.id]}));setMenuPost(null)}}><Bookmark size={16}/>{saved[post.id]?'Remove saved post':'Save post'}</button>
     {post.local?<button onClick={()=>{setPosts(v=>v.filter(x=>x.id!==post.id));setMenuPost(null)}}><X size={16}/>Delete my post</button>:<button onClick={()=>{setMenuPost(null);notify('Report tools require moderation setup')}}><Shield size={16}/>Report post</button>}
    </div>}
    {post.text&&<button type="button" className="cx-post-copy cx-open-post" onClick={()=>post.local?notify('Local draft detail screen is being connected'):navigate('post/'+(post.id===1?'post-jenny-1':post.id))}>{post.text}</button>}
    {post.photo?<img className="cx-post-image" src={post.photo} alt="Shared attachment"/>:post.picture&&<button type="button" className="cx-open-image" onClick={()=>navigate('post/post-jenny-1')} aria-label="Open post"><img className="cx-post-image" src={referenceCity} alt="City skyline at night"/></button>}
    <div className="cx-post-stats"><span>💙 {post.likes+(liked[post.id]?1:0)} likes</span><span>{post.comments+(comments[post.id]?.length||0)} comments · {post.shares} shares</span></div>
    <div className="cx-post-actions">
     <button className={liked[post.id]?'active':''} onClick={()=>setLiked(v=>({...v,[post.id]:!v[post.id]}))}><Heart size={18} fill={liked[post.id]?'currentColor':'none'}/>Like</button>
     <button onClick={()=>setCommentId(commentId===post.id?null:post.id)}><MessageSquare size={18}/>Comment</button>
     <button onClick={()=>share(post.text||'Chat-X photo post')}><Share2 size={18}/>Share</button>
    </div>
    {!!comments[post.id]?.length&&<div className="cx-comment-list">{comments[post.id].map((c,i)=><div key={i}><b>You</b><span>{c}</span></div>)}</div>}
    {commentId===post.id&&<form className="cx-comment-form" onSubmit={e=>{e.preventDefault();if(!reply.trim())return;setComments(v=>({...v,[post.id]:[...(v[post.id]||[]),reply.trim()]}));setReply('');setCommentId(null)}}>
     <input value={reply} onChange={e=>setReply(e.target.value)} placeholder="Write a comment…" aria-label="Comment" required/>
     <button type="submit" aria-label="Send comment"><Send size={18}/></button>
    </form>}
   </article>)}
  </div>
  <div className="cx-feature-grid">
   <button className="cx-feature trading" onClick={()=>navigate('trading')}><span className="cx-feature-title"><TrendingUp size={26}/><strong>Trading</strong></span><b className="cx-feature-stat">$2,840.50</b><span className="cx-feature-positive">▲ +12.5% <TrendingUp size={24}/></span><span className="cx-feature-cta">Copy Trade Now <ChevronRight size={16}/></span></button>
   <button className="cx-feature marketplace" onClick={()=>navigate('marketplace')}><span className="cx-feature-title"><ShoppingBag size={26}/><strong>Marketplace</strong></span><span className="cx-feature-products"><img src={referenceHeadphones} alt="Headphones"/><img src={referenceWatch} alt="Watch"/><img src={referencePhone} alt="Phone"/></span><span className="cx-feature-cta">Explore Deals <ChevronRight size={16}/></span></button>
  </div>
  <button className="cx-community-cta" onClick={()=>navigate('communities')}><Users size={28}/><span><strong>Communities</strong><small>Discover groups and meet your people</small></span><ChevronRight size={20}/></button>
  <div className="cx-feed-bottom"><Sparkles size={17}/> You're up to date in this preview.</div>
  {activeStory&&<div className="cx-story-overlay" role="dialog" aria-modal="true" aria-label={activeStory.name+' story'} onClick={()=>setActiveStory(null)}>
    <div onClick={e=>e.stopPropagation()}><button aria-label="Close story" onClick={()=>setActiveStory(null)}><X size={22}/></button><Avatar id={activeStory.id} size="lg"/><h3>{activeStory.name}</h3><p>Story media will appear here when uploads and storage are connected.</p></div>
   </div>}
 </section>
}
function FeedPage({notify,navigate}) {
 const [posts,setPosts]=useState(initialPosts)
 const [draft,setDraft]=useState('')
 const [liked,setLiked]=useState({})
 const [commentId,setCommentId]=useState(null)
 const [reply,setReply]=useState('')
 const addPost=()=>{if(!draft.trim())return;setPosts([{id:Date.now(),name:'Gideon Saviour',avatar:'gideon',time:'Now',text:draft.trim(),likes:0,comments:0,shares:0},...posts]);setDraft('');notify('Post added to your preview feed')}
 const share=async postText=>{try{await navigator.clipboard.writeText(postText);notify('Post copied to clipboard')}catch{notify('Sharing unavailable in this browser')}}
 return <>
  <PageTop title="Feed" right={<button className="icon-btn" onClick={()=>navigate('search')} aria-label="Search posts"><Search size={21}/></button>}/>
  <div className="feed-column feed-page">
   <div className="feed-heading"><h2>Latest posts</h2><p>Discover what people are sharing on Chat-X.</p></div>
   <form className="composer" onSubmit={e=>{e.preventDefault();addPost()}}>
    <Avatar id="gideon" size="sm"/>
    <input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Share something with your community…"/>
    <button aria-label="Publish post" type="submit"><Send size={18}/></button>
   </form>
   {posts.map(post=><div key={post.id}>
    <Post post={post} liked={!!liked[post.id]} onLike={()=>setLiked({...liked,[post.id]:!liked[post.id]})} onComment={()=>setCommentId(commentId===post.id?null:post.id)} onShare={share}/>
    {commentId===post.id&&<form className="comment-composer" onSubmit={e=>{e.preventDefault();if(reply.trim()){notify('Comment added locally');setReply('');setCommentId(null)}}}>
     <input value={reply} onChange={e=>setReply(e.target.value)} placeholder="Write a comment…" required/><button type="submit" aria-label="Send comment"><Send size={17}/></button>
    </form>}
   </div>)}
   <div className="feed-end"><Sparkles size={18}/><span>You're up to date in your feed.</span></div>
  </div>
 </>
}
function Chats({notify}) {
 const [selected,setSelected]=useState(null),[query,setQuery]=useState(''),[filter,setFilter]=useState('All'),[message,setMessage]=useState(''),[sent,setSent]=useState(()=>{try{return JSON.parse(localStorage.getItem('chatx_demo_messages')||'{}')}catch{return {}}})
 useEffect(()=>{localStorage.setItem('chatx_demo_messages',JSON.stringify(sent))},[sent])
 const visible=people.filter(p=>(filter!=='Unread'||p.unread>0)&&(filter!=='Groups'||p.group)&&p.name.toLowerCase().includes(query.toLowerCase()))
 const send=()=>{if(!message.trim())return;setSent({...sent,[selected.id]:[...(sent[selected.id]||[]),message.trim()]});setMessage('')}
 return <><div className={'messages-main '+(selected?'show-conversation':'')}><section className="messages-list"><PageTop title="Chats" right={<button className="icon-btn" onClick={()=>notify('Choose a conversation to chat')} aria-label="New message"><Edit3 size={19}/></button>}/><div className="search-pill"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search chats..."/></div><div className="filter-pills">{['All','Groups','Unread'].map(f=><button key={f} className={filter===f?'selected':''} onClick={()=>setFilter(f)}>{f}{f==='All'?' (12)':f==='Groups'?' (5)':' (2)'}</button>)}</div><div className="chat-items">{visible.map(p=><button className={'chat-item '+(selected?.id===p.id?'active':'')} key={p.id} onClick={()=>setSelected(p)}><Avatar id={p.id} size="md"/><span><b>{p.name}</b><small className={p.text==='Typing...'?'typing':''}>{p.text}</small></span><aside><small>{p.time}</small>{p.unread>0&&<em>{p.unread}</em>}</aside></button>)}</div></section><section className="conversation">{selected?<><div className="conversation-header"><button className="icon-btn" onClick={()=>setSelected(null)} aria-label="Back to messages"><ArrowLeft size={20}/></button><Avatar id={selected.id} size="sm"/><div><b>{selected.name}</b><small>{selected.online?'Online now':'Chat-X preview'}</small></div><button className="icon-btn" onClick={()=>notify('Calls require real-time backend integration')} aria-label="Call"><Phone size={19}/></button><button className="icon-btn" onClick={()=>notify('Video calls require real-time backend integration')} aria-label="Video call"><Video size={19}/></button></div><div className="conversation-body"><div className="secure-note"><Lock size={13}/> Demo conversation</div><span className="bubble inbound">Hey! How's everything going?<small>9:02</small></span><span className="bubble outbound">Great! Building something new with Chat-X. 💙<small>9:04 <CheckCheck size={12}/></small></span><span className="bubble inbound">Can't wait to see it!<small>9:05</small></span>{(sent[selected.id]||[]).map((m,i)=><span className="bubble outbound" key={i}>{m}<small>Now <CheckCheck size={12}/></small></span>)}</div><form className="send-form" onSubmit={e=>{e.preventDefault();send()}}><button type="button" onClick={()=>notify('Attachments need storage integration')}><Paperclip size={19}/></button><input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Type a message..."/><button type="submit" className="send-icon"><Send size={18}/></button></form></>:<div className="conversation-empty"><MessageCircleMore size={48}/><h3>Your conversations</h3><p>Choose a chat to view messages.</p></div>}</section></div></>
}
function Profile({notify}) {
 const [tab,setTab]=useState('Posts')
 const [editing,setEditing]=useState(false)
 const [profile,setProfile]=useState(()=>{
  try{return {...{name:'Gideon Saviour',handle:'@gideon_saviour',bio:'Dream Big · Work Hard · Achieve More'},...JSON.parse(localStorage.getItem('chatx_demo_profile')||'{}')}}catch{return {name:'Gideon Saviour',handle:'@gideon_saviour',bio:'Dream Big · Work Hard · Achieve More'}}
 })
 const [draft,setDraft]=useState(profile)
 useEffect(()=>{localStorage.setItem('chatx_demo_profile',JSON.stringify(profile))},[profile])
 const share=async()=>{if(navigator.share){try{await navigator.share({title:'Chat-X',text:profile.name+' on Chat-X',url:location.href});return}catch{}}try{await navigator.clipboard.writeText(location.href);notify('Profile link copied')}catch{notify('Sharing is unavailable')}}
 return <><PageTop title="Profile" right={<button className="icon-btn" onClick={share} aria-label="Share profile"><Share2 size={19}/></button>}/>
 <div className="profile-hero"><div className="profile-orb orb-a"/><div className="profile-orb orb-b"/><div className="profile-portrait"><Avatar id="gideon" size="hero" badge/></div></div>
 <div className="profile-body">
  <h1>{profile.name} <span className="blue-check"><Check size={12}/></span></h1>
  <div className="profile-handle">{profile.handle}</div><p className="profile-quote">{profile.bio}</p>
  <div className="profile-stats"><div><b>—</b><small>Posts</small></div><div><b>—</b><small>Friends</small></div><div><b>—</b><small>Likes</small></div></div>
  <button className="edit-profile primary wide" onClick={()=>{setDraft(profile);setEditing(true)}}>Edit Profile</button>
  <div className="profile-tabs">{['Posts','Friends','Likes'].map(t=><button className={tab===t?'active':''} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div>
  {tab==='Posts'?<div className="photo-grid"><img src={faces.gideon} alt="Profile"/><img src={referenceCity} alt="City skyline"/></div>:<div className="empty-tab"><Sparkles size={30}/><p>{tab==='Friends'?'Friend accounts require a connected backend.':'Liked posts on this device appear in the Home feed.'}</p></div>}
 </div>
 {editing&&<div className="home-art-dialog-backdrop" onClick={()=>setEditing(false)}><form className="home-art-dialog cx-edit-form" onClick={e=>e.stopPropagation()} onSubmit={e=>{e.preventDefault();setProfile(draft);setEditing(false);notify('Profile saved on this device (preview only)')}}>
  <div><strong>Edit your profile</strong><button type="button" aria-label="Close" onClick={()=>setEditing(false)}>×</button></div>
  <label>Display name<input required maxLength={70} value={draft.name} onChange={e=>setDraft(v=>({...v,name:e.target.value}))}/></label>
  <label>Username<input required maxLength={50} value={draft.handle} onChange={e=>setDraft(v=>({...v,handle:e.target.value}))}/></label>
  <label>Bio<textarea rows={3} maxLength={200} value={draft.bio} onChange={e=>setDraft(v=>({...v,bio:e.target.value}))}/></label>
  <button className="home-art-dialog-submit" type="submit">Save changes</button>
 </form></div>}
 </>
}
function Communities({notify}) {
 const [joined,setJoined]=useState(()=>{try{return JSON.parse(localStorage.getItem('chatx_demo_communities')||'{}')}catch{return {}}})
 useEffect(()=>{localStorage.setItem('chatx_demo_communities',JSON.stringify(joined))},[joined])
 return <><PageTop title="Communities" right={<button className="icon-btn" onClick={()=>notify('Creating communities requires account setup')} aria-label="Create community"><Plus size={22}/></button>}/>
  <p className="screen-intro">Find your people. Share what you love.</p>
  <div className="community-list community-list-no-filter">
   {groups.map(g=><article className="community-row" key={g.name}><div className={'community-icon '+g.tone}>{g.emoji}</div><div><b>{g.name}</b><small>{g.count} Members</small><p>{g.about}</p></div><button className={joined[g.name]?'outline mini':'primary mini'} onClick={()=>setJoined({...joined,[g.name]:!joined[g.name]})}>{joined[g.name]?'Joined':'Join'}</button></article>)}
  </div>
 </>
}

function TraderLanding({navigate}) {
 const [asset,setAsset]=useState('BTC/USD')
 const [range,setRange]=useState('1W')
 const [showBrokers,setShowBrokers]=useState(false)
 const [searchBroker,setSearchBroker]=useState('')
 const [brokerRequest,setBrokerRequest]=useState('')
 const [requested,setRequested]=useState([])
 const pairs=['BTC/USD','ETH/USD','EUR/USD','GBP/USD','AAPL']
 const periods=['1D','1W','1M','3M','1Y']
 const brokerExamples=['Interactive Brokers','Alpaca','OANDA','Coinbase Advanced','Kraken']
 const available=brokerExamples.filter(name=>name.toLowerCase().includes(searchBroker.toLowerCase()))
 const points=useMemo(()=>{
  const seed=asset.split('').reduce((v,ch)=>v+ch.charCodeAt(0),0)+range.length*41
  const data=Array.from({length:32},(_,i)=>{const wobble=Math.sin(i*.72+seed)*8+Math.cos(i*.29+seed)*11;return 72-i*.87+wobble})
  return data.map((y,i)=>`${(i/31*320).toFixed(2)},${Math.max(13,Math.min(123,y)).toFixed(2)}`).join(' ')
 },[asset,range])
 return <>
  <PageTop title="Trading Hub" right={<button className="icon-btn" aria-label="Trading information" onClick={()=>setShowBrokers(true)}><ShieldCheck size={21}/></button>}/>
  <div className="trader-landing">
   <div className="trader-hero">
    <span className="trader-kicker"><TrendingUp size={16}/> CHAT-X TRADING</span>
    <h1>Trade globally.<br/><em>Stay connected.</em></h1>
    <p>Your space for market discovery, broker connectivity and copy trading — all in one place.</p>
    <button className="primary wide trader-connect-button" onClick={()=>setShowBrokers(true)}><Wallet size={19}/> Connect a Broker <ChevronRight size={19}/></button>
    <span className="trader-connect-status"><Lock size={13}/> No broker connected · Preview mode</span>
   </div>
   <section className="trader-market-panel">
    <div className="trader-card-top"><div><small>MARKET CHART</small><h2>{asset}</h2></div><span className="trader-demo-tag">ILLUSTRATIVE</span></div>
    <div className="trader-pairs" role="group" aria-label="Select market">{pairs.map(item=><button className={asset===item?'selected':''} key={item} onClick={()=>setAsset(item)}>{item}</button>)}</div>
    <div className="trader-chart" role="img" aria-label={'Illustrative sample chart for '+asset+'; not live market prices'}>
     <svg viewBox="0 0 320 140" preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="traderLineFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#19ddbb" stopOpacity=".28"/><stop offset="1" stopColor="#19ddbb" stopOpacity="0"/></linearGradient></defs>
      {[23,55,87,119].map(y=><line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#5485ad" strokeOpacity=".2" strokeDasharray="4 5"/>)}
      <polygon points={`0,140 ${points} 320,140`} fill="url(#traderLineFill)"/>
      <polyline points={points} stroke="#3aefd5" strokeWidth="2.8" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
     </svg>
    </div>
    <div className="trader-ranges" role="group" aria-label="Chart period">{periods.map(p=><button key={p} className={range===p?'selected':''} onClick={()=>setRange(p)}>{p}</button>)}</div>
    <p className="trader-chart-note">Demonstration chart only. Live market data will be connected later.</p>
   </section>
   <div className="trader-actions">
    <button onClick={()=>setShowBrokers(true)}><span><Wallet size={23}/></span><b>Connect broker</b><small>Start here</small></button>
    <button onClick={()=>navigate('trading')}><span><Activity size={23}/></span><b>Trading dashboard</b><small>Explore demo</small></button>
   </div>
   <section className="broker-explainer"><h3>Built for international traders</h3><p>Broker integrations will be introduced by supported provider and country. Availability, eligibility, compliance checks and account permissions will depend on each broker.</p><div><ShieldCheck size={18}/> Your broker credentials must never be entered into Chat-X until a verified, secure connection is implemented.</div></section>
  </div>
  {showBrokers&&<div className="broker-modal-backdrop" onClick={()=>setShowBrokers(false)}><section className="broker-modal" role="dialog" aria-modal="true" aria-label="Connect a broker" onClick={e=>e.stopPropagation()}>
    <div className="broker-modal-head"><div><small>BROKER CONNECTIONS</small><h2>Connect your broker</h2></div><button onClick={()=>setShowBrokers(false)} aria-label="Close broker selection"><X size={22}/></button></div>
    <p>Find a provider below. Connections aren't live yet; these are examples of brokers to evaluate for future integration.</p>
    <div className="broker-search"><Search size={17}/><input value={searchBroker} onChange={e=>setSearchBroker(e.target.value)} placeholder="Search brokers..." aria-label="Search broker names"/></div>
    <div className="broker-provider-list">{available.map(name=><div className="broker-provider" key={name}><span><TrendingUp size={19}/></span><div><b>{name}</b><small>Integration not available yet</small></div><span className="broker-pending">Planned</span></div>)}{available.length===0&&<p className="broker-empty">No listed broker matches that name.</p>}</div>
    <form className="broker-request" onSubmit={e=>{e.preventDefault();if(brokerRequest.trim()){setRequested(current=>[...current,brokerRequest.trim()]);setBrokerRequest('')}}}><label htmlFor="broker-request-input">Which broker would you like to see?</label><div><input id="broker-request-input" value={brokerRequest} onChange={e=>setBrokerRequest(e.target.value)} placeholder="Enter broker name" required maxLength={75}/><button type="submit">Add</button></div>{requested.length>0&&<small>Noted for this preview session: {requested.join(', ')}. This is not submitted to a server.</small>}</form>
    <div className="broker-security"><Lock size={16}/><span>Do not enter passwords, API keys or payment details here. Secure OAuth or provider-approved account linking will be added later.</span></div>
  </section></div>}
 </>
}
function Trading({notify}) {const [period,setPeriod]=useState('1W'),[follow,setFollow]=useState({});return <><PageTop title="Trading" right={<button className="icon-btn" aria-label="Trading notifications" onClick={()=>notify('Trading account not connected')}><Bell size={20}/></button>}/><div className="balance-card"><div className="balance-label">Your Balance <span>DEMO</span></div><h1>$2,840.50</h1><p>↗ +12.5% <span>this week</span></p><svg viewBox="0 0 350 115" preserveAspectRatio="none" aria-label="Illustrative portfolio chart"><defs><linearGradient id="balance-gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#16e6ad" stopOpacity=".48"/><stop offset="1" stopColor="#16e6ad" stopOpacity="0"/></linearGradient></defs><path d="M0 100 C20 96 30 82 46 87 S71 57 90 66 S119 78 135 52 S168 65 189 43 S219 54 246 25 S275 33 298 17 S320 20 350 4 V115 H0 Z" fill="url(#balance-gradient)"/><path d="M0 100 C20 96 30 82 46 87 S71 57 90 66 S119 78 135 52 S168 65 189 43 S219 54 246 25 S275 33 298 17 S320 20 350 4" fill="none" stroke="#1af4b8" strokeWidth="3"/></svg><div className="chart-periods">{['1D','1W','1M','3M','1Y'].map(p=><button key={p} onClick={()=>setPeriod(p)} className={p===period?'active':''}>{p}</button>)}</div><button className="primary wide" onClick={()=>notify('Copy trading requires broker connection and compliance setup')}>Copy Trade Now <ChevronRight size={18}/></button></div><div className="quick-actions">{[[ArrowDownToLine,'Deposit'],[ArrowUpFromLine,'Withdraw'],[History,'History'],[Activity,'Signals']].map(([Icon,name])=><button onClick={()=>notify(name+' requires trading provider integration')} key={name}><span><Icon size={21}/></span><small>{name}</small></button>)}</div><div className="section-title"><h3>Top Traders</h3><button onClick={()=>notify('Showing example trader profiles')}>See All <ChevronRight size={14}/></button></div><div className="traders">{[['ProTrader','12.5K','+48.6%','david'],['AlphaTrade','9.8K','+37.2%','sarah'],['Nova Signals','7.2K','+29.4%','queen']].map(([name,followers,gain,face])=><div className="trader" key={name}><Avatar id={face} size="sm"/><div><b>{name}</b><small>{followers} Followers</small></div><strong>{gain}</strong><button className="primary mini" onClick={()=>setFollow({...follow,[name]:!follow[name]})}>{follow[name]?'Following':'Copy'}</button></div>)}</div><p className="risk">Preview values are illustrative only. No real trading or payments are enabled.</p></>}
function Marketplace({notify}) {const [filter,setFilter]=useState('All'),[cart,setCart]=useState([]);return <><PageTop title="Marketplace" right={<button className="icon-btn cart-button" aria-label="Cart" onClick={()=>notify(cart.length+' items in your preview cart')}><ShoppingCart size={21}/>{cart.length>0&&<em>{cart.length}</em>}</button>}/><p className="screen-intro">Discover something you'll love.</p><div className="filter-pills">{['All','Phones','Laptops','Accessories'].map(t=><button className={filter===t?'selected':''} key={t} onClick={()=>setFilter(t)}>{t}</button>)}</div><div className="product-grid">{products.filter(p=>filter==='All'||p.category===filter).map(p=><div className="product-card" key={p.name}><img src={p.image} alt={p.name}/><div><b>{p.name}</b><small><Star size={12} fill="currentColor"/> {p.rating}</small><strong>{p.price}</strong><button className="primary mini" onClick={()=>{setCart([...cart,p]);notify(p.name+' added to preview cart')}}>Buy Now</button></div></div>)}</div></>}
function Notifications(){const [filter,setFilter]=useState('All'),[read,setRead]=useState({});const items=[{id:1,icon:Heart,kind:'Likes',text:'Jenny Bright liked your post.',when:'2m ago',tone:'pink'},{id:2,icon:MessageSquare,kind:'Comments',text:'David King commented: Great post!',when:'5m ago',tone:'blue'},{id:3,icon:UserPlus,kind:'Mentions',text:'Sarah Love started following you.',when:'10m ago',tone:'purple'},{id:4,icon:Trophy,kind:'All',text:'You won the weekly challenge! 🎉',when:'1h ago',tone:'gold'},{id:5,icon:Users,kind:'All',text:'New activity in Chat-X Group.',when:'2h ago',tone:'blue'}];return <><PageTop title="Notifications" right={<Bell size={21}/>}/><div className="filter-pills">{['All','Likes','Comments','Mentions'].map(t=><button className={filter===t?'selected':''} onClick={()=>setFilter(t)} key={t}>{t}</button>)}</div><div className="notifications">{items.filter(n=>filter==='All'||n.kind===filter).map(n=><button className={'notification-row '+(read[n.id]?'is-read':'')} key={n.id} onClick={()=>setRead({...read,[n.id]:true})}><span className={'notification-symbol '+n.tone}><n.icon size={22}/></span><span><b>{n.text}</b><small>{n.when}</small></span>{!read[n.id]&&<i/>}</button>)}</div></>}
function SettingsPage({notify,onLogout,navigate}) {const [dark,setDark]=useState(true),[alerts,setAlerts]=useState(true);return <><PageTop title="Settings" right={<Settings size={20}/>}/><div className="settings-profile"><Avatar id="gideon" size="md"/><div><b>Gideon Saviour</b><small>@gideon_saviour</small></div><ChevronRight size={18}/></div><div className="settings-list"><h3>Account & Preferences</h3>{[[UserRound,'Account Settings'],[Shield,'Privacy & Security'],[Bell,'Notifications'],[Globe2,'Language'],[HelpCircle,'Help & Support'],[Sparkles,'About Chat-X']].map(([Icon,label])=><button className="setting-item" key={label} onClick={()=>label==='About Chat-X'?navigate('about'):notify(label+' will be available once backend setup is complete')}><Icon size={19}/><span>{label}</span><ChevronRight size={17}/></button>)}<div className="setting-item"><Moon size={19}/><span>Dark Mode</span><button className={'switch '+(dark?'on':'')} onClick={()=>{setDark(!dark);notify('Dark mode is the approved preview theme')}} aria-label="Toggle dark mode"><i/></button></div><div className="setting-item"><Bell size={19}/><span>Push Notifications</span><button className={'switch '+(alerts?'on':'')} onClick={()=>setAlerts(!alerts)} aria-label="Toggle notifications"><i/></button></div><button className="setting-item logout" onClick={onLogout}><LogOut size={19}/><span>Log Out</span><ChevronRight size={17}/></button></div></>}
function Explore({navigate}) {return <><PageTop title="Explore" right={<Compass size={20}/>}/><p className="screen-intro">Your world. Your community.</p><div className="explore-grid">{[['Communities',Users,'communities'],['Messages',MessageCircle,'chats'],['Trading',TrendingUp,'trading'],['Marketplace',ShoppingBag,'marketplace'],['Notifications',Bell,'notifications'],['Settings',Settings,'settings']].map(([name,Icon,id])=><button onClick={()=>navigate(id)} key={id}><Icon size={29}/><b>{name}</b><ChevronRight size={15}/></button>)}</div></>}
function AboutPage({navigate}) {return <div className="about-page"><div className="about-orbit"/><button className="about-back icon-btn" onClick={()=>navigate('settings')} aria-label="Back"><ArrowLeft size={21}/></button><Brand large/><h1>Chat-<span>X</span></h1><h3>Connect. Share. Inspire.</h3><ul>{['Chat & Make Friends','Join Communities','Copy Trading','Trade & Earn','Share Your World','Marketplace','Notifications','Dark Mode & More...'].map(t=><li key={t}><span><Check size={13} strokeWidth={3}/></span>{t}</li>)}</ul><div className="about-footer">Your World.<br/>Our Community.</div></div>}
function GlobalSearch({navigate,onClose}) {const [q,setQ]=useState('');return <div className="search-overlay"><button className="search-dismiss" aria-label="Close search" onClick={onClose}><X size={24}/></button><div className="search-dialog"><Search size={22}/><input autoFocus placeholder="Search Chat-X…" value={q} onChange={e=>setQ(e.target.value)}/>{q&&<button onClick={()=>setQ('')}><X size={18}/></button>}</div><div className="search-results"><h3>Explore Chat-X</h3>{[['Messages','chats'],['Communities','communities'],['Trading','trading'],['Marketplace','marketplace'],['Profile','profile']].filter(x=>x[0].toLowerCase().includes(q.toLowerCase())).map(([name,id])=><button key={id} onClick={()=>{navigate(id);onClose()}}>{name}<ChevronRight size={18}/></button>)}</div></div>}
function BottomNav({active,navigate,create,chatMenuOpen,setChatMenuOpen}) {
 const tabs=[
  {id:'home',label:'Home',icon:Home},
  {id:'communities',label:'Communities',icon:Users},
  {id:'create',label:'Create',icon:Plus},
  {id:'chats',label:'Chat',icon:MessageCircle},
  {id:'profile',label:'Profile',icon:UserRound}
 ]
 const unread=people.reduce((sum,p)=>sum+(p.unread||0),0)
 return <div className="glass-nav-dock">
  {chatMenuOpen&&<div className="chat-glass-chooser" role="group" aria-label="Choose Chats or Trading">
   <button type="button" className="chat-choice-orb" onClick={()=>navigate('chats')} aria-label="Open Chats" title="Chats"><MessageCircle size={36} strokeWidth={2.2}/></button>
   <button type="button" className="chat-choice-orb trading-orb" onClick={()=>navigate('trader-landing')} aria-label="Open Trading" title="Trading"><TrendingUp size={36} strokeWidth={2.2}/></button>
  </div>}
  <nav className="bottom-nav glass-bottom-nav" aria-label="Main navigation">
   {tabs.map(({id,label,icon:Icon})=><button type="button" key={id}
    aria-label={id==='create'?'Create a post or message':label}
    aria-current={active===id?'page':undefined}
    className={'glass-tab'+((active===id||(id==='chats'&&chatMenuOpen))?' active':'')+(id==='create'?' center-plus':'')}
    onClick={()=>id==='create'?create():id==='chats'?setChatMenuOpen(v=>!v):navigate(id)} aria-expanded={id==='chats'?chatMenuOpen:undefined} aria-haspopup={id==='chats'?'true':undefined}>
    <span className="glass-tab-icon"><Icon size={id==='create'?27:23} strokeWidth={active===id?2.5:2}/>{id==='chats'&&unread>0&&<span className="glass-badge">{unread>99?'99+':unread}</span>}</span>
    <span className="glass-tab-label">{label}</span>
   </button>)}
  </nav>
 </div>
}
export default function App() {
 const [stage,setStage]=useState('welcome')
 const [page,setPage]=useState(()=>{const hash=decodeURIComponent(window.location.hash.slice(1));return hash&&/^(profile\/|post\/|community\/|product\/|media\/|privacy$|requests$|discover$)/.test(hash)?hash:'home'}),[chatMenuOpen,setChatMenuOpen]=useState(false),[menu,setMenu]=useState(false),[create,setCreate]=useState(false),[toast,setToast]=useState(''),[search,setSearch]=useState(false)
 const demoStore=useDemoState()
 const scrollPositions=useRef({})
 const pageRef=useRef(page)
 const historyRef=useRef([])
 useEffect(()=>{requestAnimationFrame(()=>window.scrollTo(0,scrollPositions.current[page]||0))},[page])
 useEffect(()=>{const onBack=()=>{scrollPositions.current[pageRef.current]=window.scrollY;const prev=historyRef.current.pop()||'home';pageRef.current=prev;setPage(prev)};window.addEventListener('popstate',onBack);return()=>window.removeEventListener('popstate',onBack)},[])
 useEffect(()=>{if(!toast)return;const timeout=setTimeout(()=>setToast(''),3200);return ()=>clearTimeout(timeout)},[toast])
 const notify=text=>setToast(text)
 const navigate=p=>{
  const current=pageRef.current
  scrollPositions.current[current]=window.scrollY
  if(p!==current){historyRef.current.push(current);window.history.pushState({chatxPage:p},'','#'+p)}
  pageRef.current=p;setPage(p);setMenu(false);setChatMenuOpen(false)
  if(p===current)requestAnimationFrame(()=>window.scrollTo({top:0,behavior:'instant'}))
 }
 useEffect(()=>{if(!chatMenuOpen)return;const close=e=>{if(e.key==='Escape')setChatMenuOpen(false)};window.addEventListener('keydown',close);return ()=>window.removeEventListener('keydown',close)},[chatMenuOpen])
 const enter=()=>{sessionStorage.setItem('chatx_seen','1');setStage('app');navigate('home')}
 if(stage==='welcome')return <Welcome next={()=>setStage(sessionStorage.getItem('chatx_seen')?'app':'auth')}/>
 if(stage==='auth')return <div className="entry-wrap"><SignIn onEnter={enter}/></div>
 const pages={home:<Feed navigate={p=>p==='search'?navigate('discover'):navigate(p)} notify={notify} create={()=>setCreate(true)} demoStore={demoStore}/>,feed:<FeedPage navigate={p=>p==='search'?setSearch(true):navigate(p)} notify={notify}/>,chats:<Chats notify={notify} navigate={navigate}/>,communities:<Communities notify={notify} navigate={navigate}/>,profile:<Profile notify={notify}/>,'trader-landing':<TraderLanding navigate={navigate}/>,trading:<Trading notify={notify}/>,marketplace:<Marketplace notify={notify} navigate={navigate}/>,notifications:<Notifications navigate={navigate}/>,settings:<SettingsPage notify={notify} navigate={navigate} onLogout={()=>{sessionStorage.removeItem('chatx_seen');setStage('auth')}}/>,about:<AboutPage navigate={navigate}/>,explore:<Explore navigate={navigate}/>}
 const detailRoute=/^(profile\/|post\/|community\/|product\/|media\/|media-product\/|privacy$|requests$|discover$)/.test(page)
 const activePage=detailRoute?<DemoScreen route={page} store={demoStore} navigate={navigate} back={()=>{if(window.history.state?.chatxPage){window.history.back()}else navigate('home')}} notify={notify}/>:pages[page]||pages.home
 return <div className="site-shell"><aside className={'desktop-rail '+(menu?'menu-open':'')}><Brand/><p className="rail-heading">DISCOVER</p>{[['home',Home,'Home'],['chats',MessageCircle,'Messages'],['communities',Users,'Communities'],['trading',TrendingUp,'Trading'],['marketplace',ShoppingBag,'Marketplace'],['notifications',Bell,'Notifications'],['profile',UserRound,'Profile'],['settings',Settings,'Settings']].map(([id,Icon,label])=><button key={id} onClick={()=>navigate(id)} className={page===id?'active':''}><Icon size={19}/>{label}</button>)}<div className="rail-foot">Connect. Share. Inspire.</div></aside><div className="app-wrap"><div className="desktop-bar"><Brand/><span>YOUR WORLD. OUR COMMUNITY.</span><button className="icon-btn" onClick={()=>setMenu(!menu)} aria-label="Open navigation"><Menu size={20}/></button></div><main className={'app-screen'+(page==='home'?' cx-home-main':'')} key={page}>{activePage}</main>{chatMenuOpen&&<button type="button" className="chat-chooser-dismiss" aria-label="Close chat options" onClick={()=>setChatMenuOpen(false)}/>}
<BottomNav active={page} navigate={navigate} create={()=>{setChatMenuOpen(false);setCreate(true)}} chatMenuOpen={chatMenuOpen} setChatMenuOpen={setChatMenuOpen}/></div>{create&&<div className="modal-shade" onClick={()=>setCreate(false)}><section className="create-panel" onClick={e=>e.stopPropagation()}><div><h2>Create something new</h2><button onClick={()=>setCreate(false)} aria-label="Close"><X size={22}/></button></div>{[[ImageIcon,'Create a post','home'],[Users,'Explore communities','communities'],[MessageCircle,'New message','chats'],[TrendingUp,'Explore trading','trading']].map(([Icon,label,id])=><button key={id} onClick={()=>{setCreate(false);navigate(id)}}><Icon size={21}/>{label}<ChevronRight size={18}/></button>)}</section></div>}{search&&<GlobalSearch navigate={navigate} onClose={()=>setSearch(false)}/ >}{toast&&<div className="toast" role="status"><Check size={15}/>{toast}</div>}</div>
}
