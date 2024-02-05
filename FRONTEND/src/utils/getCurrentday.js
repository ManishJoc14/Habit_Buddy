export const getCurrentday = ()=>{
   return new Date().toISOString().split('T')[0]
}