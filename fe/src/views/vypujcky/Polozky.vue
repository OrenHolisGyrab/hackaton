<template>
  <CNav class="justify-content-end">
    <CNavItem>
      <CNavLink href="#" active>
        <CButton color="primary" size="lg" @click="addItem()">
          Přidat
        </CButton>

      </CNavLink>
    </CNavItem>
  </CNav>
  <div>
    <PolozkyTable />
  </div>


  <CModal :visible="addItemModal" @close="() => { addItemModal = false }">
    <CModalHeader>
      <CModalTitle>Přidat položku</CModalTitle>
    </CModalHeader>
    <CModalBody>


      <CForm>
        <CFormInput type="text" label="Kód položky" placeholder="Kód položky" />
        <CFormInput type="text" label="Nazev položky" placeholder="např. Notebook, klávesnice ..." />
        <CFormTextarea label="Popis" rows="3"></CFormTextarea>
        <CFormInput type="text" label="Místnost" placeholder="Místnost" />
        <CFormInput type="text" label="Datum přidání" placeholder="Datum přidání do inventáře" />
        <CFormInput type="text" label="Výrobní číslo" placeholder="Výrobní číslo" />

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
import PolozkyTable from "./PolozkyTable.vue";

export default {
  name: 'Polozky',
  components: {
    PolozkyTable
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
