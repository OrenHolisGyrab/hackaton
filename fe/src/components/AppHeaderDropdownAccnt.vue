<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
      >

        Account
      </CDropdownHeader>
      <CDropdownItem @click="() => logout()">
        <CIcon icon="cil-lock-locked"/> Odhlásit
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatars/8.jpg'
import {useStore} from "vuex";
import router from "../router";

export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    const store = useStore();

    const logout = async () => await store.dispatch('logout');

    return {
      logout,
      avatar: avatar,
      itemsCount: 42,
    }
  },
}
</script>
