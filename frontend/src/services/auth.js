// Store user data in local storage
export const setStoredUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  // Retrieve user data from local storage
  export const getStoredUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };
  
  // Remove user data from local storage
  export const removeStoredUser = () => {
    localStorage.removeItem('user');
  };
  
  // Check if the user is authenticated
  export const isAuthenticated = () => {
    const user = getStoredUser();
    return !!user && !!user.token;
  };
  
  // Get the authentication token
  export const getToken = () => {
    const user = getStoredUser();
    return user ? user.token : null;
  };
  
  // Set the authentication token
  export const setToken = (token) => {
    const user = getStoredUser();
    if (user) {
      user.token = token;
      setStoredUser(user);
    }
  };

  // Logout 
  export const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    window.location.reload();

  }