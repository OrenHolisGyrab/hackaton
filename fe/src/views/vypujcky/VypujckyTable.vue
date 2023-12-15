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
              <CButton v-if="item.btns.return" color="primary" variant="outline">Vrátit</CButton>
            </CButtonGroup>
            
          </CTableDataCell>

          <!-- <CTableDataCell>
            <div class="small text-body-secondary">Last login</div>
            <div class="fw-semibold text-nowrap">
            </div>
          </CTableDataCell> -->
        </CTableRow>
      </CTableBody>
    </CTable>

  </div>
</template>

<script>
import { ref } from "vue";
import { Formats } from "../../utils/utils";
export default {
  name: 'Dashboard',
  components: {
  },
  setup() {
    //kód, clovek,od,do, nazev polozky, poznámka, prodlouženo, tkacitka: detail, vrátit, prodlouzit 


    let actions = true;

    let items =
      [
        {
          id: "1234",
          item_code: 'DHM-2002',
          first_name: 'Mark',
          last_name: " Nopeeee",
          email: 'mmm@asd.cz',
          from: '3.3.2000',
          to: '3.5.5000',
          item_name: 'Name',
          note: 'Poznamkskkaksk',
          prolonged: true,
        },

      ].map(i => ({
        ...i,
        from: Formats.date((new Date(i.from)).getTime() / 1000),
        to: Formats.date((new Date(i.to)).getTime() / 1000),
        prolonged: i.prolonged ? "Ano" : "Ne",
        //buttons enabled
        btns: {
          detail: true,
          return: actions,
          longer: actions,
          prolong: true
        }
      }))


    return {
      items,
      actions
    }
  },
}
</script>
