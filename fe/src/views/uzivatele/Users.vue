<template>
  <div>
    <UsersTable />
  </div>


  <CModal :visible="addItemModal" @close="() => { addItemModal = false }">
    <CModalHeader>
      <CModalTitle>Upravit roli</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm>
        <CFormInput type="text" label="Role" placeholder="Role" />
      </CForm>

    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { addItemModal = false }">
        Storno
      </CButton>
      <CButton color="primary">Uložit</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import { ref } from "vue";
import UsersTable from "./UsersTable.vue";

export default {
  name: 'Polozky',
  components: {
    UsersTable
  },
  setup() {
    const addItemModal = ref(false)
    const addItem = () => {
      addItemModal.value = true;
    }
    return { addItem, addItemModal }
  },
}
</script>
