// handle logout function for user
export const handleLogOut = (navigate) => {
    localStorage.clear();
    navigate('/');
};