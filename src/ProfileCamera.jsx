import {useEffect,useRef,useState} from 'react'
import {Camera,X,Check} from 'lucide-react'
import {referencePortrait} from './designAssets'

const STORAGE_KEY='chatx_demo_profile_photo_v1'
const CHANGE_EVENT='chatx-demo-profile-photo-change'
export function readProfilePhoto(){
 try{return window.localStorage.getItem(STORAGE_KEY)||''}catch{return ''}
}
export function useProfilePhoto(){
 const [photo,setPhoto]=useState(readProfilePhoto)
 useEffect(()=>{
  const update=()=>setPhoto(readProfilePhoto())
  window.addEventListener(CHANGE_EVENT,update)
  window.addEventListener('storage',update)
  return ()=>{window.removeEventListener(CHANGE_EVENT,update);window.removeEventListener('storage',update)}
 },[])
 return photo
}
function save(photo){
 try{
  if(photo)window.localStorage.setItem(STORAGE_KEY,photo)
  else window.localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event(CHANGE_EVENT))
  return true
 }catch{return false}
}
export function ProfilePhoto({className='',alt='Your profile picture',fallback=referencePortrait}){
 const photo=useProfilePhoto()
 return <img className={className} src={photo||fallback} alt={alt}/>
}
/** This is a device-local preview, NOT a cloud upload or a verified user profile. */
export function ProfileCameraControl({notify}){
 const input=useRef(null)
 const [candidate,setCandidate]=useState('')
 const [error,setError]=useState('')
 const [busy,setBusy]=useState(false)
 const photo=useProfilePhoto()
 const select=async e=>{
  const file=e.target.files?.[0];e.target.value=''
  if(!file)return
  if(!file.type.startsWith('image/')){setError('Please select an image.');return}
  if(file.size>12*1024*1024){setError('Choose an image smaller than 12 MB.');return}
  setError('');setBusy(true)
  try{
   const img=await createImageBitmap(file)
   const side=600
   const scale=Math.min(1,side/Math.max(img.width,img.height))
   const canvas=document.createElement('canvas')
   canvas.width=Math.max(1,Math.round(img.width*scale))
   canvas.height=Math.max(1,Math.round(img.height*scale))
   const ctx=canvas.getContext('2d')
   if(!ctx)throw new Error('Image preview could not be created.')
   ctx.drawImage(img,0,0,canvas.width,canvas.height)
   img.close?.()
   setCandidate(canvas.toDataURL('image/jpeg',.78))
  }catch{
   setError('This picture could not be opened. Please choose another one.')
  }finally{setBusy(false)}
 }
 const commit=()=>{
  if(!candidate)return
  if(!save(candidate)){setError('This device could not save the photo. Try a smaller picture.');return}
  setCandidate('');setError('')
  notify?.('Profile photo saved on this device only (demo).')
 }
 return <>
  <input ref={input} type="file" accept="image/*" aria-label="Take or choose profile picture" className="sr-only" onChange={select}/>
  <button type="button" className="cx-profile-camera" onClick={()=>input.current?.click()} aria-label="Change profile picture" title="Change profile picture"><Camera size={23}/></button>
  {busy&&<span className="cx-photo-busy" role="status">Preparing picture…</span>}
  {!!error&&<div className="cx-photo-error" role="alert">{error}<button onClick={()=>setError('')}>Dismiss</button></div>}
  {!!candidate&&<div className="cx-photo-backdrop" onClick={()=>setCandidate('')}><section role="dialog" aria-modal="true" aria-label="Preview new profile photo" className="cx-photo-dialog" onClick={e=>e.stopPropagation()}>
    <header><h2>Profile Photo Preview</h2><button onClick={()=>setCandidate('')} aria-label="Close"><X size={22}/></button></header>
    <img src={candidate} alt="Selected profile picture preview"/>
    <p>This photo will be saved on this device for your Chart-X demo. It will not be uploaded or shared.</p>
    <div><button type="button" onClick={()=>setCandidate('')}>Cancel</button><button type="button" className="cx-photo-save" onClick={commit}><Check size={18}/> Use Photo</button></div>
  </section></div>}
 </>
}

const COVER_KEY='chatx_demo_cover_photo_v1'
const COVER_EVENT='chatx-demo-cover-change'
export function useCoverPhoto(){
 const read=()=>{try{return window.localStorage.getItem(COVER_KEY)||''}catch{return ''}}
 const [cover,setCover]=useState(read)
 useEffect(()=>{
  const refresh=()=>setCover(read())
  window.addEventListener(COVER_EVENT,refresh)
  window.addEventListener('storage',refresh)
  return()=>{window.removeEventListener(COVER_EVENT,refresh);window.removeEventListener('storage',refresh)}
 },[])
 return cover
}
export function CoverCameraControl({notify}){
 const input=useRef(null)
 const [candidate,setCandidate]=useState('')
 const [busy,setBusy]=useState(false)
 const [error,setError]=useState('')
 const select=async event=>{
  const file=event.target.files?.[0]
  event.target.value=''
  if(!file)return
  if(!file.type.startsWith('image/')){setError('Choose an image for your cover.');return}
  if(file.size>12*1024*1024){setError('Choose an image under 12 MB.');return}
  setBusy(true);setError('')
  try{
   const img=await createImageBitmap(file)
   const canvas=document.createElement('canvas')
   const scale=Math.min(1,1100/Math.max(img.width,img.height))
   canvas.width=Math.max(1,Math.round(img.width*scale))
   canvas.height=Math.max(1,Math.round(img.height*scale))
   const ctx=canvas.getContext('2d')
   if(!ctx)throw Error('Canvas unavailable')
   ctx.drawImage(img,0,0,canvas.width,canvas.height)
   img.close?.()
   setCandidate(canvas.toDataURL('image/jpeg',.72))
  }catch{setError('Could not open this image. Try another picture.')}
  finally{setBusy(false)}
 }
 const commit=()=>{
  try{window.localStorage.setItem(COVER_KEY,candidate);window.dispatchEvent(new Event(COVER_EVENT));setCandidate('');notify?.('Cover image saved on this device only (demo).')}
  catch{setError('Not enough device storage. Try another image.')}
 }
 return <>
  <input type="file" ref={input} accept="image/*" className="sr-only" onChange={select} aria-label="Choose new cover image"/>
  <button type="button" className="cx-cover-camera" aria-label="Change cover image" title="Change cover image" onClick={()=>input.current?.click()}><Camera size={25}/></button>
  {busy&&<span className="cx-photo-busy" role="status">Preparing cover…</span>}
  {error&&<div className="cx-photo-error" role="alert">{error}<button onClick={()=>setError('')}>Dismiss</button></div>}
  {candidate&&<div className="cx-photo-backdrop" onClick={()=>setCandidate('')}>
   <section className="cx-photo-dialog" role="dialog" aria-modal="true" aria-label="Preview cover image" onClick={e=>e.stopPropagation()}>
    <header><h2>Cover Photo Preview</h2><button aria-label="Close" onClick={()=>setCandidate('')}><X size={22}/></button></header>
    <img className="cx-cover-preview" src={candidate} alt="New cover preview"/>
    <p>The cover is stored only on this device for the Chart-X demo. No public upload occurs.</p>
    <div><button type="button" onClick={()=>setCandidate('')}>Cancel</button><button type="button" className="cx-photo-save" onClick={commit}><Check size={18}/>Use Cover</button></div>
   </section>
  </div>}
 </>
}
