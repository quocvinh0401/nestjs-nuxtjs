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
                <form @keydown.enter="handleLogin" class="grid gap-4 w-full">
                    <input type="text" placeholder="Email address or phone number" v-model="payload.login" autofocus>
                    <div class="relative flex items-center">
                        <input :type="typePassword" placeholder="Password" v-model="payload.password" class="!pr-7">
                        <icon v-if="payload.password"
                            :name="typePassword == 'password' ? 'akar-icons:eye-slashed' : 'akar-icons:eye-open'"
                            class="absolute right-2 text-gray-600" size="20" @click="togglePasswordType" />
                    </div>
                </form>
                <button class="bg-blue-500 hover:bg-blue-600 w-full" @click="handleLogin">Log in</button>
                <span class="text-blue-500 cursor-pointer hover:underline">Forgotten password?</span>
                <button class="bg-green-500 hover:bg-green-600" @click="_modal.isOpen = true">Create New
                    Account</button>
            </div>

        </div>
        <modal v-if="_modal.isOpen" @close="closeModal" :title="_modal.title">
            <div class="w-[28rem]">
                <form-kit ref="registerForm" type="form" :actions="false" v-model="data" @submit="handleSubmit">
                    <form-kit-schema :schema="schema" :data="data"></form-kit-schema>
                </form-kit>
                <div class="flex justify-center !p-1">
                    <button class=" bg-red-500" @click="submitAction">Register</button>
                </div>
            </div>
        </modal>
    </div>
</template>

<script setup lang="ts">
import { Builder } from 'builder-pattern';
import { Modal as iModal } from '~/shared/interface';
import { getDaysMonthsYears, isValidDate } from '~/libraries/utilities'
import { cloneDeep } from 'lodash'

const _modal = ref<iModal>({ isOpen: false, title: 'Register', type: '', data: null })

const router = useRouter()
const { login, currentUser, authenticationCookie, authentication } = usePrincipal()

interface Payload {
    login: string,
    password: string
}

const payload = ref<Payload>({
    login: '',
    password: ''
})

const typePassword = ref<string>('password')

const togglePasswordType = () => {
    if (typePassword.value == 'password') typePassword.value = 'text'
    else typePassword.value = 'password'
}

const data = ref<any>(Builder<any>()
    .firstName('')
    .lastName('')
    .login('')
    .password('')
    .gender('male')
    .isErrorDate(false)
    .days(getDaysMonthsYears('days'))
    .months(getDaysMonthsYears('months'))
    .years(getDaysMonthsYears('years'))
    .day(1)
    .month(1)
    .year(new Date().getFullYear())
    .build())

watch(() => [data.value.day, data.value.month, data.value.year], ([d, m, y]) => {
    data.value.isErrorDate = isValidDate(d, m, y) ? false : true
})

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
                placeholder: 'First name',
                validation: 'required',
                validationMessages: {
                    'required': 'First name is required',
                }
            },
            {
                $formkit: 'text',
                name: 'lastName',
                outerClass: '',
                placeholder: 'Last name',
                validation: 'required',
                validationMessages: {
                    'required': 'Last name is required',
                }
            },
        ]
    },
    {
        $formkit: 'text',
        outerClass: 'w-full',
        placeholder: 'Phone number or Email',
        name: 'login',
        validation: 'required|length:6,32',

    },
    {
        $el: 'div',
        children: [
            {
                $formkit: 'password',
                placeholder: 'Password',
                name: "password",
                validation: "required|length:4,32",
            },
            {
                $formkit: 'password',
                placeholder: 'Confirm password',
                name: "password_confirm",
                validation: "required|confirm",
                validationMessages: {
                    'required': 'Confirm password is required',
                    'confirm': 'The password confirmation does not match'
                }
            }
        ]
    },
    {
        $el: 'div',
        attrs: {
            class: 'relative'
        },
        children: [
            {
                $el: 'div',
                attrs: {
                    class: 'text-sm font-semibold'
                },
                children: 'Date of birth',
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
            },
            {
                $el: 'div',
                attrs: {
                    class: 'absolute bottom-0 text-sm text-red-500'
                },
                if: '$isErrorDate',
                children: 'Invalid date'
            }
        ]
    },
    {
        $el: 'div',
        children: [
            {
                $el: 'div',
                attrs: {
                    class: 'text-sm font-semibold'
                },
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

const registerForm = ref<any>()

const submitAction = () => registerForm.value.node.submit()


const handleSubmit = async () => {
    if (data.value.isErrorDate) return

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
const loginExist = (login: string) => exist({ key: 'userId', value: login })

const _postLogin = usePost<any>('user/login')

const handleLogin = async () => {
    if (!payload.value.login || !payload.value.password) return
    if (!await loginExist(payload.value.login)) return

    const [jwt, user] = await _postLogin(payload.value)
    if (!user) return
    login({ jwt, currentUser: user })
    // router.push('/profile?userId=74069327-c5c1-460e-92c7-9af307dc23e6')
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