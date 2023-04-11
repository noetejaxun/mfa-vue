<template>
  <div>
    <header class="app-header">
      <ui5-shellbar 
        primary-title="MFA-PP" 
        show-notifications 
        notifications-count="2" 
        @profile-click="handleProfileClick">

        <img class="app-header-logo" :src=logo slot="logo" />

        <ui5-shellbar-item
          icon="palette"
          text="Tema"
          ref="themeChangeItem"
          @click="handleThemeSettingsToggle"></ui5-shellbar-item>

        <ui5-avatar
          slot="profile"
          size="XS"
          initials="JD"></ui5-avatar>
      </ui5-shellbar>

    </header>

    <ui5-popover 
      ref="theme-settings-popover"
      class="app-bar-theming-popover"
      placement-type="Bottom"
      horizontal-align="Right"
      header-text="Tema">
      <ui5-list
        ref={themeSelect}
        mode="SingleSelect"
        @selection-change="handleThemeChange">
        <ui5-li
          icon="palette"
          data-theme="sap_horizon"
          selected>SAP Horizon Morning</ui5-li>
        <ui5-li
          icon="palette"
          data-theme="sap_horizon_dark">SAP Horizon Evening</ui5-li>
        <ui5-li icon="palette" data-theme="sap_horizon_hcb">SAP Horizon HCB</ui5-li>
        <ui5-li icon="palette" data-theme="sap_horizon_hcw">SAP Horizon HCW</ui5-li>
        <ui5-li icon="palette" data-theme="sap_fiori_3">SAP Quartz Light</ui5-li>
        <ui5-li icon="palette" data-theme="sap_fiori_3_dark">SAP Quartz Dark</ui5-li>
        <ui5-li icon="palette" data-theme="sap_fiori_3_hcb">SAP Quartz HCB</ui5-li>
        <ui5-li icon="palette" data-theme="sap_fiori_3_hcw">SAP Quartz HCW</ui5-li>
      </ui5-list>
    </ui5-popover>

    <ui5-popover
      ref="profile-popover"
      id="profile-pop"
      class="app-bar-profile-popover"
      placement-type="Bottom"
      horizontal-align="Right">

      <div class="profile-settings">
        <ui5-avatar size="S" initials="LT"></ui5-avatar>
        <div class="profile-text">
          <ui5-title level="H4">Luis Tejaxún</ui5-title>
          <ui5-label>Software Developer</ui5-label>
        </div>
      </div>

      <div class="profile-settings-list">
        <ui5-list 
          mode="SingleSelect" 
          separators="None" 
          @item-click="handleProfileSettingsSelect"
          ref="settings-popover">
          <ui5-li icon="settings" data-key="settings">Configuración</ui5-li>
          <ui5-li icon="sys-help" data-key="help">Ayuda</ui5-li>
          <ui5-li icon="log" data-key="sign-out">Sign out</ui5-li>
        </ui5-list>
      </div>
    </ui5-popover>

    <ui5-dialog
      id="settings-dialog"
      header-text="Configuración de perfil"
      :draggable="true">
      <div>
        <div class="profile-rtl-switch centered">
          <div class="profile-rtl-switch-title">
            <ui5-label class="profile-rtl-switch-text">RTL</ui5-label>
          </div>
          <ui5-switch @change="handleRtlSwitchChange"></ui5-switch>
        </div>
      </div>

      <div class="profile-rtl-switch centered">
        <div class="profile-rtl-switch-title">
          <ui5-label class="profile-rtl-switch-text">Compacto</ui5-label>
        </div>
        <ui5-switch @change="handleContentDensitySwitchChange"></ui5-switch>
      </div>

      <div class="dialog-button">
        <ui5-button @click="handleSettingsDialogCloseButtonClick" design="Emphasized">Cerrar</ui5-button>
      </div>
    </ui5-dialog>

    <ui5-dialog id="help-dialog">

      <div slot="header" class="help-header" id="header-title-align">
        <ui5-icon name="sys-help"></ui5-icon>
        Ayuda
      </div>

      <div class="help-header" id="header-logo-align">
        <img class="app-header-logo" alt="logo" slot="logo" src="../assets/logo.svg" />
        <ui5-title level="H5">UI5 Web Components Vue Sample App</ui5-title>
      </div>


      <p class="help-dialog-text">
        <b>Release</b>: v1.0.0 <br>
        <hr />
        <span class="help-dialog-text">Más información: <a
            href="https://github.com/SAP-samples/ui5-webcomponents-sample-vue" target="_blank">Documentación</a>.</span>
      </p>

      <div class="dialog-button">
        <ui5-button design="Emphasized" @click="handleHelpDialogCloseButtonClick">Close</ui5-button>
      </div>

    </ui5-dialog>
  </div>
