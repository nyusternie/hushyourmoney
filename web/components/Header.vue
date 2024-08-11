<script setup lang="ts">
/* Define properties. */
// https://vuejs.org/guide/components/props.html#props-declaration
const props = defineProps({
    data: {
        type: [Object],
    },
})

const search = ref(null)

const isMenuOpen = ref(false)
const isMobileMenuOpen = ref(false)

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <header class="bg-indigo-600 pb-24">
        <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div class="relative flex items-center justify-center py-3 lg:justify-between">
                <!-- Logo -->
                <div class="absolute left-0 flex-shrink-0 lg:static">
                    <NuxtLink to="/">
                        <span class="sr-only">Hush Your Money</span>
                        <img
                            class="h-8 w-auto" src="~/assets/icon.png" alt="Hush Your Money" />
                    </NuxtLink>
                </div>

                <!-- Right section on desktop -->
                <div class="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5 gap-4">
                    <NuxtLink to="/treasury" type="button" class="relative flex-shrink-0 rounded-full p-1 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                        <span class="absolute -inset-1.5"></span>
                        <span class="sr-only">Open Treasury</span>

                        <svg class="h-6 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"></path>
                        </svg>
                    </NuxtLink>

                    <NuxtLink to="/diary" type="button" class="relative flex-shrink-0 rounded-full p-1 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                        <span class="absolute -inset-1.5"></span>
                        <span class="sr-only">Open Wealth Diary</span>

                        <svg class="h-6 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"></path>
                          </svg>
                    </NuxtLink>

                    <!-- Profile dropdown -->
                    <div class="relative ml-4 flex-shrink-0">
                        <div>
                            <button
                                @click="isMenuOpen = !isMenuOpen"
                                type="button"
                                class="relative flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100"
                                id="user-menu-button"
                                aria-expanded="false"
                                aria-haspopup="true"
                            >
                                <span class="absolute -inset-1.5"></span>
                                <span class="sr-only">Open user menu</span>
                                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            </button>
                        </div>

                        <!--
              Dropdown menu, show/hide based on menu state.

              Entering: ""
                From: ""
                To: ""
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
                        <div
                            v-if="isMenuOpen"
                            class="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="user-menu-button"
                            tabindex="-1"
                        >
                            <!-- Active: "bg-gray-100", Not Active: "" -->
                            <NuxtLink to="/treasury" @click="isMenuOpen = false" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">
                                My Treasury
                            </NuxtLink>

                            <!-- Active: "bg-gray-100", Not Active: "" -->
                            <NuxtLink to="/diary" @click="isMenuOpen = false" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">
                                My Diary
                            </NuxtLink>

                            <!-- Active: "bg-gray-100", Not Active: "" -->
                            <NuxtLink to="/profile" @click="isMenuOpen = false" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">
                                My Profile
                            </NuxtLink>

                            <!-- Active: "bg-gray-100", Not Active: "" -->
                            <NuxtLink to="/" @click="isMenuOpen = false" class="block px-4 py-2 text-sm text-red-600" role="menuitem" tabindex="-1" id="user-menu-item-2">
                                End Session

                                <svg class="inline h-6 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"></path>
                                </svg>
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Search help & settings -->
                <div class="min-w-0 flex-1 px-12 lg:hidden">
                    <div class="mx-auto w-full max-w-xs">
                        <label for="desktop-search" class="sr-only">Search help & settings</label>
                        <div class="relative text-white focus-within:text-gray-600">
                            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                                </svg>
                            </div>

                            <input
                                v-model="search"
                                class="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                                placeholder="Search help & settings"
                                type="search"
                            />
                        </div>
                    </div>
                </div>

                <!-- Menu button -->
                <div class="absolute right-0 flex-shrink-0 lg:hidden">
                    <!-- Mobile menu button -->
                    <button
                        @click="isMobileMenuOpen = true"
                        type="button"
                        class="relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-indigo-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        aria-expanded="false"
                    >
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">Open main menu</span>
                        <!-- Menu open: "hidden", Menu closed: "block" -->
                        <svg class="block h-8 w-auto" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <!-- Menu open: "block", Menu closed: "hidden" -->
                        <svg class="hidden h-8 w-auto" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="hidden border-t border-white border-opacity-20 py-5 lg:block">
                <div class="grid grid-cols-3 items-center gap-8">
                    <div class="col-span-2">
                        <nav class="flex space-x-4">
                            <!-- Current: "text-white", Default: "text-indigo-100" -->
                            <NuxtLink to="/lobby" class="rounded-md bg-white bg-opacity-0 px-3 py-2 text-xl font-medium text-white hover:bg-opacity-10 tracking-widest" aria-current="page">
                                Lobby
                            </NuxtLink>

                            <NuxtLink to="/treasury" class="rounded-md bg-white bg-opacity-0 px-3 py-2 text-xl font-medium text-white hover:bg-opacity-10 tracking-widest" aria-current="page">
                                Treasury
                            </NuxtLink>

                            <NuxtLink to="/diary" class="rounded-md bg-white bg-opacity-0 px-3 py-2 text-xl font-medium text-white hover:bg-opacity-10 tracking-widest" aria-current="page">
                                Diary
                            </NuxtLink>

                            <NuxtLink to="/sponsors" class="rounded-md bg-white bg-opacity-0 px-3 py-2 text-xl font-medium text-rose-300 hover:bg-opacity-10 tracking-widest">
                                Sponsors

                                <svg class="inline h-6 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
                                </svg>
                            </NuxtLink>

                            <NuxtLink to="/help" class="rounded-md bg-white bg-opacity-0 px-3 py-2 text-xl font-medium text-white hover:bg-opacity-10 tracking-widest" aria-current="page">
                                Need help?
                            </NuxtLink>

                        </nav>
                    </div>

                    <div>
                        <div class="mx-auto w-full max-w-md">
                            <label for="mobile-search" class="sr-only">Search help / settings / advanced features</label>
                            <div class="relative text-white focus-within:text-gray-600">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
                                    </svg>
                                </div>

                                <input
                                    id="mobile-search"
                                    class="block w-full rounded-md border-0 bg-white/20 py-1.5 pl-10 pr-3 text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-base sm:leading-6"
                                    placeholder="Search help / settings / advanced features"
                                    type="search"
                                    name="search"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on mobile menu state. -->
        <div v-if="isMobileMenuOpen" class="lg:hidden">
            <!--
        Mobile menu overlay, show/hide based on mobile menu state.

        Entering: "duration-150 ease-out"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "duration-150 ease-in"
          From: "opacity-100"
          To: "opacity-0"
      -->
            <div class="fixed inset-0 z-20 bg-black bg-opacity-25" aria-hidden="true"></div>

            <!--
        Mobile menu, show/hide based on mobile menu state.

        Entering: "duration-150 ease-out"
          From: "opacity-0 scale-95"
          To: "opacity-100 scale-100"
        Leaving: "duration-150 ease-in"
          From: "opacity-100 scale-100"
          To: "opacity-0 scale-95"
      -->
            <div class="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition">
                <div class="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div class="pb-2 pt-3">
                        <div class="flex items-center justify-between px-4">
                            <div>
                                <img
                                    class="h-10 w-auto"
                                    src="~/assets/icon.png"
                                    alt="Hush Your Money"
                                />
                            </div>

                            <div class="-mr-2">
                                <button
                                    @click="isMobileMenuOpen = false"
                                    type="button"
                                    class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                >
                                    <span class="absolute -inset-0.5"></span>
                                    <span class="sr-only">Close menu</span>
                                    <svg class="h-10 w-auto" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="mt-3 space-y-1 px-2">
                            <NuxtLink to="/lobby" @click="isMobileMenuOpen = false" class="block rounded-md px-3 py-2 text-xl font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">
                                Lobby
                                <span class="text-xs text-sky-600 uppercase">
                                    Club Flux
                                </span>
                            </NuxtLink>

                            <NuxtLink to="/clubs" @click="isMobileMenuOpen = false" class="block rounded-md px-3 py-2 text-xl font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">
                                Clubs Directory
                            </NuxtLink>

                            <NuxtLink to="/sponsors" @click="isMobileMenuOpen = false" class="block rounded-md px-3 py-2 text-xl font-medium text-rose-500 hover:bg-gray-100 hover:text-rose-500">
                                Sponsors

                                <svg class="inline h-6 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
                                </svg>
                            </NuxtLink>

                            <NuxtLink to="/help" @click="isMobileMenuOpen = false" class="block rounded-md px-3 py-2 text-xl font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">
                                Need help?
                            </NuxtLink>
                        </div>
                    </div>

                    <div class="pb-2 pt-4">
                        <div class="flex items-center px-5">
                            <div class="flex-shrink-0">
                                <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                            </div>

                            <div class="ml-3 min-w-0 flex-1">
                                <div class="truncate text-base font-medium text-gray-800">Tom Cook</div>
                                <div class="truncate text-sm font-medium text-gray-500">tom@example.com</div>
                            </div>

                            <button type="button" class="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span class="absolute -inset-1.5"></span>
                                <span class="sr-only">View notifications</span>
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div class="mt-3 space-y-1 px-2">
                            <NuxtLink to="/treasury" @click="isMobileMenuOpen = false" class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">
                                My Treasury
                            </NuxtLink>

                            <NuxtLink to="/diary" @click="isMobileMenuOpen = false" class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">
                                My Diary
                            </NuxtLink>

                            <NuxtLink to="/profile" @click="isMobileMenuOpen = false" class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800">
                                My Profile
                            </NuxtLink>

                            <NuxtLink to="/" @click="isMobileMenuOpen = false" class="block rounded-md px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-100 hover:text-gray-800">
                                End Session

                                <svg class="inline h-6 w-auto" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"></path>
                                </svg>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
