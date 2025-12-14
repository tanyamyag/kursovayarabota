<script setup>
import { useHead } from '@vueuse/head'
import { reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

useHead({
  title: 'Регистрация — Чистота — клининговая компания',
  meta: [
    {
      name: 'description',
      content:
        'Зарегистрируйтесь в системе компании «Чистота» и получите доступ к персональным услугам.'
    }
  ]
})

const router = useRouter()

// Форма
const form = reactive({
  firstName: '',
  lastName: '',
  middleName: '',
  city: '',
  address: '',
  phone: ''
})

// Ошибки
const errors = reactive({
  firstName: '',
  lastName: '',
  middleName: '',
  city: '',
  phone: ''
})

// Проверка текстовых полей
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
  if (!form.firstName.trim() || !form.lastName.trim()) {
    alert('Пожалуйста, введите имя и фамилию.')
    return
  }
  if (!form.city.trim()) {
    alert('Пожалуйста, укажите город.')
    return
  }

  const namePattern = /^[а-яА-ЯёЁa-zA-Z\s-]+$/
  if (!namePattern.test(form.firstName)) {
    alert('Имя может содержать только буквы и дефис.')
    return
  }
  if (!namePattern.test(form.lastName)) {
    alert('Фамилия может содержать только буквы и дефис.')
    return
  }
  if (form.middleName && !namePattern.test(form.middleName)) {
    alert('Отчество может содержать только буквы и дефис.')
    return
  }

  const phoneDigits = form.phone.replace(/\D/g, '')
  if (phoneDigits.length !== 10) {
    alert('Введите корректный номер телефона (10 цифр после +7).')
    return
  }

  alert('Форма регистрации успешно отправлена (демо).')
  router.push('/')
}
</script>

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
            <span class="logo__subtitle"> клининговая компания</span>
          </div>
        </div>

        <h1 class="auth-title">Регистрация</h1>
        <p class="auth-subtitle">
          Пожалуйста, введите свои данные. Мы пришлём SMS для подтверждения
          учётной записи.
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

          <!-- Фамилия -->
          <div class="field">
            <label class="field__label">Фамилия *</label>
            <input
              v-model="form.lastName"
              class="field__input"
              placeholder="Иванов"
              required
              @input="validateTextField('lastName', form.lastName)"
            />
            <p v-if="errors.lastName" class="field__error">{{ errors.lastName }}</p>
          </div>

          <!-- Отчество -->
          <div class="field">
            <label class="field__label">Отчество</label>
            <input
              v-model="form.middleName"
              class="field__input"
              placeholder="Иванович"
              @input="validateTextField('middleName', form.middleName)"
            />
            <p v-if="errors.middleName" class="field__error">{{ errors.middleName }}</p>
          </div>

          <!-- Город -->
          <div class="field">
            <label class="field__label">Город *</label>
            <input
              v-model="form.city"
              class="field__input"
              placeholder="Москва"
              required
              @input="validateTextField('city', form.city)"
            />
            <p v-if="errors.city" class="field__error">{{ errors.city }}</p>
          </div>

          <!-- Адрес -->
          <div class="field">
            <label class="field__label">Адрес</label>
            <input
              v-model="form.address"
              class="field__input"
              placeholder="Улица, дом, квартира"
            />
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

          <button
            type="submit"
            class="btn btn--primary"
            style="margin-top: 10px;"
          >
            Зарегистрироваться
          </button>

          <p class="auth-note">
            Нажимая на кнопку, вы даёте
            <RouterLink to="/privacy-policy" target="_blank">
              согласие на обработку персональных данных
            </RouterLink>.
          </p>

          <p class="auth-note">
            Уже есть аккаунт?
            <RouterLink to="/login">Войти</RouterLink>
          </p>
        </form>
      </div>

      <div class="auth-right"></div>
    </div>
  </div>
</template>

<style scoped>
.field__error {
  color: #e53935;
  font-size: 13px;
  margin-top: 4px;
}
</style>
