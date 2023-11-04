// Hàm để đọc giá trị accessToken từ cookie
function getAccessTokenFromCookie() {
    const cookie = document.cookie;
    const cookieArray = cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        const cookieItem = cookieArray[i].trim();
        if (cookieItem.startsWith('accessToken=')) {
            return cookieItem.substring('accessToken='.length);
        }
    }

    return null;
}

// Hàm kiểm tra xem người dùng đã đăng nhập hay chưa
export function isLoggedIn() {
    const accessToken = getAccessTokenFromCookie();
    return accessToken !== null;
}