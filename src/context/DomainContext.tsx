import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Domain {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  available: boolean;
  featured: boolean;
  ownerId?: string;
}

interface DomainContextType {
  domains: Domain[];
  userDomains: Domain[];
  addDomain: (domain: Omit<Domain, 'id'>) => void;
  updateDomain: (id: string, updates: Partial<Domain>) => void;
  deleteDomain: (id: string) => void;
  purchaseDomain: (domainId: string, userId: string) => void;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

export const useDomains = () => {
  const context = useContext(DomainContext);
  if (!context) {
    throw new Error('useDomains must be used within a DomainProvider');
  }
  return context;
};

interface DomainProviderProps {
  children: ReactNode;
}

const initialDomains: Domain[] = [
  {
    id: '1',
    name: 'api.techstart.com',
    category: 'tech',
    price: 29.99,
    description: 'Perfect for API services and tech startups',
    available: true,
    featured: true
  },
  {
    id: '2',
    name: 'shop.modern.com',
    category: 'ecommerce',
    price: 49.99,
    description: 'Ideal for modern e-commerce platforms',
    available: true,
    featured: false
  },
  {
    id: '3',
    name: 'blog.creative.com',
    category: 'creative',
    price: 19.99,
    description: 'Great for creative blogs and portfolios',
    available: true,
    featured: true
  },
  {
    id: '4',
    name: 'app.business.com',
    category: 'business',
    price: 79.99,
    description: 'Professional domain for business applications',
    available: true,
    featured: false
  },
  {
    id: '5',
    name: 'dev.startup.com',
    category: 'startup',
    price: 39.99,
    description: 'Perfect for development and startup projects',
    available: true,
    featured: true
  },
  {
    id: '6',
    name: 'store.fashion.com',
    category: 'ecommerce',
    price: 59.99,
    description: 'Stylish domain for fashion e-commerce',
    available: true,
    featured: false
  },
  {
    id: '7',
    name: 'portfolio.design.com',
    category: 'creative',
    price: 24.99,
    description: 'Showcase your design work beautifully',
    available: true,
    featured: false
  },
  {
    id: '8',
    name: 'saas.platform.com',
    category: 'tech',
    price: 89.99,
    description: 'Premium domain for SaaS platforms',
    available: true,
    featured: true
  },
  {
    id: '9',
    name: 'launch.venture.com',
    category: 'startup',
    price: 69.99,
    description: 'Launch your next big venture',
    available: true,
    featured: false
  },
  {
    id: '10',
    name: 'pro.services.com',
    category: 'business',
    price: 54.99,
    description: 'Professional services domain',
    available: true,
    featured: false
  }
];

export const DomainProvider: React.FC<DomainProviderProps> = ({ children }) => {
  const [domains, setDomains] = useState<Domain[]>(initialDomains);

  const userDomains = domains.filter(domain => !domain.available && domain.ownerId);

  const addDomain = (domainData: Omit<Domain, 'id'>) => {
    const newDomain: Domain = {
      ...domainData,
      id: Math.random().toString(36).substr(2, 9)
    };
    setDomains(prev => [...prev, newDomain]);
  };

  const updateDomain = (id: string, updates: Partial<Domain>) => {
    setDomains(prev => prev.map(domain => 
      domain.id === id ? { ...domain, ...updates } : domain
    ));
  };

  const deleteDomain = (id: string) => {
    setDomains(prev => prev.filter(domain => domain.id !== id));
  };

  const purchaseDomain = (domainId: string, userId: string) => {
    setDomains(prev => prev.map(domain => 
      domain.id === domainId 
        ? { ...domain, available: false, ownerId: userId }
        : domain
    ));
  };

  const value = {
    domains,
    userDomains,
    addDomain,
    updateDomain,
    deleteDomain,
    purchaseDomain
  };

  return (
    <DomainContext.Provider value={value}>
      {children}
    </DomainContext.Provider>
  );
};