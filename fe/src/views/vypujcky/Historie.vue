<template>
  <div>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardBody>
            <CRow>
              <CCol :sm="5">
                <h4 id="traffic" class="card-title mb-0">Historie

                </h4>
                <div class="small text-body-secondary">January 2021</div>
              </CCol>
              <CCol :sm="7" class="d-none d-md-block">
                <CButton color="primary" class="float-end">
                  <CIcon icon="cil-cloud-download" />
                </CButton>
              </CCol>
            </CRow>
            <br>
            <CRow>
              <CCol>
                <VypujckyTable :items="vypujcky" :actions="{
                  detail: true,
                  return: false,
                  longer: false,
                }"></VypujckyTable>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

  </div>
</template>

<script>
import { ref } from "vue";
import VypujckyTable from "./VypujckyTable";
export default {
  name: 'Historie',
  components: {
    VypujckyTable
  },
  setup(context) {

    let vypujcky = ref(
      [
        {
          id: "1234",
          item_code: 'DHM-2002',
          first_name: 'NOOOOOOO',
          last_name: " Nopeeee",
          email: 'mmm@asd.cz',
          from: '3.3.2000',
          to: '3.5.5000',
          item_name: 'Name',
          note: 'Poznamkskkaksk',
          prolonged: true,
        },

      ])
    return {
      vypujcky
    }
  },
}
</script>
