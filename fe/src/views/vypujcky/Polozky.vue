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
    <PolozkyTable :items="items" :actions="{
      edit: true,
      delete: true,
    }"></PolozkyTable>
    <!-- {{ items }} -->
  </div>


  <CModal :visible="addItemModal" @close="() => { addItemModal = false }">
    <CModalHeader>
      <CModalTitle>Opravdu smazat?</CModalTitle>
    </CModalHeader>
    <CModalBody>Pložka bude nenávratně odstranea!</CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { addItemModal = false }">
        Ne
      </CButton>
      <CButton color="danger">Smazat</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>

import { Formats } from "../../utils/utils";
import { ref } from "vue";
import { useStore } from 'vuex'
import PolozkyTable from "./PolozkyTable.vue";

export default {
  name: 'Polozky',
  computed: {
    items() {
      return this.$store.state.items.items.map(i => ({
        ...i,
        added: Formats.date((new Date(i.added)).getTime() / 1000)
      }));
    }
  },
  components: {
    PolozkyTable
  },
  setup() {
    const store = useStore();

    const downloadItems = async () => await store.dispatch('getItems');
    downloadItems();

    const addItemModal = ref(false)
    const addItem = () => {
      addItemModal.value = true;
    }
    return { addItem, addItemModal }
  },
}
</script>
