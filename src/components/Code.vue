<template>
  <div class="card-wrapper">
    <ui5-card class="medium">
      <ui5-card-header slot="header" title-text="Verifica tu teléfono"
        subtitle-text="Hemos enviado un código a tu número de teléfono.">
        <ui5-icon name="iphone" slot="avatar"></ui5-icon>

      </ui5-card-header>

      <div class="card-content">

        <div class="input-code">
          <ui5-input
            v-for="value, key in code" 
            type="Input" 
            class="input-width" 
            id="codeInput"
            :ref="'input_' + key"
            :maxlength=1
            v-on:input="checkValue($event, key)"
            :key="key"
            v-model="code[key]">
          </ui5-input>
        </div>

        <div class="actions">
          <ui5-button 
            design="Default" 
            slot="action"
            class="width-action"
            icon="cancel"
            @click="alert('Login')">
            <!-- router.push('/user') -->
            Cancelar
          </ui5-button>
  
          <ui5-button 
            design="Transparent" 
            slot="action"
            class="width-action"
            icon="accept"
            @click="handleClick()">
            Continuar
          </ui5-button>
        </div>


      </div>
    </ui5-card>
  </div>
</template>

<script>
// import { ref } from "vue";
import '@ui5/webcomponents-icons/dist/iphone';
import '@ui5/webcomponents/dist/Card';
import '@ui5/webcomponents/dist/Input';
import '@ui5/webcomponents/dist/CardHeader';

export default {
  name: "CodeComponent",
  props: {
    getCode: {
      type: Function,
      required: true,
    }
  },
  components: {

  },
  data() {
    return {
      code: new Array(6).fill(''),
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    handleClick() {
      const finalCode = this.code.reduce((previousValue, currentValue) => {
        return previousValue.concat(currentValue);
      })
      
      this.getCode(finalCode);
    },
    changeFocus(name, index) {
      
      if ( ( index < this.code.length  ) ) {
        if(name) this.$refs[name + index][0].focus();
      }
    },
    checkValue(event, index) {
      
      const currentValue = event.currentTarget.value.slice(-1);
      this.code[index] = currentValue;

      // const nextElement = event.currentTarget.nextSibling;
      
      this.changeFocus('input_', ( index + 1) )

    }
  }

}
</script>

<style scoped>
.card-wrapper {
  width: 30%;
  margin: 2rem 2rem;
}

@media(max-width: 1000px) {
  .card-wrapper {
    width: 60%;
    margin: 2rem 2rem;
  }
}

@media(max-width: 600px) {
  .card-wrapper {
    width: 90%;
    margin: 2rem 2rem;
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 2rem;
}

.input-width {
  width: calc(5%);
  text-align: center;
}

.input-code {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: space-between;

}

.actions {
  margin: 1rem 0rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.width-action {
  width: 45%;
}

</style>