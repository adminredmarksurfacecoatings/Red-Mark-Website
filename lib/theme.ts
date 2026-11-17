export const THEME_KEY = 'redmark-theme-v1'
export type ThemePreference = 'system' | 'light' | 'dark'
export const THEME_INIT_SCRIPT = `(function(){var p='system';try{var s=localStorage.getItem('redmark-theme-v1');if(s==='dark'||s==='light')p=s}catch(e){}document.documentElement.dataset.theme=p==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p})()`
