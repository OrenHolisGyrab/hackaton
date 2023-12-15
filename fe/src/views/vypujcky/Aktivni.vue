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
              <CCol :sm="7" class="d-none d-md-block">
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
    <CModalBody>
      item_code: 'DHM-2002',
      first_name: 'Mark',
      last_name: " Nopeeee",
      email: 'mmm@asd.cz',
      from: '3.3.2000',
      to: '3.5.5000',
      item_name: 'Name',
      note: 'Poznamkskkaksk',
      prolonged: true,

      <CForm>
        <CFormInput type="text" label="Kód položky" placeholder="codeplaceholder" text="todo: skenovat" />
        <CFormInput type="email" label="Student" placeholder="email studenta" />

        <CFormInput type="date" label="Datum vypůjčení" placeholder=""/>
        <CFormInput type="date" label="Datum vypůjčení" placeholder=""/>
      </CForm>

    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { vypujcitModal = false }">
        Storno
      </CButton>
      <CButton color="primary">Uložit</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { ref } from "vue";
import VypujckyTable from "./VypujckyTable";
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
    }
    return {
      vypujcky, pujcit, vypujcitModal
    }
  },
}
</script>
