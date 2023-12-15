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
                <VypujckyTable :mode="'active'" :actions="{
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
      <CModalTitle>Vypůjčit</CModalTitle>
    </CModalHeader>
    <CForm :onsubmit="save">
      <CModalBody>
        <CFormInput v-model="novaVypujcka.item" list="datalistOptions" type="search" label="Kód položky" placeholder="vyhledat" text="todo: skenovat" required />
        <datalist id="datalistOptions">
          <option v-for="item in freeItems" :value="item.code" />
        </datalist>
        <CFormInput v-model="novaVypujcka.email" type="email" label="Student" placeholder="email studenta" required />

        <CFormInput v-model="novaVypujcka.from" type="date" label="Datum vypůjčení" required />
        <CFormInput v-model="novaVypujcka.to" type="date" label="Datum navrácení" required />
        <CFormTextarea v-model="novaVypujcka.note" label="Poznámka" rows="3"></CFormTextarea>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { vypujcitModal = false }">
          Storno
        </CButton>
        <CButton color="primary" type="submit">Uložit</CButton>
      </CModalFooter>
    </CForm>
  </CModal>
</template>
<style>
label {
  margin-top: 10px;
}
</style>
<script>
import { ref, reactive } from "vue";
import VypujckyTable from "./VypujckyTable";
import { REST } from "../../utils/REST";
import {useStore} from "vuex";

export default {
  name: 'Aktivni',
  components: {
    VypujckyTable
  },
  setup(context) {
    const store = useStore();

    const vypujcitModal = ref(false);
    const pujcit = () => {
      vypujcitModal.value = true;
      loadItems()
    }

    const novaVypujcka = reactive({});

    const save = async () => {
      await store.dispatch('newBorrowing', novaVypujcka);
      vypujcitModal.value = false
    }

    const freeItems = ref([]);
    let loadItems = async () => {
      freeItems.value = await REST.GET("lending/free/items");
    }

    return {
      pujcit, vypujcitModal, novaVypujcka, save, freeItems
    }
  },
}
</script>