</template>

<script>

import logo from '../assets/google.svg';
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme";
import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";
import "@ui5/webcomponents-fiori/dist/ShellBar";
import "@ui5/webcomponents-fiori/dist/ShellBarItem";
import "@ui5/webcomponents/dist/Avatar.js";
import "@ui5/webcomponents/dist/Popover";
import "@ui5/webcomponents/dist/List";
import "@ui5/webcomponents/dist/ListItem";
import '@ui5/webcomponents/dist/Title';
import '@ui5/webcomponents/dist/Label';
import '@ui5/webcomponents/dist/Switch';
import '@ui5/webcomponents/dist/Dialog';

export default {
  name: "HeaderComponent",
  data() {
    return {
      logo,
    }
  },
  methods: {
    handleProfileClick: function (event) {
      this.$refs["profile-popover"].showAt(event.detail.targetRef);
    },
    handleThemeSettingsToggle: function (event) {
      this.$refs["theme-settings-popover"].showAt(event.detail.targetRef);
    },
    handleThemeChange: function (event) {
      setTheme(event.detail.selectedItems[0].getAttribute("data-theme"));
      this.$refs["theme-settings-popover"].close();
    },
    handleProfileSettingsSelect: function (event) {
      const selectedKey = event.detail.item.getAttribute('data-key');
      if (selectedKey === 'settings') {
        window['settings-dialog'].show(event.detail.targetRef);
      } else if (selectedKey === 'help') {
        window['help-dialog'].show(event.detail.targetRef);
      }
    },
    handleRtlSwitchChange: function (event) {
      document.body.dir = event.target.checked ? "rtl" : "ltr";
      applyDirection();
    },
    handleContentDensitySwitchChange: function (event) {
      if (event.target.checked) {
        document.body.classList.add('ui5-content-density-compact');
      } else {
        document.body.classList.remove('ui5-content-density-compact');
      }
    },
    handleSettingsDialogCloseButtonClick: function () {
      window['settings-dialog'].close();
    },
    handleHelpDialogCloseButtonClick: function () {
      window['help-dialog'].close();
    },
  }
}

</script>

<style scoped>

.header-toolbar {
    position: sticky;
    z-index: 42;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 4px 5px -5px #0a6ed1;
}

.app-header-logo {
    height: 2rem;
    max-height: 2rem;
}

.app-bar-theming-popover {
    width: 250px;
}

.app-bar-profile-popover {
    width: 250px;
}

.profile-settings,
.help-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.profile-settings-list {
    margin-top: 1.25rem;
}

.profile-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-inline-start: 1rem;
}

.profile-rtl-switch {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.dialog-button {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.625rem;
    margin-bottom: -0.425rem;
}

.help-dialog-text {
    font-size: 0.875rem;
}

#settings-dialog {
    max-width: 300px;
}

#header-title-align {
    margin: 1rem 0;
    gap: 0.225rem;
}

#header-logo-align {
    margin: 0.225rem 3.225rem 0.225rem 0;
    align-items: center;
    gap: 0.435rem;
}

#help-dialog::part(header) {
    justify-content: flex-start;
}
</style>