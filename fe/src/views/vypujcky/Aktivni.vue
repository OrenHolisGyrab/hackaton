<template>
  <div>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardBody>
            <CRow>
              <CCol :sm="5">
                <h4 id="traffic" class="card-title mb-0">Aktivni

                </h4>
                <div class="small text-body-secondary">January 2021</div>
              </CCol>
              <CCol class="">
                <CButton color="primary" class="float-end" size="lg" @click="pujcit()">
                  Vypůjčit
                </CButton>
              </CCol>
            </CRow>
            <br>
            <CRow>
              <CCol>
                <VypujckyTable :items="vypujcky" :actions="{
                  detail: true,
                  return: true,
                  longer: true,
                }"></VypujckyTable>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

  </div>

  <CModal :visible="vypujcitModal" @close="() => { vypujcitModal = false }">
    <CModalHeader>
      <CModalTitle>Přidat položku</CModalTitle>
    </CModalHeader>
    <CForm onsubmit="save">
      <CModalBody>
        <CFormInput v-model="novaVypujcka.item_code" list="datalistOptions" type="search" label="Kód položky" placeholder="vyhledat" text="todo: skenovat" required />
        <datalist id="datalistOptions">
          <option v-for="item in freeItems" :value="item.code">
          </option>
          <option value="San Francisco"></option>
          <option value="New York"></option>
          <option value="Seattle"></option>
          <option value="Los Angeles"></option>
          <option value="Chicago"></option>
        </datalist>
        <CFormInput v-model="novaVypujcka.email" type="email" label="Student" placeholder="email studenta" required />

        <CFormInput v-model="novaVypujcka.from" type="date" label="Datum vypůjčení" required />
        <CFormInput v-model="novaVypujcka.to" type="date" label="Datum navrácení" required />
        <CFormTextarea v-model="novaVypujcka.note" label="Poznámka" rows="3" required></CFormTextarea>
      </CModalBody>
    </CForm>
    <CModalFooter>
      <CButton color="secondary" @click="() => { vypujcitModal = false }">
        Storno
      </CButton>
      <CButton color="primary" type="submit">Uložit</CButton>
    </CModalFooter>
  </CModal>
</template>
<style>
label {
  margin-top: 10px;
}
</style>
<script>
import { ref, reactive, computed } from "vue";
import VypujckyTable from "./VypujckyTable";
import { REST } from "../../utils/REST";
export default {
  name: 'Aktivni',
  components: {
    VypujckyTable
  },
  setup(context) {

    let vypujcky = ref(
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

      ])

    const vypujcitModal = ref(false);
    const pujcit = () => {
      vypujcitModal.value = true;
      loadItems()
    }

    const novaVypujcka = reactive({});
    const save = () => {
      console.log("save");
      console.log(novaVypujcka);
    }

    const freeItems = ref([]);
    let loadItems = async () => {
      freeItems.value = await REST.GET("lending/free/items");
      console.log(freeItems.value);
    }

    return {
      vypujcky, pujcit, vypujcitModal, novaVypujcka, save, freeItems
    }
  },
}
</script>
