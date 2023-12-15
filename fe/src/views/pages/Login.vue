<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="10">
          <div class="clearfix">
            <h1 class=" display-3 me-4 my-center" >Přihlašte se prosím vaším Google účtem</h1>

          </div>
          <RouterLink to="/dashboard">
            <CButton color="primary" size="lg">Login</CButton>
          </RouterLink>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
<style>
.my-center {
  text-align: center;
}
</style>

<script>
export default {
  name: 'Login',
}
</script>
