export const initAuthData = () => {
    if (!localStorage.getItem('users')) {
      const initialUsers = [
        {
          name: "Admin User",
          email: "admin@example.com",
          password: "admin123" // Never do this in production
        }
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
  }; 