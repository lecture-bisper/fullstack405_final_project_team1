import {create} from "zustand";

const useVendorStore = create((set) => ({
  vendors: JSON.parse(localStorage.getItem("Vendors")) || [
    { name: 'A사', email: 'A@vendor.com' },
    { name: 'B사', email: 'B@vendor.com' },
    { name: 'C사', email: 'C@vendor.com' },
    { name: 'D사', email: 'D@vendor.com' },
    { name: 'E사', email: 'E@vendor.com' },
    { name: 'F사', email: 'F@vendor.com' },
    { name: 'G사', email: 'G@vendor.com' },
    { name: 'H사', email: 'H@vendor.com' },
  ],

  // 거래처 추가
  addVendor: (newVendor) => set((state) => {
    const updatedVendors = [...state.vendors, newVendor];
    localStorage.setItem("Vendors", JSON.stringify(updatedVendors));
    return { vendors: updatedVendors}
  }),
}));


export default useVendorStore;