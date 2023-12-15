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
              <CButton v-if="item.btns.longer" color="primary" variant="outline">Prodloužit</CButton>
              <CButton v-if="item.btns.return" :disabled="!!item.returned" color="primary" variant="outline" @click="() => returnBorrowing(item.id)">
                {{ item.returned ? 'Vráceno' : 'Vrátit' }}</CButton>
            </CButtonGroup>

          </CTableDataCell>

        </CTableRow>
      </CTableBody>
    </CTable>

  </div>
</template>

<script>
import { Formats } from "../../utils/utils";
import {useStore} from "vuex";
import {computed} from "vue";
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
    }
  },
}
</script>
