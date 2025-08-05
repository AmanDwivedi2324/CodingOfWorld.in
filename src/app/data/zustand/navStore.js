import { create } from "zustand";

export const useNavStore = create((set)=>({
    //state for desktop hover menu
    active:null,

    //state for mobile hamburger menu
    isMobileMenuOpen:false,

    //state for mobile accordion menu
    mobileActiveItem:null,

    //action to set the desktop active item
    setActive:(item)=>set({active:item}),
    resetActive:()=>set({active:null}),

    //action to toggle the mobile menu visibility
    toggleMobileMenu: ()=>set((state)=>({
        isMobileMenuOpen: !state.isMobileMenuOpen,
        //reset active mobile item when main menu closes
        mobileActiveItem:null,
    })),

    //action to toggle mobile accordion items (single open at a time)
    setMobileActiveItem: (item) => set((state)=>({
        mobileActiveItem:state.mobileActiveItem === item ? null:item,
    }))
}))