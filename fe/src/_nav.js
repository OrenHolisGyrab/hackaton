export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Výpůjčky',
  },
  {
    component: 'CNavItem',
    name: 'Aktivní výpůjčky',
    to: '/vypujcky/aktivni',
    icon: 'cil-apps',
  },
  {
    component: 'CNavItem',
    name: 'Historie',
    to: '/vypujcky/historie',
    icon: 'cil-apps',
  },
  {
    component: 'CNavItem',
    name: 'Položky',
    to: '/vypujcky/polozky',
    icon: 'cil-apps',
  },
  {
    component: 'CNavTitle',
    name: 'Uživatelé',
  },
  {
    component: 'CNavItem',
    name: 'Opravneni',
    to: '/uzivatele/opravneni',
    icon: 'cil-apps',
  },
  
  {
    component: 'CNavTitle',
    name: 'Test',
  },
  {
    component: 'CNavItem',
    name: 'Login',
    to: '/login',
    icon: 'cil-apps',
  },
  
  // {
    //   component: 'CNavItem',
    //   name: 'Error 404',
    //   to: '/404',
    // },
    // {
      //   component: 'CNavItem',
      //   name: 'Error 500',
      //   to: '/500',
      // },
      
    ]
    