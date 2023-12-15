<template>
  <div>
    <!-- <CTable :columns="columns" :items="items" hower striped /> -->
    <CTable class="mb-0 border" hover striped responsive>
      <CTableHead class="text-nowrap">
        <CTableRow>
          <CTableHeaderCell class="bg-body-secondary"> Kód položky</CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary text-center"> Název </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary text-center"> Popis </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary"> Místnost </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary"> Datum přidání </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary"> Výrobní číslo </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary">  </CTableHeaderCell>

        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="item in items" :key="item.id">
          <CTableDataCell class="text-center"> {{ item.code }} </CTableDataCell>
          <CTableDataCell>{{ item.name }} </CTableDataCell>
          <CTableDataCell class="text-center"> {{ item.description }} </CTableDataCell>
          <CTableDataCell> {{ item.room }} </CTableDataCell>
          <CTableDataCell> {{ item.added }} </CTableDataCell>
          <CTableDataCell> {{ item.serial_number }} </CTableDataCell>
          <CTableDataCell>

            <CButtonGroup role="group" aria-label="Basic outlined example">
              <CButton v-if="item.edit" color="primary" variant="outline" @click="() => edit(item.id)">Upravit</CButton>
              <CButton v-if="item.delete" color="primary" variant="outline" @click="() => {deleteConfirm = item.id}">Smazat</CButton>
            </CButtonGroup>

          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>

  </div>

  <CModal :visible="deleteConfirm" @close="() => { deleteConfirm = false }">
    <CModalHeader>
      <CModalTitle>Opravdu smazat?</CModalTitle>
    </CModalHeader>
    <CModalBody>Pložka bude nenávratně odstranea!</CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { deleteConfirm = false }">
        Ne
      </CButton>
      <CButton color="danger" @click="() => removeItem()">Smazat</CButton>
    </CModalFooter>
  </CModal>


</template>

<script>
import {computed, ref} from "vue";
import { useStore } from 'vuex';
import {Formats} from "../../utils/utils";

export default {
  name: 'PolozkyTable',
  components: {
  },
  setup() {
    const store = useStore();

    const downloadItems = async () => await store.dispatch('getItems');
    downloadItems();

    const deleteConfirm = ref(null);
    let edit = (id) => {
      console.log(id);
    }

    const removeItem = async () => {
      await store.dispatch('deleteItem', deleteConfirm.value);
      deleteConfirm.value = null;
    }


    return {
      edit, deleteConfirm, removeItem,
      items: computed(() => store.state.items.items.map(i => ({
        ...i,
        added: Formats.date((new Date(i.added)).getTime() / 1000),
        edit: true,
        delete: true,
      }))),

    }
  },
}
</script>
