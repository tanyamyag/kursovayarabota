<template>
  <div class="page">
    <div class="auth-layout">
      <div class="auth-left">
        <button class="auth-back" type="button" @click="$router.back()">
          ← Назад
        </button>

        <div class="logo" style="margin-bottom: 18px;">
          <div class="logo__icon">Ч</div>
          <div class="logo__text">
            <span class="logo__title">Чистота</span>
            <span class="logo__subtitle">клининговая компания</span>
          </div>
        </div>

        <h1 class="auth-title">Войти в аккаунт</h1>
        <p class="auth-subtitle">
          Пожалуйста, введите своё имя и номер телефона. Мы отправим SMS с кодом
          для подтверждения входа.
        </p>

        <form class="auth-form" @submit.prevent="submit">
          <!-- Имя -->
          <div class="field">
            <label class="field__label">Имя *</label>
            <input
              v-model="form.firstName"
              class="field__input"
              placeholder="Иван"
              required
              @input="validateTextField('firstName', form.firstName)"
            />
            <p v-if="errors.firstName" class="field__error">{{ errors.firstName }}</p>
          </div>

          <!-- Телефон -->
          <div class="field">
            <label class="field__label">Телефон *</label>
            <div class="auth-phone">
              <div class="auth-phone__flag">
                <span class="auth-phone__flag-emoji">🇷🇺</span>
                <span>+7</span>
              </div>
              <input
                v-model="form.phone"
                class="field__input"
                placeholder="999 999-99-99"
                required
                @input="validatePhone(form.phone)"
              />
            </div>
            <p v-if="errors.phone" class="field__error">{{ errors.phone }}</p>
          </div>

          <button type="submit" class="btn btn--primary" style="margin-top: 10px;">
            Продолжить
          </button>

          <p class="auth-note">
            Нажимая на кнопку, вы даёте
            <RouterLink to="/privacy-policy" target="_blank">
              согласие на обработку персональных данных
            </RouterLink>.
          </p>

          <p class="auth-note">
            Нет аккаунта?
            <RouterLink to="/register">Зарегистрироваться</RouterLink>
          </p>
        </form>
      </div>

      <div class="auth-right"></div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useHead } from '@vueuse/head'

// ✅ SEO
useHead({
  title: 'Вход в систему — Чистота — клининговая компания',
  meta: [
    {
      name: 'description',
      content: 'Авторизация для клиентов и сотрудников компании «Чистота».'
    },
    {
      name: 'keywords',
      content: 'вход, авторизация, чистота, клининговая компания, клининг'
    }
  ]
})

// ✅ Основная логика
const router = useRouter()

const form = reactive({
  firstName: '',
  phone: ''
})

const errors = reactive({
  firstName: '',
  phone: ''
})

// Проверка текстового поля (имени)
const validateTextField = (field, value) => {
  const pattern = /^[а-яА-ЯёЁa-zA-Z\s-]*$/
  if (!pattern.test(value)) {
    errors[field] = 'Разрешены только буквы и дефис.'
  } else {
    errors[field] = ''
  }
}

// Проверка телефона
const validatePhone = (value) => {
  const digits = value.replace(/\D/g, '')
  if (!/^[0-9\s-]*$/.test(value)) {
    errors.phone = 'Разрешены только цифры, пробел и дефис.'
  } else if (digits.length > 0 && digits.length < 10) {
    errors.phone = 'Номер должен содержать 10 цифр.'
  } else {
    errors.phone = ''
  }
}

// Отправка формы
const submit = () => {
  if (!form.firstName.trim()) {
    alert('Пожалуйста, введите имя.')
    return
  }

  if (!form.phone.trim()) {
    alert('Пожалуйста, введите номер телефона.')
    return
  }

  const namePattern = /^[а-яА-ЯёЁa-zA-Z\s-]+$/
  if (!namePattern.test(form.firstName)) {
    alert('Имя может содержать только буквы и дефис.')
    return
  }

  const phoneDigits = form.phone.replace(/\D/g, '')
  if (phoneDigits.length !== 10) {
    alert('Введите корректный номер телефона (10 цифр после +7).')
    return
  }

  alert('Вход по SMS-коду (демо).')
  router.push('/')
}
</script>

<style scoped>
.field__error {
  color: #e53935;
  font-size: 13px;
  margin-top: 4px;
}
</style>
