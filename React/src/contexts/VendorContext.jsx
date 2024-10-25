import {createContext, useContext, useEffect, useState} from "react";

const VendorContext = createContext();

export const useVendorContext = () => useContext(VendorContext);

export const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState(
      JSON.parse(localStorage.getItem('Vendors')) || [
        { name: 'A사', email: 'A@vendor.com' },
        { name: 'B사', email: 'B@vendor.com' },
        { name: 'C사', email: 'C@vendor.com' },
      ]
  );

  useEffect(() => {
    localStorage.setItem("Vendors", JSON.stringify(vendors));
  }, [vendors]);

  const addVendor = (newVendor) => {
    setVendors([newVendor, ...vendors]);
  };

  const updateVendor = (index, updatedVendor) => {
    const updatedVendors = vendors.map((vendor, i) =>
        i === index ? updatedVendor : vendor
    );
    setVendors(updatedVendors);
  };

  const deleteVendor = (index) => {
    const updatedVendors = vendors.filter((_, i) => i !== index);
    setVendors(updatedVendors);
  };

  return (
      <VendorContext.Provider value={{ vendors, addVendor, updateVendor, deleteVendor }}>
        {children}
      </VendorContext.Provider>
  );
};