import {createContext, useContext, useEffect, useState} from "react";

const ReqContext = createContext();

export const ReqProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [
      {
        id: 1,
        title: "비품1 신규등록 요청의 건",
        item: "비품1",
        requestTime: "2024-10-01 12:00:00",
        status: "WAIT",
        type: "Y",
        supplier: "A사",
        warehouse: "창고1",
        stock: 100,
        requestQuantity: 10,
        comment: "필요한 이유"
      },
      {
        id: 2,
        title: "비품2 추가구매 요청 드립니다.",
        item: "비품2",
        requestTime: "2024-10-02 13:30:00",
        status: "APPROVE",
        type: "N",
        supplier: "B사",
        warehouse: "창고2",
        stock: 200,
        requestQuantity: 5,
        comment: "추가 구매 요청"
      },
      {
        id: 3,
        title: "비품3 신규등록 요청서",
        item: "비품3",
        requestTime: "2024-10-03 14:45:00",
        status: "UNCONFIRMED",
        type: "Y",
        supplier: "C사",
        warehouse: "창고3",
        selectedImg: "",
        stock: 50,
        requestQuantity: 15,
        comment: "필요성 검토"
      },
      {
        id: 4,
        title: "비품4 신규등록 요청서",
        item: "비품4",
        requestTime: "2024-10-03 14:45:00",
        status: "APPROVE",
        type: "Y",
        supplier: "C사",
        warehouse: "창고3",
        selectedImg: "",
        stock: 50,
        requestQuantity: 15,
        comment: "필요한 이유"
      }
    ];
    setRequests(storedRequests);
  }, []);

  const updateRequest = (updatedRequest) => {
    const updatedRequests = requests.map(req =>
      req.id === updatedRequest.id ? updatedRequest : req
    );
    setRequests(updatedRequests);
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
  };

  const deleteRequest = (id) => {
    const filteredRequests = requests.filter(req => req.id !== id);
    setRequests(filteredRequests);
    localStorage.setItem("requests", JSON.stringify(filteredRequests));
  };

  return (
      <ReqContext.Provider value={{requests, updateRequest, deleteRequest}}>
        {children}
      </ReqContext.Provider>
  );
};

export const useReqContext = () => useContext(ReqContext);