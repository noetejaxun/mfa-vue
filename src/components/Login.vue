<template>
  <div class="card-wrapper">
    <ui5-card class="medium">
      <ui5-card-header
        slot="header" 
        title-text="Login"
        subtitle-text="Credenciales">
        <ui5-icon name="group" slot="avatar"></ui5-icon>
        <ui5-button 
          design="Transparent" 
          slot="action"
          icon="add-employee">
          Sign Up
        </ui5-button>
      </ui5-card-header>

      <div class="card-content">
        <ui5-button 
          design="Transparent" 
          slot="action"
          icon="action"
          class="login-with-google">
          Login con Google
        </ui5-button>

        <ui5-label>O</ui5-label>
	
        <ui5-input
          type="Email"
          placeholder="Correo..." 
          ref="userInput" 
          class="input-width user-input"
          id="user-input"
          v-model="email">
          <ui5-icon id="icon-mail" slot="icon" name="arobase"></ui5-icon>
        </ui5-input>

        <ui5-input
          type="Password"
          placeholder="Contraseña..." 
          ref="passwordInput" 
          class="input-width password-input"
          id="password-input"
          v-model="password">
          <ui5-icon id="icon-password" slot="icon" name="validate"></ui5-icon>
        </ui5-input>

        <ui5-button 
          class="login" 
          ref="loginButton" 
          design="Emphasized" 
          @click="login()"
          icon="visits">Login</ui5-button>
      </div>
    </ui5-card>

  </div>
</template>

<script>
import '@ui5/webcomponents-icons/dist/AllIcons';
import '@ui5/webcomponents/dist/Panel';
import '@ui5/webcomponents/dist/Input';
import '@ui5/webcomponents/dist/Button';
import '@ui5/webcomponents/dist/Card';
import '@ui5/webcomponents/dist/CardHeader';
import google from '../assets/google.svg';

export default {
  name: 'LoginComponent',
  data() {
    return {
      google,
      email: "",
      password: ""
    }
  },
  created() {
    this.google = google;
  },
  methods: {
    login() {
      if (this.email && this.password) {
        this.loginWithEmailAndPassword(this.email, this.password);
      }
    }
  },
  props: {
    loginWithGoogle: {
      type: Function,
      required: true
    },
    loginWithEmailAndPassword: {
      type: Function,
      required: true
    }
  },
  components: {
  }
};
</script>

<style scoped>

.inputIcon {
  background: #fafafa;
  color: #0a6ed1;
}

.inputIcon:hover{
  background: rgba(224,224,224,0.5)
}

.card-wrapper {
  width: 30%;
  margin: 2rem 2rem;
}

@media(max-width: 1000px) {
  .card-wrapper {
    width: 50%;
    margin: 2rem 2rem;
  }
}

@media(max-width: 600px) {
  .card-wrapper {
    width: 90%;
    margin: 2rem 2rem;
  }
}

.login,
.login-with-google,
.input-width {
  width: 80%;
  margin: 1rem 0rem;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 2rem;
}
</style>