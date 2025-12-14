import { createRouter, createWebHistory } from 'vue-router'

// ✅ Lazy Loading — динамическая загрузка компонентов
const HomeView = () => import('../views/HomeView.vue')
const AboutView = () => import('../views/AboutView.vue')
const PricingView = () => import('../views/PricingView.vue')
const RegisterView = () => import('../views/RegisterView.vue')
const LoginView = () => import('../views/LoginView.vue')
const EmployeesView = () => import('../views/EmployeesView.vue')
const EmployeeDetailView = () => import('../views/EmployeeDetailView.vue')
const PrivacyPolicyView = () => import('../views/PrivacyPolicyView.vue')
const FaqView = () => import('../views/FaqView.vue')

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/pricing', name: 'pricing', component: PricingView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/login', name: 'login', component: LoginView },

  // 👇 Пример защищённых маршрутов
  { 
    path: '/employees', 
    name: 'employees', 
    component: EmployeesView, 
    meta: { requiresAuth: true }  // защищённый маршрут
  },
  { 
    path: '/employees/:id', 
    name: 'employee-detail', 
    component: EmployeeDetailView,
    meta: { requiresAuth: true }  // защищённый маршрут
  },

  { path: '/privacy-policy', name: 'privacy-policy', component: PrivacyPolicyView },
  { path: '/faq', name: 'faq', component: FaqView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})


// ✅ Проверка авторизации перед переходом
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') // токен авторизации (или другой флаг входа)
  if (to.meta.requiresAuth && !token) {
    console.warn('❌ Нет токена — переход запрещён, перенаправление на /login')
    next('/login')
  } else {
    next()
  }
})

export default router
