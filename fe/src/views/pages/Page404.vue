<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <div class="clearfix">
            <h1 class="float-start display-3 me-4">404</h1>
            <h4 class="pt-3">Oops! You're lost.</h4>
            <p class="text-body-secondary float-start">
              The page you are looking for was not found.
            </p>
          </div>
          <RouterLink to="/dashboard">
            <CButton color="primary" size="lg">Back to dashboard</CButton>
          </RouterLink>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Page404',
}
</script>
