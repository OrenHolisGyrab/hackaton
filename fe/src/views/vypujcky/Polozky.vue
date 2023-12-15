<template>
  <CNav class="justify-content-end">
    <CNavItem>
      <CNavLink href="#" active>
        <CButton color="primary" size="lg" @click="addItemDialogOpen()">
          Přidat
        </CButton>

      </CNavLink>
    </CNavItem>
  </CNav>
  <div>
    <PolozkyTable />
  </div>


  <CModal :visible="addItemDialogOpenModal" @close="() => { addItemDialogOpenModal = false }">
    <CModalHeader>
      <CModalTitle>Přidat položku</CModalTitle>
    </CModalHeader>
    <CModalBody>


      <CForm>
        <CFormInput v-model="addItemData.code" type="text" label="Kód položky" placeholder="Kód položky" required/>
        <CFormInput v-model="addItemData.name" type="text" label="Nazev položky" placeholder="např. Notebook, klávesnice ..." required />
        <CFormTextarea v-model="addItemData.description" label="Popis" rows="3"></CFormTextarea>
        <CFormInput v-model="addItemData.room" type="text" label="Místnost" placeholder="Místnost" />
        <CFormInput v-model="addItemData.serial_number" type="text" label="Výrobní číslo" placeholder="Výrobní číslo" />

      </CForm>

    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { addItemDialogOpenModal = false }">
        Storno
      </CButton>
      <CButton color="primary">Uložit</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import { ref, reactive } from "vue";
import PolozkyTable from "./PolozkyTable.vue";
import { useStore } from 'vuex'

export default {
  name: 'Polozky',
  components: {
    PolozkyTable
  },
  setup() {
    const store = useStore();

    const addItemDialogOpenModal = ref(false)
    const addItemDialogOpen = () => {
      addItemDialogOpenModal.value = true;
    }
    const addItem = data => store.dispatch('addItem', data);
    const addItemData = reactive({})

    return { addItemDialogOpen, addItem, addItemDialogOpenModal, addItemData }
  },
}
</script>
