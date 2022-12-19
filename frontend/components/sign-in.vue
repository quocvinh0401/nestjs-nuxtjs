<template>
    <div class="flex items-center justify-center w-full h-screen">
        <div class="grid grid-cols-2 gap-4 max-w-4xl">
            <!-- left side -->
            <div class="mt-10">
                <h1 class="font-bold text-5xl text-blue-500 mb-4">Social Network</h1>
                <h3 class="text-2xl">Social Network helps you connect and share with the people in your life.</h3>
            </div>
            <!-- right side -->
            <div class="flex flex-col space-y-4 items-center border rounded-xl p-4 bg-white shadow-md">
                <input type="text" placeholder="Email address or phone number" v-model="payload.login">
                <input type="password" placeholder="Password" v-model="payload.password">
                <button class="bg-blue-500 hover:bg-blue-600 w-full" @click="submit">Log in</button>
                <span class="text-blue-500 cursor-pointer hover:underline">Forgotten password?</span>
                <button class="bg-green-500 hover:bg-green-600" @click="_modal.isOpen = true">Create New
                    Account</button>
            </div>
        </div>
        <modal v-if="_modal.isOpen" @close="closeModal" :title="_modal.title">
            <form-kit type="form" :actions="false" v-model="data">
                <form-kit-schema :schema="schema" :data="data"></form-kit-schema>
            </form-kit>
            <div class="flex justify-center !p-1">
                <button class=" bg-red-500" @click="register">Register</button>
            </div>
        </modal>
    </div>
</template>

<script setup lang="ts">
import { Builder } from 'builder-pattern';
import { Modal as iModal } from '~/shared/interface';
import { getDaysMonthsYears } from '~/libraries/utilities'
import { cloneDeep } from 'lodash'

const _modal = ref<iModal>({ isOpen: false, title: 'Register', data: null })

const router = useRouter()
const { login, principal, authenticationCookie } = usePrincipal()

interface Payload {
    login: string,
    password: string
}

const payload = ref<Payload>({
    login: '',
    password: ''
})

const days = getDaysMonthsYears('days')

const months = getDaysMonthsYears('months')

const years = getDaysMonthsYears('years')

const data = ref<any>(Builder<any>()
    .firstName('')
    .lastName('')
    .login('')
    .password('')
    .gender(undefined)
    .days(days)
    .months(months)
    .years(years)
    .build())

const schema = ref<any>([
    {
        $el: 'div',
        attrs: {
            class: 'grid grid-cols-2 gap-2'
        },
        children: [
            {
                $formkit: 'text',
                name: 'firstName',
                outerClass: '',
                placeholder: 'First Name'
            },
            {
                $formkit: 'text',
                name: 'lastName',
                outerClass: '',
                placeholder: 'Last Name'
            },
        ]
    },
    {
        $formkit: 'text',
        outerClass: 'w-full',
        placeholder: 'Phone Number or Email',
        name: 'login'
    },
    {
        $el: 'div',
        children: [
            {
                $formkit: 'password',
                placeholder: 'Password',
                name: "password",
                validation: "required",
            },
            {
                $formkit: 'password',
                placeholder: 'Confirm Password',
                name: "password_confirm",
                validation: "required|confirm",
            }
        ]
    },
    {
        $el: 'div',
        children: [
            {
                $el: 'div',
                children: 'Day of birth',
            },
            {
                $el: 'div',
                attrs: {
                    class: 'grid grid-cols-3 gap-3'
                },
                label: '',
                children: [
                    {
                        $formkit: 'select',
                        outerClass: 'w-full',
                        name: 'day',
                        options: '$days'
                    },
                    {
                        $formkit: 'select',
                        outerClass: 'w-full',
                        name: 'month',
                        options: '$months'
                    },
                    {
                        $formkit: 'select',
                        outerClass: 'w-full',
                        name: 'year',
                        options: '$years'
                    }
                ]
            }
        ]
    },
    {
        $el: 'div',
        children: [
            {
                $el: 'div',
                children: 'Gender'
            },
            {
                $formkit: 'radio',
                vModel: '$gender',
                name: 'gender',
                options: [
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' }
                ]
            }
        ]
    }
])

const closeModal = () => _modal.value.isOpen = false

const _postRegister = usePost('user/register')

const register = async () => {
    const _ = cloneDeep(data.value)
    const _data = ref<any>(Builder<any>()
        .firstName(_.firstName)
        .lastName(_.lastName)
        .login(_.login)
        .password(_.password)
        .gender(_.gender)
        .dateOfBirth({ day: data.value.day, month: data.value.month, year: data.value.year })
        .build())

    await _postRegister(_data.value).then(() => { closeModal() })

}

const exist = useGet('user', 'exist')
const loginExist = (login: string) => exist({ key: 'login', value: login })

const _postLogin = usePost<any>('user/login')

const submit = async () => {
    if (!payload.value.login || !payload.value.password) return
    if (!await loginExist(payload.value.login)) return

    const [jwt, user] = await _postLogin(payload.value)
    if (!user) return
    console.log('before:', authenticationCookie.value)
    login({ jwt, principal: user })
    console.log('after:', authenticationCookie.value)

}

</script>

<style scoped>
input {
    @apply w-full;
    @apply p-3 rounded-xl border;
    @apply outline-blue-600
}

button {
    @apply px-3 py-2 rounded-xl;
    @apply text-white font-semibold text-xl
}
</style>