import React,{useEffect,useState} from 'react'
import { ArrowLeft,Lock,UserRound,Users,Heart,MessageCircle,Share2,Bookmark,ChevronRight,Search,X,Check,Shield,Globe2,Camera,ShoppingBag,TrendingUp,Bell,Settings,Eye,Image as ImageIcon,ExternalLink,Plus,Send,Flag,UserPlus } from 'lucide-react'
import {referencePortrait,referenceJenny,referenceSarah,referenceDavid,referenceQueen,referenceCity,referencePhone,referenceHeadphones,referenceWatch} from './designAssets'
import { ProfilePhoto, ProfileCameraControl, useProfilePhoto } from './ProfileCamera.jsx'
import './socialCore.css'

// Fictional, stable demo records; identities, media, and relationships use the same IDs.
export const demoUsers={
 me:{id:'me',name:'You',handle:'@chatx_demo',bio:'Exploring ChartX',image:referencePortrait,private:false},
 jenny:{id:'jenny',name:'Jenny Bright',handle:'@jennybright',bio:'Good vibes and bright ideas 💙',image:referenceJenny,private:false,verified:false},
 sarah:{id:'sarah',name:'Sarah',handle:'@sarah_demo',bio:'Sharing moments and making connections',image:referenceSarah,private:false},
 david:{id:'david',name:'David King',handle:'@david_demo',bio:'Creator and tech enthusiast',image:referenceDavid,private:false},
 queen:{id:'queen',name:'Queen',handle:'@queen_demo',bio:'Creativity and community',image:referenceQueen,private:false},
 silver:{id:'silver',name:'Silver',handle:'@silver_demo',bio:'This account is private',image:referencePortrait,private:true}
}
export const demoPosts=[
 {id:'post-jenny-1',authorId:'jenny',text:'Good vibes only! 💙\nLet’s keep pushing forward together.',image:referenceCity,created:'Sample · 2h ago',audience:'public',likes:1200},
 {id:'post-sarah-1',authorId:'sarah',text:'A new day to share something wonderful. What inspires you today?',created:'Sample · Yesterday',audience:'public',likes:18},
 {id:'post-david-1',authorId:'david',text:'Building our future one idea at a time. #ChatX',created:'Sample · Yesterday',audience:'public',likes:9},
 {id:'post-silver-1',authorId:'silver',text:'A private moment',created:'Sample · 1 day ago',audience:'followers',likes:3}
]
export const demoCommunities=[
 {id:'tech',name:'ChartX Tech Hub',description:'Explore AI, software and the future.',count:'24.5K',members:['sarah','david'],private:false},
 {id:'music',name:'Music Vibes',description:'Music, conversations and new sounds.',count:'18.7K',members:['silver','queen'],private:false},
 {id:'friends',name:'Friends Forever',description:'A private space for trusted connections.',count:'Demo',members:['jenny'],private:true}
]
export const demoProducts=[
 {id:'headphones',name:'Studio Headphones',price:'$299',image:referenceHeadphones,category:'Accessories',condition:'New',sellerId:'david',description:'Sample product listing for frontend exploration.'},
 {id:'watch',name:'Smart Watch',price:'$799',image:referenceWatch,category:'Accessories',condition:'New',sellerId:'sarah',description:'Sample product listing for frontend exploration.'},
 {id:'phone',name:'Smartphone',price:'$999',image:referencePhone,category:'Phones',condition:'New',sellerId:'jenny',description:'Sample product listing for frontend exploration.'}
]
const initial={privacy:{me:false},relationships:{},blocked:{},saved:{},likes:{},requests:{},approved:{},joined:{},comments:{},reportDrafts:{}}
function readState(){try{return {...initial,...JSON.parse(localStorage.getItem('chatx_master_demo_v1')||'{}')}}catch{return initial}}
export function useDemoState(){
 const [state,setState]=useState(readState)
 useEffect(()=>{try{localStorage.setItem('chatx_master_demo_v1',JSON.stringify(state))}catch{}},[state])
 const patch=(key,id,value)=>setState(s=>({...s,[key]:{...(s[key]||{}),[id]:value}}))
 return {state,patch,setState}
}
// Frontend-only access demo. Server authorization and media URL protection remain required.
export function canAccess(user,viewerId,state,audience='public'){
 if(!user)return false
 if(user.id===viewerId)return true
 if(state.blocked?.[user.id])return false
 const isPrivate=state.privacy?.[user.id]??user.private
 if(isPrivate&&!state.approved?.[user.id])return false
 if(audience==='only-me')return false
 if(audience==='followers'&&!state.approved?.[user.id]&&state.relationships?.[user.id]!=='following')return false
 return true
}
function UserImage({user,authorized,large=false}){
 return authorized?<img src={user.image} alt={user.name} className={'core-avatar'+(large?' large':'')}/>:<div className={'core-anon-avatar'+(large?' large':'')} aria-label="Private account avatar"><UserRound/></div>
}
export function ComingSoon({title='Feature',detail='This feature will be available soon.',close}){
 return <div className="core-modal-backdrop" role="presentation" onClick={close}><section role="dialog" aria-modal="true" className="core-modal" aria-label={title} onClick={e=>e.stopPropagation()}><div className="core-modal-heading"><Shield size={23}/><button aria-label="Close" onClick={close}><X/></button></div><h2>{title}</h2><p><b>Coming Soon</b> — {detail}</p><button className="core-primary" onClick={close}>Close</button></section></div>
}
function CoreHeader({title,back,end}){return <header className="core-header"><button aria-label="Back" onClick={back}><ArrowLeft size={22}/></button><h1>{title}</h1>{end||null}</header>}
function UserLink({id,navigate,state,children}){
 const u=demoUsers[id];if(!u)return null
 const permitted=canAccess(u,'me',state)
 return <button className="core-user" onClick={()=>navigate('profile/'+id)}><UserImage user={u} authorized={permitted}/><span>{children||u.name}<small>{u.handle}</small></span><ChevronRight size={18}/></button>
}
function ProfileDetail({id,state,patch,navigate,notify,back,coming}){
 const u=demoUsers[id];const [confirm,setConfirm]=useState(null)
 if(!u)return <Empty title="Profile not found" back={back}/>
 const owner=id==='me',authorized=canAccess(u,'me',state)
 const privateAccount=state.privacy?.[id]??u.private
 const requested=!!state.requests?.[id],approved=!!state.approved?.[id]
 const followed=state.relationships?.[id]==='following'
 const toggle=()=>{if(privateAccount&&!approved){patch('requests',id,!requested);notify(requested?'Demo follow request cancelled':'Demo follow request set to Requested (not delivered)')}else{patch('relationships',id,followed?null:'following');notify(followed?'Demo unfollowed':'Demo followed locally')}}
 return <><CoreHeader title="Profile" back={back}/><div className="core-profile">
  <div className="core-profile-cover"><span>{owner?'Your profile':'Sample profile'}</span></div>
  <div className="core-profile-intro"><div className="core-owner-photo-wrap"><button className="core-avatar-tap" aria-label={authorized?'Open profile photo':'Profile picture is private'} onClick={()=>authorized?navigate('media/'+id):null}>{owner?<ProfilePhoto className="core-avatar large" alt="Your demo profile photo"/>:<UserImage user={u} authorized={authorized} large/>}</button>{owner&&<ProfileCameraControl notify={notify}/>}</div><div><h2>{u.name}</h2><p>{u.handle}</p></div></div>
  {!authorized?<div className="core-private"><Lock size={33}/><h3>This Account Is Private</h3><p>Follow this account and wait for approval to see their posts, photos, and profile content.</p><button className="core-primary" onClick={toggle}>{requested?'Requested':'Request to Follow'}</button></div>:<>
   <p className="core-bio">{u.bio}</p>
   <div className="core-profile-stats"><span>Demo profile</span><span>Posts {demoPosts.filter(p=>p.authorId===id).length}</span></div>
   {owner?<div className="core-action-row"><button onClick={()=>navigate('privacy')}>Privacy & Security</button><button onClick={()=>coming('Edit Profile','Profile editing is available in the existing Profile tab; server sync requires backend integration.')}>Edit profile</button></div>:<div className="core-action-row"><button className="core-primary" onClick={toggle}>{followed?'Following':requested?'Requested':privateAccount?'Request to Follow':'Follow'}</button><button onClick={()=>navigate('chats')}>Message</button><button onClick={()=>coming('Report User','Reports require a moderation service.')}>Report</button><button onClick={()=>setConfirm('block')}>{state.blocked?.[id]?'Unblock':'Block'}</button></div>}
   <h3 className="core-section-label">Posts</h3>
   {demoPosts.filter(p=>p.authorId===id&&canAccess(u,'me',state,p.audience)).map(p=><button className="core-post-preview" key={p.id} onClick={()=>navigate('post/'+p.id)}><p>{p.text}</p>{p.image&&<img src={p.image} alt="Post media"/>}<small>View post <ChevronRight size={15}/></small></button>)}
  </>}
  {owner&&<button className="core-soft-link" onClick={()=>navigate('requests')}>Manage demo follow requests <ChevronRight size={16}/></button>}
  {confirm==='block'&&<div className="core-confirm"><p>{state.blocked?.[id]?'Unblock this demo profile?':'Block this demo profile? Its content will be hidden in this local preview.'}</p><button onClick={()=>setConfirm(null)}>Cancel</button><button className="core-primary" onClick={()=>{patch('blocked',id,!state.blocked?.[id]);setConfirm(null);notify('Local block preference updated')}}>Confirm</button></div>}
 </div></>
}
function PostDetail({id,state,patch,navigate,notify,back,coming}){
 const p=demoPosts.find(p=>p.id===id);if(!p)return <Empty title="Post not found" back={back}/>
 const u=demoUsers[p.authorId],permitted=canAccess(u,'me',state,p.audience)
 const [draft,setDraft]=useState('')
 if(!permitted)return <><CoreHeader title="Post" back={back}/><div className="core-private"><Lock/><h2>Content unavailable</h2><p>This post is protected by its author's privacy settings.</p><button className="core-primary" onClick={()=>navigate('profile/'+u.id)}>View limited profile</button></div></>
 const comments=state.comments?.[id]||[]
 return <><CoreHeader title="Post" back={back}/><article className="core-detail-card"><UserLink id={u.id} navigate={navigate} state={state}/><p className="core-post-text">{p.text}</p>{p.image&&<button className="core-image-link" onClick={()=>navigate('media/post-'+id)}><img src={p.image} alt="Post attachment"/></button>}<small>{p.created} · Demonstration content</small><div className="core-action-row"><button onClick={()=>patch('likes',id,!state.likes?.[id])}><Heart size={17} fill={state.likes?.[id]?'currentColor':'none'}/>{state.likes?.[id]?'Liked':'Like'}</button><button onClick={()=>patch('saved',id,!state.saved?.[id])}><Bookmark size={17}/>{state.saved?.[id]?'Saved':'Save'}</button><button onClick={async()=>{try{await navigator.clipboard.writeText(window.location.href);notify('Demo post link copied')}catch{notify('Copy unavailable')}}}><Share2 size={17}/>Share</button></div><div className="core-action-row"><button onClick={()=>coming('Repost','Reposting to other users requires backend connectivity.')}>Repost</button><button onClick={()=>coming('Report Post','Reports need a moderation backend before submission.')}>Report</button></div><h3>Comments ({comments.length})</h3>{comments.map((c,i)=><div className="core-comment" key={i}><b>You · local demo</b><p>{c}</p></div>)}<form className="core-comment-input" onSubmit={e=>{e.preventDefault();if(!draft.trim())return;patch('comments',id,[...comments,draft.trim()]);setDraft('')}}><label className="sr-only" htmlFor="core-reply">Write a comment</label><input id="core-reply" placeholder="Write a comment…" value={draft} onChange={e=>setDraft(e.target.value)} required/><button aria-label="Send comment" type="submit"><Send size={19}/></button></form></article></>
}
function MediaScreen({id,state,back}){
 const ownPhoto=useProfilePhoto()
 let src=null,title='Media viewer'
 if(id.startsWith('post-')){const p=demoPosts.find(x=>x.id===id.slice(5));if(p&&canAccess(demoUsers[p.authorId],'me',state,p.audience))src=p.image}
 else{const u=demoUsers[id];if(u&&canAccess(u,'me',state)) {src=id==='me'?(ownPhoto||u.image):u.image;title=u.name+' profile picture'}}
 const [zoom,setZoom]=useState(false)
 return <div className="core-media-screen"><CoreHeader title={title} back={back}/>{src?<button className={'core-media-image'+(zoom?' zoom':'')} onClick={()=>setZoom(v=>!v)} aria-label="Tap to zoom image"><img src={src} alt={title}/></button>:<div className="core-private"><Lock/><p>This media is not available to this viewer.</p></div>}</div>
}
function CommunityDetail({id,state,patch,navigate,back,coming}){
 const c=demoCommunities.find(x=>x.id===id);if(!c)return <Empty title="Community not found" back={back}/>
 const joined=!!state.joined?.[id]
 return <><CoreHeader title="Community" back={back}/><section className="core-detail-card"><div className="core-community-cover"><Users size={40}/></div><h2>{c.name}</h2><p>{c.description}</p><p className="core-muted">{c.count} sample members · {c.private?'Private':'Public'} community</p><button className="core-primary" onClick={()=>patch('joined',id,!joined)}>{joined?'Leave Demo Community':c.private?'Request to Join (Demo)':'Join Demo Community'}</button><h3>Community members</h3>{(!c.private||joined)?c.members.map(uid=><UserLink key={uid} id={uid} state={state} navigate={navigate}/>):<div className="core-private"><Lock/><p>Member content is private until your demo request is approved.</p></div>}<h3>Announcements</h3><p>Sample community detail screen. No live members or announcements are connected.</p><button onClick={()=>coming('Report Community','Reporting requires a moderation backend.')}>Report community</button></section></>
}
function ProductDetail({id,state,navigate,back,coming}){
 const p=demoProducts.find(x=>x.id===id);if(!p)return <Empty title="Product not found" back={back}/>
 return <><CoreHeader title="Product Details" back={back}/><div className="core-detail-card"><button className="core-image-link" onClick={()=>navigate('media-product/'+id)}><img src={p.image} alt={p.name}/></button><h2>{p.name}</h2><h3>{p.price}</h3><p>{p.description}</p><p className="core-muted">Category: {p.category} · Condition: {p.condition} · Demo listing</p><h3>Seller</h3><UserLink id={p.sellerId} state={state} navigate={navigate}/><div className="core-action-row"><button className="core-primary" onClick={()=>coming('Contact Seller','Real seller messaging needs connected accounts.')}>Contact seller</button><button onClick={()=>coming('Secure Checkout','Secure checkout will be available soon.')}>Buy Now</button><button onClick={()=>coming('Report Listing','Reports require moderation infrastructure.')}>Report</button></div></div></>
}
function PrivacyScreen({state,patch,back,notify}){
 const [pending,setPending]=useState(null)
 const privateAccount=!!state.privacy?.me
 return <><CoreHeader title="Account Privacy" back={back}/><section className="core-detail-card"><div className="core-privacy-heading"><Shield size={27}/><div><h2>Private Account</h2><p>Control who can view your profile and posts.</p></div></div><button className="core-privacy-toggle" role="switch" aria-checked={privateAccount} onClick={()=>setPending(!privateAccount)}><span>Private Account: <b>{privateAccount?'ON':'OFF'}</b></span><span className={'core-switch '+(privateAccount?'on':'')}/></button><p className="core-muted">{privateAccount?'Only approved demo followers can see protected profile content.':'Demo visitors can view public profile details and posts.'}</p><p>These controls demonstrate expected privacy behavior locally. They do not protect uploaded data on a real server.</p><div className="core-action-row"><button onClick={()=>notify('Profile picture visibility follows your demo account privacy')}>Profile picture visibility</button><button onClick={()=>notify('Story audience selection will be added to the frontend')}>Story audience</button></div></section>{pending!==null&&<div className="core-modal-backdrop"><div className="core-modal" role="dialog" aria-modal="true"><h2>{pending?'Make Account Private?':'Make Account Public?'}</h2><p>{pending?'Others will no longer see protected posts, full-size photos, or private details without approval.':'Previously protected public-audience posts may become visible to visitors. Pending requests will not be approved automatically.'}</p><div className="core-action-row"><button onClick={()=>setPending(null)}>Cancel</button><button className="core-primary" onClick={()=>{patch('privacy','me',pending);setPending(null);notify('Demo account privacy updated locally')}}>Confirm</button></div></div></div>}</>
}
function SearchScreen({state,navigate,back}){
 const [q,setQ]=useState(''),[tab,setTab]=useState('People');const v=q.trim().toLowerCase()
 const results=tab==='People'?Object.values(demoUsers).filter(u=>u.name.toLowerCase().includes(v)||u.handle.includes(v)):tab==='Posts'?demoPosts.filter(p=>canAccess(demoUsers[p.authorId],'me',state,p.audience)&&p.text.toLowerCase().includes(v)):tab==='Communities'?demoCommunities.filter(c=>c.name.toLowerCase().includes(v)):demoProducts.filter(p=>p.name.toLowerCase().includes(v))
 return <><CoreHeader title="Search" back={back}/><section className="core-detail-card"><div className="core-searchbox"><Search size={20}/><input autoFocus placeholder="Search people, posts, communities…" value={q} onChange={e=>setQ(e.target.value)}/>{q&&<button onClick={()=>setQ('')}><X size={18}/></button>}</div><div className="core-pills">{['People','Posts','Communities','Products'].map(t=><button className={tab===t?'selected':''} key={t} onClick={()=>setTab(t)}>{t}</button>)}</div>{results.length?results.map(x=>tab==='People'?<UserLink key={x.id} id={x.id} state={state} navigate={navigate}/>:<button className="core-result" key={x.id} onClick={()=>navigate((tab==='Posts'?'post/':tab==='Products'?'product/':'community/')+x.id)}>{x.name||x.text?.slice(0,75)} <ChevronRight size={18}/></button>):<p className="core-muted">No sample {tab.toLowerCase()} found.</p>}</section></>
}
function RequestsScreen({state,patch,back,notify}){
 const pending=Object.entries(state.requests||{}).filter(([,v])=>v)
 return <><CoreHeader title="Demo Follow Requests" back={back}/><section className="core-detail-card"><p className="core-muted">This area simulates privacy approval using local fictional accounts. No actual requests have been sent.</p>{pending.length?pending.map(([id])=><div key={id} className="core-result"><span>{demoUsers[id]?.name||id} · Requested</span><button onClick={()=>{patch('approved',id,true);patch('requests',id,false);notify('Demo request approved locally')}}>Approve</button><button onClick={()=>{patch('requests',id,false);notify('Demo request rejected locally')}}>Reject</button></div>):<p>No pending demo follow requests.</p>}</section></>
}
function Empty({title,back}){return <><CoreHeader title={title} back={back}/><div className="core-private"><p>The requested demo record does not exist.</p></div></>}
export function DemoScreen({route,store,navigate,back,notify}){
 const {state,patch}=store;const [coming,setComing]=useState(null)
 const show=(title,detail)=>setComing({title,detail})
 const [kind,...rest]=route.split('/');const id=decodeURIComponent(rest.join('/'))
 let content=null
 if(kind==='profile')content=<ProfileDetail id={id} state={state} patch={patch} navigate={navigate} notify={notify} back={back} coming={show}/>
 else if(kind==='post')content=<PostDetail id={id} state={state} patch={patch} navigate={navigate} notify={notify} back={back} coming={show}/>
 else if(kind==='media')content=<MediaScreen id={id} state={state} back={back}/>
 else if(kind==='media-product')content=<><CoreHeader title="Product Image" back={back}/><div className="core-media-screen">{demoProducts.find(p=>p.id===id)?<img src={demoProducts.find(p=>p.id===id).image} alt="Product"/>:<p>Image unavailable</p>}</div></>
 else if(kind==='community')content=<CommunityDetail id={id} state={state} patch={patch} navigate={navigate} back={back} coming={show}/>
 else if(kind==='product')content=<ProductDetail id={id} state={state} navigate={navigate} back={back} coming={show}/>
 else if(kind==='privacy')content=<PrivacyScreen state={state} patch={patch} back={back} notify={notify}/>
 else if(kind==='requests')content=<RequestsScreen state={state} patch={patch} back={back} notify={notify}/>
 else if(kind==='discover')content=<SearchScreen state={state} navigate={navigate} back={back}/>
 else content=<Empty title="Not Found" back={back}/>
 return <div className="core-page">{content}{coming&&<ComingSoon title={coming.title} detail={coming.detail} close={()=>setComing(null)}/>}</div>
}
