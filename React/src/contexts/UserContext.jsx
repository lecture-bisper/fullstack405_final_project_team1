import {createContext, useContext, useEffect, useState} from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

// 임시 더미 생성
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [
      {name: '유저1', id: 'user1', email: 'user1@example.com', password: '1234', role: 'USER'},
      {name: '유저2', id: 'user2', email: 'user2@example.com', password: '1234', role: 'USER'},
      {name: '유저3', id: 'user3', email: 'user3@example.com', password: '1234', role: 'MANAGER'},
      {name: '유저4', id: 'user4', email: 'user4@example.com', password: '1234', role: 'SENIOR_MANAGER'},
    ];
  });

  // 신규 등록 요청 데이터
  const [newUsers, setNewUsers] = useState([
    { name: '신규1', id: 'new1', email: 'new1@example.com', password: '1234' },
    { name: '신규2', id: 'new2', email: 'new2@example.com', password: '1234' },
    { name: '신규3', id: 'new3', email: 'new3@example.com', password: '1234' },
  ]);

  // 현재 로그인 유저 상태
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 유저 정보 저장
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // 로그인 로직
  const login = (userId, userPw) => {
    console.log(`유저 배열: ${JSON.stringify(users)}`);
    console.log(`입력된 ID : '${userId}', 입력된 PW : '${userPw}'`);
    if (!userId || !userPw) {
      alert("ID와 비밀번호를 모두 입력하세요.");
      return null;
    }

    const user = users.find((user) => user.id === userId && user.password === userPw);
    console.log(`찾은 유저 : ${JSON.stringify(user)}`);
    if (user) {
      if (user.role === 'USER') {
        alert("잘못된 접근입니다. 모바일에서 접속해주세요.");
        return null;
      }
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return user;
    }

    alert("없는 정보입니다. ID 또는 비밀번호를 확인해주세요.");
    return null;
  };

  // 로그아웃
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  // 권한 변경
  const updateUserRole = (id, newRole) => {
    setUsers((prevUsers) =>
        prevUsers.map((user) =>
            user.id === id ? {...user, role: newRole} : user
        )
      );
    };

  // 유저 삭제
  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  // 신규 유저 등록 승인
  const approveUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, {...newUser, role: 'USER'}]);
    setNewUsers((prevNewUsers) => prevNewUsers.filter((user) => user.id !== newUser.id));
  };

  // 신규 유저 등록 거절
  const rejectUser = (id) => {
    setNewUsers((prevNewUsers) => prevNewUsers.filter((user) => user.id !== id));
  };

  // 신규 유저 등록 요청 추가
  const requestNewUser = (newUserRequest) => {
    setNewUsers((prevNewUsers) => [...prevNewUsers, newUserRequest]);
  };

  return (
      <UserContext.Provider value={{
        users,
        newUsers,
        currentUser,
        setUsers,
        setNewUsers,
        setCurrentUser,
        login,
        logout,
        updateUserRole,
        deleteUser,
        approveUser,
        rejectUser,
        requestNewUser,
      }}>
        {children}
      </UserContext.Provider>
  );
};