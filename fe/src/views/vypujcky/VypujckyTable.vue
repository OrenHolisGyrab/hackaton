<template>
  <div>
    <!-- <CTable :columns="columns" :items="items" hower striped /> -->
    <CTable class="mb-0 border" hover striped responsive>
      <CTableHead class="text-nowrap">
        <CTableRow>
          <CTableHeaderCell class="bg-body-secondary"> Kód </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary text-center"> Člověk </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary text-center"> Od </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary"> Do </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary"> Nazev </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary"> Prodlouženo </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary"> Poznámka </CTableHeaderCell>
          <CTableHeaderCell class="bg-body-secondary"> Akce </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="item in items" :key="item.code">
          <CTableDataCell class="text-center"> {{ item.item_code }} </CTableDataCell>
          <CTableDataCell>
            <div>{{ item.first_name }} {{ item.last_name }} ({{ item.email }})</div>
          </CTableDataCell>
          <CTableDataCell class="text-center"> {{ item.from }} </CTableDataCell>
          <CTableDataCell> {{ item.to }} </CTableDataCell>
          <CTableDataCell> {{ item.item_name }} </CTableDataCell>
          <CTableDataCell> {{ item.prolonged }} </CTableDataCell>
          <CTableDataCell> {{ item.note }} </CTableDataCell>
          <CTableDataCell>

            <CButtonGroup role="group" aria-label="Basic outlined example">
              <CButton v-if="item.btns.detail" color="primary" variant="outline">Detail</CButton>
              <CButton v-if="item.btns.longer" color="primary" variant="outline" @click="() => prodlouzitModal = true">Prodloužit</CButton>
              <CButton v-if="item.btns.return" :disabled="!!item.returned" color="primary" variant="outline" @click="() => returnBorrowing(item.id)">
                {{ item.returned ? 'Vráceno' : 'Vrátit' }}</CButton>
            </CButtonGroup>

          </CTableDataCell>

        </CTableRow>
      </CTableBody>
    </CTable>

  </div>

  <CModal :visible="prodlouzitModal" @close="() => { prodlouzitModal = false }">
    <CModalHeader>
      <CModalTitle>Prodloužit</CModalTitle>
    </CModalHeader>
    <CForm :onsubmit="prodlouzit">
      <CModalBody>
        <CFormInput v-model="prodlouzit.to" type="date" label="Nové datum navrácení" required />
        <CFormTextarea v-model="prodlouzit.note" label="Poznámka" rows="3"></CFormTextarea>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { prodlouzitModal = false }">
          Storno
        </CButton>
        <CButton color="primary" type="submit">Uložit</CButton>
      </CModalFooter>
    </CForm>
  </CModal>
</template>

<script>
import { Formats } from "../../utils/utils";
import {useStore} from "vuex";
import {computed, ref, reactive} from "vue";
export default {
  name: 'Dashboard',
  components: {
  },
  props: ['mode', 'actions'],
  setup(context) {
    const store = useStore();
    let actions = true;

    const downloadItems = async () => await store.dispatch('getBorrowings', context.mode);
    downloadItems();

    const returnBorrowing = id => store.dispatch('returnBorrowing', id);


    

    const prodlouzitModal = ref(false);
    const prodlouzitData = reactive({})
    const prodlouzit = () => {
      //todo odeslat na server 
      prodlouzitModal.value = false;

    }

    return {
      returnBorrowing,
      actions,
      items: computed(() => store.state.borrowings.list.map(i => ({
        ...i,
        from: Formats.date((new Date(i.from)).getTime() / 1000),
        to: Formats.date((new Date(i.to)).getTime() / 1000),
        prolonged: i.prolonged ? "Ano" : "Ne",
        //buttons enabled
        btns: context.actions
      }))),
      prodlouzit,prodlouzitData,prodlouzitModal
    }
  },
}
</script>
