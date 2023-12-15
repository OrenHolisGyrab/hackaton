<template>
  <div v-if="!error && !session">Loading</div>
  <Login v-if="error && !session"/>
  <router-view v-if="!error && session"/>
</template>
<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useColorModes } from '@coreui/vue'
import Login from "./views/pages/Login";

export default {
  computed: {
    error() {
      return this.$store.state.error;
    },
    session() {
      return this.$store.state.session;
    }
  },
  components: {
    Login,
  },
  setup() {
    const { isColorModeSet, setColorMode } = useColorModes(
      'coreui-free-vue-admin-template-theme',
    )
    const store = useStore()

    onBeforeMount(() => {
      const urlParams = new URLSearchParams(window.location.href.split('?')[1])
      const theme =
        urlParams.get('theme') &&
        urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
      if (theme) {
        setColorMode(theme)
        return
      }

      if (isColorModeSet()) {
        return
      }

      setColorMode(store.state.theme)
    })

    store.dispatch('getSession');
  },
}
</script>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
</style>
