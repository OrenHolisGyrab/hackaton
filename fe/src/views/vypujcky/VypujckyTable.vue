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
          <CTableHeaderCell class="bg-body-secondary" v-if="actions"> Akce </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="item in items" :key="item.code">
          <CTableDataCell class="text-center">
            <CAvatar size="md" :src="item.avatar.src" :status="item.avatar.status" />
          </CTableDataCell>
          <CTableDataCell>
            <div>{{ item.user.name }}</div>
            <div class="small text-body-secondary text-nowrap">
              <span>{{ item.user.new ? 'New' : 'Recurring' }}</span> |
              {{ item.user.registered }}
            </div>
          </CTableDataCell>
          <CTableDataCell class="text-center">
            <CIcon size="xl" :name="item.country.flag" :title="item.country.name" />
          </CTableDataCell>
          <CTableDataCell>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="fw-semibold">{{ item.usage.value }}%</div>
              <div class="text-nowrap text-body-secondary small ms-3">
                {{ item.usage.period }}
              </div>
            </div>
            <CProgress thin :color="item.usage.color" :value="item.usage.value" />
          </CTableDataCell>
          <CTableDataCell class="text-center">
            <CIcon size="xl" :name="item.payment.icon" />
          </CTableDataCell>
          <CTableDataCell>
            <div class="small text-body-secondary">Last login</div>
            <div class="fw-semibold text-nowrap">
              {{ item.activity }}
            </div>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>

  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: 'Dashboard',
  components: {
  },
  setup() {
    //kód, clovek,od,do, nazev polozky, poznámka, prodlouženo, tkacitka: detail, vrátit, prodlouzit 
    

    //first_name, last_name, email, i.name, i.code

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
        prolonged: prolonged ? "Ano" : "Ne",
        //buttons enabled
        detail: true,
        return: true,
        longer: true,
      }))


    return {
      items,
      actions
    }
  },
}
</script>
