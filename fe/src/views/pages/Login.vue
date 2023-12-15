<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="10">
          <div class="clearfix">
            <h1 class=" display-3 me-4 my-center" >Přihlašte se prosím vaším Google účtem</h1>

          </div>
          <div>
          <a :href="getGoogleUrl('/')" class="google-auth">
            <img :src="GoogleLogo" alt="Google Logo" />
            <span class="auth-span">Google Login</span>
          </a>
        </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
<style>
.my-center {
  text-align: center;
}
.auth-span {
  text-align: center;
  color: black;
  margin-left: 20px;
  font-size: x-large;
  text-decoration: none;
}

.auth-span:link {
  text-decoration: none;
}

.auth-span:visited {
  text-decoration: none;
}

.auth-span:hover {
  text-decoration: none;
}

.auth-span:active {
  text-decoration: none;
}

.google-auth {
  background-color: #fff;
  border-radius: 1px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  margin-top: 20px;
 }

.google-auth img {
  height: 4rem;
  margin-top: 10px;
  margin-bottom: 10px;
}

.google-auth:hover {
  box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
}
</style>

<script>
import GoogleLogo from '/src/assets/images/google.svg';
import { getGoogleUrl } from '/src/utils/getGoogleUrl';

export default {
  name: 'Login',
  setup() {
    return {
      GoogleLogo,
      getGoogleUrl
    }
  }
}
</script>
