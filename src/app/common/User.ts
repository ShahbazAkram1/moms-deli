interface Address {
    id?: number;    
     street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  }
  
  enum RoleName {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_CUSTOMER = 'ROLE_CUSTOMER',
    // Add other role names as needed
  }
  
  export interface Role {
    id?: number;
    name: RoleName;
  }
  export interface User {
    id?: number; // Optional, as it may not be available when creating a new user
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    role: string; // Assuming role is a string, adjust as needed
    phone: string;
    addresses: Address[];
    roles: Role[];
    token:string;
    createdAt?: string; 
  }
  