<template>
  <div>
    <CRow>
      <CCol :md="12">
        <CCard class="mb-4">
          <CCardBody>
            <CRow>
              <CCol :sm="5">
                <h4 id="traffic" class="card-title mb-0">Historiex</h4>
              </CCol>
            </CRow>
            <br>
            <CRow>
              <CCol>
                <VypujckyTable :mode="'/historic'" :actions="{
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
  setup(context) {},
}
</script>
