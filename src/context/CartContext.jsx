import {createContext,useContext,useMemo,useState} from "react";
const C=createContext(null);
export function CartProvider({children}){const[items,setItems]=useState([]);
const addToCart=p=>setItems(a=>{const x=a.find(i=>i.id===p.id);return x?a.map(i=>i.id===p.id?{...i,quantity:i.quantity+1}:i):[...a,{...p,quantity:1}]});
const decrease=id=>setItems(a=>a.map(i=>i.id===id?{...i,quantity:i.quantity-1}:i).filter(i=>i.quantity>0));
const remove=id=>setItems(a=>a.filter(i=>i.id!==id));const clearCart=()=>setItems([]);
const totalItems=items.reduce((s,i)=>s+i.quantity,0),total=items.reduce((s,i)=>s+i.price*i.quantity,0);
return <C.Provider value={useMemo(()=>({items,addToCart,decrease,remove,clearCart,totalItems,total}),[items,totalItems,total])}>{children}</C.Provider>}
export const useCart=()=>useContext(C);