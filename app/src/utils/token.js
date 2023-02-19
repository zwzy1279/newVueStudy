//对外暴露一个函数
export const setToken=(token)=>{
    localStorage.setItem('TOKEN',token);
}//当用户一刷新页面，还是存储在应用程序的本地存储中

export const getToken=()=>{
    localStorage.getItem('TOKEN');
} //token:localStorage.getItem('TOKEN'),

export const removeToken=()=>{
    localStorage.removeItem('TOKEN');
}