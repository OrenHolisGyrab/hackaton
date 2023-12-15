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
          <CTableDataCell v-if="item.first_name">
            <div>{{ item.first_name }} {{ item.last_name }} ({{ item.email }})</div>
          </CTableDataCell>
          <CTableDataCell class="text-center"> {{ item.from }} </CTableDataCell>
          <CTableDataCell> {{ item.to }} </CTableDataCell>
          <CTableDataCell> {{ item.item_name }} </CTableDataCell>
          <CTableDataCell> {{ item.prolonged }} </CTableDataCell>
          <CTableDataCell> {{ item.note }} </CTableDataCell>
          <CTableDataCell>

            <CButtonGroup role="group" aria-label="Basic outlined example">
              <CButton v-if="item.btns.detail" color="primary" variant="outline" @click="() => openDetail(item.item)">Detail</CButton>
              <CButton v-if="item.btns.longer" color="primary" variant="outline" @click="() => {
                const [date, month, year] = item.to.split('. ');

                prodlouzitModal = item.id;
                prodlouzitData.note = item.note;
                prodlouzitData.to = (new Date(`${year}-${month}-${date}`)).toISOString().substring(0,10);
              }">Prodloužit</CButton>
              <CButton v-if="item.btns.return" :disabled="!!item.returned" color="primary" variant="outline" @click="() => returnBorrowing(item.id)">
                {{ item.returned ? 'Vráceno' : 'Vrátit' }}</CButton>
            </CButtonGroup>

          </CTableDataCell>

        </CTableRow>
      </CTableBody>
    </CTable>

  </div>

  <CModal :visible="prodlouzitModal" @close="() => { prodlouzitModal = null }">
    <CModalHeader>
      <CModalTitle>Prodloužit</CModalTitle>
    </CModalHeader>
    <CForm :onsubmit="prodlouzit">
      <CModalBody>
        <CFormInput v-model="prodlouzitData.to" type="date" label="Nové datum navrácení" required />
        <CFormTextarea v-model="prodlouzitData.note" label="Poznámka" rows="3"></CFormTextarea>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { prodlouzitModal = null }">
          Storno
        </CButton>
        <CButton color="primary" type="submit" @click="prodlouzit">Uložit</CButton>
      </CModalFooter>
    </CForm>
  </CModal>

  <CModal :visible="detailModal" @close="() => { detailModal = false }">
    <CModalHeader>
      <CModalTitle>Detail položky</CModalTitle>
    </CModalHeader>
    <div class="item-detail">
      <div
        v-for="item in [{
          key: 'name',
          text: 'Název'
        },{
          key: 'code',
          text: 'Kód'
        },{
          key: 'description',
          text: 'Popis'
        },{
          key: 'room',
          text: 'Místnost'
        },{
          key: 'serial_number',
          text: 'Sériové číslo'
        }]"
        :key="item.key"
      >
        {{ item.text }}: {{ detailModal[item.key] }}
      </div>
    </div>
  </CModal>
</template>

<script>
import { Formats } from "../../utils/utils";
import {useStore} from "vuex";
import {computed, ref, reactive} from "vue";
import {REST} from "../../utils/REST";
export default {
  name: 'Dashboard',
  components: {
  },
  props: ['mode', 'actions'],
  setup(context) {
    const store = useStore();
    let actions = true;

    const downloadItems = async () => await store.dispatch('getBorrowings', context.mode || '');
    downloadItems();

    const returnBorrowing = id => store.dispatch('returnBorrowing', id);

    const detailModal = ref(null);

    const prodlouzitModal = ref(null);
    const prodlouzitData = reactive({})
    const prodlouzit = async () => {
      await store.dispatch('prolongeBorrowing', {
        id: prodlouzitModal.value,
        data: {note: prodlouzitData.note, to: prodlouzitData.to}
      })
      prodlouzitModal.value = null;

    }

    const openDetail = async itemId => {
      detailModal.value = await REST.GET(`items/${itemId}`);
    }

    return {
      detailModal,
      openDetail,
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
