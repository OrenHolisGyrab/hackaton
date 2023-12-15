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
              <CButton v-if="item.btns.edit" color="primary" variant="outline" @click="() => edit(item.id)">Upravit</CButton>
              <CButton v-if="item.btns.delete" color="primary" variant="outline" @click="() => remove(item.id)">Smazat</CButton>
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
      <CButton color="danger">Smazat</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { ref } from "vue";
import { Formats } from "../../utils/utils";
export default {
  name: 'PolozkyTable',
  props: {
    items: {
      type: Array,
      default: []
    },
    actions: {
      type: Object,
      default: {
        edit: true,
        delete: true,
      }
    }
  },
  components: {
  },
  setup(context) {

    let items = context.items;
    console.log(items);




    items = items.map(i => ({
      ...i,

      //buttons enabled
      btns: {
        ...context.actions
      }
    }))

    const deleteConfirm = ref(false);
    let edit = (id) => {
      console.log(id);
    }
    let remove = (id) => {
      deleteConfirm.value = true;
      console.log(id);
    }


    return {
      items, edit, remove, deleteConfirm
    }
  },
}
</script>
